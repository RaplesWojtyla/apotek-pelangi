'use server'

import { checkRole } from "@/lib/clerk"
import { getDbUserId } from "../user.action"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Prisma } from "@prisma/client"

export interface PurchaseItemPayload {
	id_barang: string
	jumlah: number
	harga_beli: number
	kode_batch: string
	tanggal_kadaluarsa: Date | string
}

export interface FakturPembelianPayload {
	nomor_faktur: string
	id_vendor: string
	tanggal_faktur: Date | string
	pajak: number
	items: PurchaseItemPayload[],
	keterangan?: string
}

export type Vendor = Awaited<ReturnType<typeof getVendors>>['data'][number]

export type FakturPembelianWithRelations = Prisma.FakturPembelianGetPayload<{
	include: {
		vendor: true,
		user: { select: { nama: true } },
		detail_faktur_pembelian: {
			include: { barang: { select: { nama_barang: true } } }
		}
	}
}>


export const getLogPembelian = async ({ page = 1, take = 10, query = "" }) => {
	const skip = (page - 1) * take

	try {
		const logs = await prisma.fakturPembelian.findMany({
			skip,
			take,
			where: {
				OR: [
					{ nomor_faktur: { contains: query, mode: 'insensitive' } },
					{ vendor: { nama_vendor: { contains: query, mode: 'insensitive' } } }
				]
			},
			include: {
				vendor: true,
				user: { select: { nama: true } },
				detail_faktur_pembelian: {
					select: { id: true }
				}
			},
			orderBy: {
				tanggal_faktur: 'desc'
			}
		})

		const total = await prisma.fakturPembelian.count({
			where: {
				OR: [
					{ nomor_faktur: { contains: query, mode: 'insensitive' } },
					{ vendor: { nama_vendor: { contains: query, mode: 'insensitive' } } }
				]
			}
		})

		return {
			success: true,
			data: logs,
			total: total,
			totalPages: Math.ceil(total / take)
		}
	} catch (error) {
		console.error('[GET_LOG_PEMBELIAN_ERROR]', error)

		return { 
			success: false, 
			data: [], 
			total: 0,
			totalPages: 1, 
			message: 'Gagal mengambil data log pembelian.' 
		}
	}
}

export const getDetailLogPembelian = async (id: string): Promise<{ success: boolean, data?: FakturPembelianWithRelations, message?: string }> => {
	try {
		const faktur = await prisma.fakturPembelian.findUnique({
			where: { id },
			include: {
				vendor: true,
				user: { select: { nama: true } },
				detail_faktur_pembelian: {
					include: { barang: { select: { nama_barang: true } } }
				}
			}
		})

		if (!faktur) return {
			success: false,
			message: 'Faktur tidak ditemukan.'
		}

		return {
			success: true,
			data: faktur
		}
	} catch (error) {
		console.error('[GET_DETAIL_LOG_PEMBELIAN_ERROR]', error)

		return {
			success: false,
			message: 'Gagal mengambil detail faktur.'
		}
	}
}

export const deleteFakturPembelian = async (id: string) => {
	try {
		await prisma.$transaction(async (tx) => {

			const detailItems = await tx.detailFakturPembelian.findMany({
				where: { id_faktur_pembelian: id },
			})

			for (const item of detailItems) {
				const stok = await tx.stokBarang.findFirst({
					where: {
						id_barang: item.id_barang,
						kode_batch: item.kode_batch,
					}
				})

				if (stok) {
					await tx.stokBarang.update({
						where: { id: stok.id },
						data: { jumlah: { decrement: item.jumlah } }
					})
				} else {


					throw new Error(`Stok untuk batch ${item.kode_batch} produk ID ${item.id_barang} tidak ditemukan.`)
				}
			}

			await tx.fakturPembelian.delete({
				where: { id }
			})
		})

		revalidatePath('/admin/logpembelian')
		revalidatePath('/admin/daftarobat')

		return {
			success: true,
			message: 'Faktur pembelian berhasil dihapus dan stok telah dikembalikan.'
		}

	} catch (error) {
		console.error('[DELETE_FAKTUR_PEMBELIAN_ERROR]', error)

		const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus faktur.'

		return {
			success: false,
			message: errorMessage
		}
	}
}

export const recordPurchaseInvoice = async (payload: FakturPembelianPayload) => {
	if (!(await checkRole("ADMIN"))) return {
		success: false,
		message: "Akses ditolak. Silahkan login kembali!"
	}

	const adminId = await getDbUserId()

	const { items, ...invoiceData } = payload
	const total = items.reduce((acc, item) => acc + (item.harga_beli * item.jumlah), 0) + invoiceData.pajak


	try {
		const newInvoice = await prisma.$transaction(async tx => {
			const invoice = await tx.fakturPembelian.create({
				data: {
					id_user: adminId!,
					...invoiceData,
					total,
				}
			})

			const promiseDetailInvoice = items.map(async item => {
				await tx.detailFakturPembelian.create({
					data: {
						id_faktur_pembelian: invoice.id,
						id_barang: item.id_barang,
						jumlah: item.jumlah,
						harga_beli: item.harga_beli,
						kode_batch: item.kode_batch,
						tanggal_kadaluarsa: item.tanggal_kadaluarsa
					}
				})

				await tx.stokBarang.create({
					data: {
						id_barang: item.id_barang,
						jumlah: item.jumlah,
						kode_batch: item.kode_batch,
						tanggal_kadaluarsa: item.tanggal_kadaluarsa,
						tanggal_masuk: invoice.tanggal_faktur
					}
				})
			})

			await Promise.all(promiseDetailInvoice)

			return invoice
		})

		revalidatePath('/admin/logpembelian')
		revalidatePath('/admin/daftarobat')

		return {
			success: true,
			message: `Faktur pembelian ${newInvoice.nomor_faktur} berhasil dicatat!`,
			data: newInvoice
		}
	} catch (error) {
		console.error(`[recordPurchaseInvoice] Error: ${error}`)

		return {
			success: false,
			message: "Terjadi kesalahan saat mencatat faktur pembelian!"
		}
	}
}

export const getVendors = async () => {
	try {
		const vendors = await prisma.vendor.findMany({
			orderBy: {
				nama_vendor: "asc"
			}
		})

		return {
			success: true,
			message: "Berhasil mengambil data vendor!",
			data: vendors
		}
	} catch (error) {
		console.error(`[getVendors] Error: ${error}`)

		if (error instanceof PrismaClientKnownRequestError && error.code === 'P1008') {
			return {
				success: false,
				message: "Gagal memuat data vendor. Harap periksa jaringan anda!",
				data: []
			}
		}

		return {
			success: false,
			message: "Server sedang mengalami gangguan. Harap tunggu beberapa saat!",
			data: []
		}
	}
}

export const searchProducts = async (matcher: string) => {
	return await prisma.barang.findMany({
		take: 10,
		where: {
			nama_barang: {
				contains: matcher,
				mode: 'insensitive'
			}
		}
	})
}
