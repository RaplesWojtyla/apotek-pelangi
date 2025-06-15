'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "../user.action"
import { SumberCart } from "@prisma/client"
import { auth, currentUser } from "@clerk/nextjs/server"
import { updateSellingInvoiceStatus } from "./sellingInvoice.action"
import { snap } from "@/lib/midtrans"
import { revalidatePath } from "next/cache"

interface CheckoutItemDetail {
	id_cart: string
	id_barang: string
	jumlah: number
	harga_saat_checkout: number
	id_resep?: string | null
	sumber: SumberCart
}

export interface CheckoutPayload {
	items: CheckoutItemDetail[]
	namaPenerima: string
	nomorTelepon: string
	alamatPengiriman?: string
	metodePembayaran: string
	keterangan?: string
}

interface MidtransItemDetail {
	id: string
	name: string
	category: string
	price: number
	quantity: number
	merchant_name: string
}

interface MidtransParams {
	transaction_details: {
		order_id: string
		gross_amount: number
	}
	customer_details: {
		first_name: string | null | undefined
		last_name: string | null | undefined
		email: string
		phone: string | null | undefined
	}
	enabled_payments: string[]
	item_details: MidtransItemDetail[]
}

export const processCheckout = async (payload: CheckoutPayload) => {
	const dbUserId = await getDbUserId()
	const user = await currentUser()

	if (!dbUserId || !user) throw new Error("Pengguna tidak terautentikasi")

	const { items, namaPenerima, nomorTelepon, alamatPengiriman, metodePembayaran, keterangan } = payload

	if (!items || items.length === 0) throw new Error("Tidak ada item untuk dipesan")

	const total = items.reduce((acc, item) => acc + item.harga_saat_checkout * item.jumlah, 0)

	try {
		const res = await prisma.$transaction(async (tx) => {
			const fakturPenjualan = await tx.fakturPenjualan.create({
				data: {
					id_user: dbUserId,
					nama_penerima: namaPenerima,
					nomor_telepon: nomorTelepon,
					alamat: alamatPengiriman,
					metode_pembayaran: metodePembayaran,
					status: 'MENUNGGU_PEMBAYARAN',
					total: total,
					snap_token: "",
					keterangan: keterangan
				}
			})


			let midtransParams: MidtransParams = {
				"transaction_details": {
					"order_id": fakturPenjualan.id,
					"gross_amount": total
				},
				"customer_details": {
					"first_name": user.firstName,
					"last_name": user.lastName || "",
					"email": user.emailAddresses[0].emailAddress,
					"phone": nomorTelepon
				},
				"enabled_payments": [metodePembayaran],
				"item_details": []
			}


			const dataDetailFakturPenjualan = items.map(item => ({
				id_faktur_penjualan: fakturPenjualan.id,
				id_barang: item.id_barang,
				jumlah: item.jumlah,
				id_resep: item.id_resep
			}))


			await tx.detailFakturPenjualan.createMany({
				data: dataDetailFakturPenjualan
			})


			const currDate = new Date()
			for (const item of items) {
				const product = await prisma.barang.findUnique({
					where: { id: item.id_barang },
					include: {
						jenis_barang: {
							include: {
								kategori_barang: true
							}
						}
					}
				})

				if (!product) throw new Error("Produk tidak ditemukan.")

				midtransParams.item_details.push({
					"id": product.id,
					"name": product.nama_barang,
					"category": product.jenis_barang.kategori_barang.nama_kategori,
					"price": product.harga_jual,
					"quantity": item.jumlah,
					"merchant_name": "Apotek Pelangi"
				})

				const batchs = await prisma.stokBarang.findMany({
					where: {
						id_barang: item.id_barang,
						tanggal_kadaluarsa: { gt: currDate },
						jumlah: { gt: 0 }
					},
					orderBy: {
						tanggal_kadaluarsa: 'asc'
					}
				})

				let remain = item.jumlah
				for (const batch of batchs) {
					if (remain === 0) break

					const taken = Math.min(remain, batch.jumlah)

					await tx.stokBarang.update({
						where: { id: batch.id },
						data: {
							jumlah: { decrement: taken }
						}
					})

					remain -= taken
				}

				if (remain > 0) {
					const barangInfo = await tx.barang.findUnique({
						where: { id: item.id_barang },
						select: {
							nama_barang: true
						}
					})

					throw new Error(`Stok untuk ${barangInfo?.nama_barang || 'item'} tidak mencukupi (${item.jumlah} dibutuhkan). Transaksi dibatalkan`)
				}
			}

			const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tokenizer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(midtransParams)
			})

			if (!res.ok) throw new Error("Gagal membuat token pembayaran.")

			const data = await res.json()

			const cartIds = items.map(item => item.id_cart)
			await tx.cart.deleteMany({
				where: {
					id: { in: cartIds },
					id_user: dbUserId,
				}
			})


			await tx.notifikasi.create({
				data: {
					id_user: dbUserId,
					id_sumber: fakturPenjualan.id,
					tipe_sumber: 'FAKTUR_PENJUALAN',
					judul: "Pesanan dibuat.",
					pesan: `Pesanan Anda #${fakturPenjualan.id} telah berhasil dibuat dan menunggu pembayaran. Total: Rp${total.toLocaleString('id-ID')}`,
					sudah_dibaca: false
				}
			})


			const updatedFakturPenjualan = await tx.fakturPenjualan.update({
				where: { id: fakturPenjualan.id },
				data: { snap_token: data.token }
			})

			return updatedFakturPenjualan
		}, {
			maxWait: 22500,
			timeout: 22500
		})

		revalidatePath('/admin/logpenjualan')
		revalidatePath('/customer/history')

		return {
			success: true,
			fakturId: res.id,
			message: "Pesanan berhasil dibuat!"
		}
	} catch (error: any) {
		console.error(`[processCheckout] Error: ${error}`)

		let userFriendlyMessage = "Terjadi kesalahan server saat memproses pesanan Anda. Silakan coba lagi nanti.";

		if (error instanceof Error && error.message) {
			if (error.message.startsWith("Stok untuk") && error.message.includes("tidak mencukupi")) {
				userFriendlyMessage = error.message;
			} else if (error.message === "Gagal membuat token pembayaran.") {
				userFriendlyMessage = "Gagal memproses pembayaran. Silakan coba lagi.";
			} else if (error.message.toLowerCase().includes("timeout") || error.message.toLowerCase().includes("timed out")) {
				userFriendlyMessage = "Waktu pemrosesan pesanan habis. Silakan periksa jaringan anda lalu coba lagi.";
			}
		}

		return {
			success: false,
			message: userFriendlyMessage,
			fakturId: null
		}
	}
}

