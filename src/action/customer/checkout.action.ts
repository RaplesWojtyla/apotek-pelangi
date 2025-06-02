'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "../user.action"
import { SumberCart } from "@prisma/client"
import { currentUser } from "@clerk/nextjs/server"
import { snap } from "@/lib/utils"

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

				if (!product) break

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
					pesan: `Pesanan Anda #${fakturPenjualan.id} telah berhasil dibuat dan menunggu pembayaran. Total: Rp${total.toLocaleString()}`,
					sudah_dibaca: false
				}
			})

			const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tokenizer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(midtransParams)
			})

			if (!res.ok) throw new Error("Gagal membuat token pembayaran.")
			
			const data = await res.json()

			const updatedFakturPenjualan = await tx.fakturPenjualan.update({
				where: { id: fakturPenjualan.id },
				data: { snap_token: data.token }
			})

			return updatedFakturPenjualan
		})

		return {
			success: true,
			fakturId: res.id,
			message: "Pesanan berhasil dibuat!"
		}
	} catch (error: any) {
		console.error(`[processCheckout] Error: ${error}`)

		return {
			success: false,
			message: "Internal server error"
		}
	}
}
