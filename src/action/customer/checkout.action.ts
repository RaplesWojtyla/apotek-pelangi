'use server'

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "../user.action";
import { DetailFakturPenjualan, MetodePembayaran, SumberCart } from "@prisma/client";

interface CheckoutItemDetail {
	id_cart: string;
	id_barang: string;
	jumlah: number;
	harga_saat_checkout: number;
	id_resep?: string | null;
	sumber: SumberCart
}

export interface CheckoutPayload {
	items: CheckoutItemDetail[];
	namaPenerima: string;
	nomorTelepon: string; 
	alamatPengiriman?: string;
	metodePembayaran: string
	keterangan?: string;
}

export const processCheckout = async (payload: CheckoutPayload) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi")

	const { items, namaPenerima, nomorTelepon, alamatPengiriman, metodePembayaran, keterangan} = payload

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
					metode_pembayaran: (metodePembayaran as MetodePembayaran),
					status: 'MENUNGGU_PEMBAYARAN',
					total: total,
					keterangan: keterangan
				}
			})


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

			return fakturPenjualan
		})

		return {
			success: true,
			fakturId: res.id,
			message: "Pesanan berhasil dibuat!"
		}
	} catch (error: any) {
		console.error(`[processCheckout] Error: ${error}`);

		return {
			success: false,
			message: error.message || "Gagal membuat pesanan."
		}
	}
}
