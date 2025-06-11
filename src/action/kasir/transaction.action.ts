'use server'

import { prisma } from '@/lib/prisma'
import { getDbUserId } from '../user.action'

interface Item {
	id: string
	nama_barang: string
	harga_jual: number
	quantity: number
	stok_barang: number
}

interface TransaksiInput {
	items: Item[]
	bayar: number
	paymentMethod: string
	resepChecked: Record<string, boolean>
	resepImage: string | null
}

export async function prosesTransaksi({
	items,
	bayar,
	paymentMethod,
	resepChecked,
	resepImage,
}: TransaksiInput) {
	const dbUserId = await getDbUserId()
	if (!dbUserId) throw new Error('Pengguna tidak terautentikasi!')

	const userRecord = await prisma.user.findUnique({
		where: { id: dbUserId },
		select: { nama: true },
	})
	
	const namaPenerima = userRecord?.nama?.trim() || '-'

	if (!items || items.length === 0) throw new Error('Item keranjang kosong')

	const total = items.reduce((sum, item) => sum + item.harga_jual * item.quantity, 0)
	if (bayar < total) throw new Error('Jumlah bayar kurang dari total')

	let pengajuanResepId: string | null = null

	return await prisma.$transaction(async (tx) => {
		// 1. Buat Faktur Penjualan
		const faktur = await tx.fakturPenjualan.create({
			data: {
				id_user: dbUserId,
				id_kasir: dbUserId,
				metode_pembayaran: paymentMethod,
				total: total,
				status: 'SELESAI',
				nama_penerima: namaPenerima,
				nomor_telepon: '-',
				alamat: '-',
				snap_token: '-',
				keterangan: '',
			},
		})

		// 2. Buat Pengajuan Resep jika ada resep digunakan
		const adaResep = items.some((item) => resepChecked[item.id])
		if (adaResep && resepImage) {
			const pengajuan = await tx.pengajuanResep.create({
				data: {
					id_user: dbUserId,
					status: 'DITERIMA',
					foto_resep: resepImage,
					catatan: '',
				},
			})
			pengajuanResepId = pengajuan.id
		}

		// 3. Insert tiap DetailFakturPenjualan
		for (const item of items) {
			await tx.detailFakturPenjualan.create({
				data: {
					id_faktur_penjualan: faktur.id,
					id_barang: item.id,
					jumlah: item.quantity,
					id_resep: resepChecked[item.id] ? pengajuanResepId : null,
				},
			})

			// 4. Kurangi stok FIFO dari StokBarang
			let qtyToDeduct = item.quantity
			const stokList = await tx.stokBarang.findMany({
				where: { id_barang: item.id, jumlah: { gt: 0 } },
				orderBy: { tanggal_masuk: 'asc' },
			})

			for (const stok of stokList) {
				if (qtyToDeduct === 0) break
				const dikurang = Math.min(stok.jumlah, qtyToDeduct)
				await tx.stokBarang.update({
					where: { id: stok.id },
					data: { jumlah: stok.jumlah - dikurang },
				})
				qtyToDeduct -= dikurang
			}

			if (qtyToDeduct > 0) {
				throw new Error(`Stok barang untuk ${item.nama_barang} tidak mencukupi`)
			}
		}

		return { success: true }
	})
}
