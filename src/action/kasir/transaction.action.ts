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
	id_customer: string | null
	items: Item[]
	bayar: number
	paymentMethod: string
	resepChecked: Record<string, boolean>
	resepImage: string | null
}

export async function prosesTransaksi({
	id_customer,
	items,
	bayar,
	paymentMethod,
	resepChecked,
	resepImage,
}: TransaksiInput) {
	const dbUserId = await getDbUserId()
	if (!dbUserId) throw new Error('Pengguna tidak terautentikasi!')

	let nama_penerima = '-'

	if (id_customer) {
		const customer = await prisma.user.findUnique({
			where: { id: id_customer, role: 'CUSTOMER' },
			select: { nama: true }
		})

		if (customer) {
			nama_penerima = customer.nama || '-'
		}
	} else {
		const kasir = await prisma.user.findUnique({
			where: { id: dbUserId, role: 'KASIR' },
			select: { nama: true }
		})

		nama_penerima = kasir?.nama || 'Pelanggan'
	}

	if (!items || items.length === 0) throw new Error('Item keranjang kosong')

	const total = items.reduce((sum, item) => sum + item.harga_jual * item.quantity, 0)
	if (bayar < total) throw new Error('Jumlah bayar kurang dari total')

	let pengajuanResepId: string | null = null

	return await prisma.$transaction(async (tx) => {	
		const faktur = await tx.fakturPenjualan.create({
			data: {
				id_user: id_customer,
				id_kasir: dbUserId,
				metode_pembayaran: paymentMethod,
				total: total,
				status: 'SELESAI',
				nama_penerima: nama_penerima,
				nomor_telepon: '-',
				alamat: '-',
				snap_token: '-',
				keterangan: '',
			},
		})

		
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

		
		for (const item of items) {
			await tx.detailFakturPenjualan.create({
				data: {
					id_faktur_penjualan: faktur.id,
					id_barang: item.id,
					jumlah: item.quantity,
					id_resep: resepChecked[item.id] ? pengajuanResepId : null,
				},
			})

			
			let qtyToDeduct = item.quantity
			const stokList = await tx.stokBarang.findMany({
				where: { id_barang: item.id, jumlah: { gt: 0 } },
				orderBy: { tanggal_kadaluarsa: 'asc' },
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