export const transactionSuccess = async (order_id: string) => {
	const { userId } = await auth()

	if (!userId) return {
		success: false,
		message: "Pengguna tidak terautentikasi.",
		data: null
	}

	try {
		let midtransStatusResponse
		try {
			midtransStatusResponse = await snap.transaction.status(order_id)
		} catch (error: any) {
			console.error(`[transactionSuccess] Midtrans status check error for order_id ${order_id}:`, error.message);

			if (error.ApiResponse.status_code && error.ApiResponse.status_code === '404') {
				return {
					success: false,
					message: "Transaksi tidak ditemukan",
					status: error.ApiResponse.status_code,
					data: null
				};
			}

			return {
				success: false,
				message: "Gagal memverifikasi status pembayaran.",
				data: null
			};
		}

		const { transaction_status, fraud_status } = midtransStatusResponse
		const isPaymentConfirmedByMidtrans = (transaction_status === 'capture' && fraud_status === 'accept') || transaction_status === 'settlement'

		if (!isPaymentConfirmedByMidtrans) {
			console.warn(`[transactionSuccess] Payment for order_id ${order_id} not confirmed. Midtrans Status: ${transaction_status}, Fraud Status: ${fraud_status}`);

			const currInvoice = await prisma.fakturPenjualan.findUnique({
				where: { id: order_id }
			})

			if (transaction_status === 'pending') {
				return {
					success: false,
					message: "Pembayaran Anda masih tertunda. Silakan selesaikan pembayaran.",
					data: currInvoice,
					isPending: true
				}
			}

			return {
				success: false,
				message: `Status pembayaran: ${transaction_status}. Pembayaran belum dikonfirmasi berhasil.`,
				data: currInvoice
			}
		}

		const res = await updateSellingInvoiceStatus(order_id, 'PEMBAYARAN_BERHASIL')

		if (!res.success) return {
			success: false,
			message: res.message || "Terjadi kesalahan saat memperbarui status!",
			data: null
		};

		await prisma.notifikasi.create({
			data: {
				id_user: res.data?.id_user!,
				id_sumber: order_id,
				tipe_sumber: 'FAKTUR_PENJUALAN',
				judul: "Pembayaran berhasil!",
				pesan: `Pembayaran untuk pesanan #${order_id} telah berhasil diterima. Pesanan anda akan segera dikemas!`
			}
		})

		revalidatePath('/admin/logpenjualan')
		revalidatePath('/kasir/daftar_transaksi')
		revalidatePath('/customer/history')

		return {
			success: true,
			message: "Transaksi berhasil!",
			data: res.data
		}
	} catch (error: any) {
		console.error(`[transactionSuccess] Error: ${error.message || error}`);

		return {
			success: false,
			message: error.message || "Transaksi gagal - Terjadi kesalahan pada server",
			data: null
		};
	}
}

export const failedTransaction = async (order_id: string) => {
	const { userId } = await auth()

	if (!userId) throw new Error("Pengguna tidak terautentikasi")

	try {
		const res = await prisma.$transaction(async tx => {
			const fakturPenjualan = await tx.fakturPenjualan.findUnique({
				where: { id: order_id }
			})

			if (!fakturPenjualan) {
				return {
					success: false,
					message: "Faktur tidak ditemukan!",
					data: null
				}
			}
			const updatedFakturPenjualan = await tx.fakturPenjualan.update({
				where: { id: fakturPenjualan.id },
				data: {
					status: 'PEMBAYARAN_GAGAL'
				},
				include: {
					detail_faktur_penjualan: {
						select: {
							id_barang: true,
							jumlah: true
						}
					}
				}
			})

			const stocksUpdatePromise = updatedFakturPenjualan.detail_faktur_penjualan.map(async item => {
				const targetBatch = await tx.stokBarang.findFirst({
					where: {
						id_barang: item.id_barang
					},
					orderBy: [
						{ tanggal_kadaluarsa: 'asc' },
						{ jumlah: 'asc' }
					]
				})

				if (targetBatch) {
					await tx.stokBarang.update({
						where: {
							id: targetBatch.id
						},
						data: {
							jumlah: { increment: item.jumlah }
						}
					})
				} else {
					console.warn(`[stocksUpdate] StokBarang tidak ditemukan untuk id_barang: ${item.id_barang} saat mencoba mengembalikan stok.`)
					throw new Error(`StokBarang tidak ditemukan untuk id_barang: ${item.id_barang}`)
				}
			})

			await Promise.all(stocksUpdatePromise)

			if (updatedFakturPenjualan.id_user) {
				await tx.notifikasi.create({
					data: {
						id_user: updatedFakturPenjualan.id_user,
						id_sumber: order_id,
						tipe_sumber: 'FAKTUR_PENJUALAN',
						judul: "Pembayaran Gagal!",
						pesan: `Pembayaran untuk pesanan #${order_id} Gagal. Pesanan anda dibatalkan!`
					}
				})
			}

			return {
				success: true,
				message: "Pembayaran Gagal!",
				data: null
			}
		})

		revalidatePath('/admin/logpenjualan')
		revalidatePath('/kasir/daftar_transaksi')
		revalidatePath('/kasir/history_transaksi')
		revalidatePath('/customer/history')

		return {
			success: res.success,
			message: res.message,
			data: res.data
		}
	} catch (error: any) {
		console.error(`[failedTransaction] Error: ${error.message || error}`)

		return {
			success: false,
			message: error.message || "Terjadi kesalahan pada server.",
			data: null
		}
	}
}
