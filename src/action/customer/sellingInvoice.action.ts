'use server'

import { getDbUserId } from "../user.action"
import { prisma } from "@/lib/prisma"
import { StatusFaktur } from "@prisma/client"

export type SellingInvoice = Awaited<ReturnType<typeof getSellingInvoiceById>>['data']
export type DetailSellingInvoices = Awaited<ReturnType<typeof getDetailSellingInvoices>>['data'][number]

export const getSellingInvoiceById = async (id: string) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi")

	try {
		const sellingInvoice = await prisma.fakturPenjualan.findUnique({
			where: {
				id
			}
		})

		if (!sellingInvoice) throw new Error("Invoice tidak ditemukan")

		return {
			success: true,
			data: sellingInvoice
		}
	} catch (error: any) {
		console.error(`[getSellingInvoiceById] Error: ${error.message || error}`);

		return {
			success: false,
			message: error.message || "Server sedang mengalami gangguan.",	
			data: null
		}
	}
}

export const getDetailSellingInvoices = async () => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi")

	try {
		const data = await prisma.fakturPenjualan.findMany({
			where: { id_user: dbUserId },
			include: {
				detail_faktur_penjualan: {
					include: {
						barang: {
							select: {
								id: true,
								nama_barang: true,
								foto_barang: true,
								harga_jual: true
							}
						}
					}
				}
			}
		})

		return {
			success: true,
			message: "Berhasil mengambil data.",
			data: data
		}
	} catch (error: any) {
		console.error(`[getSellingInvoiceWithDetails] Error: ${error.message || error}`);

		return {
			success: false,
			message: "Server sedang mengalami gangguan.",
			data: []
		}
	}
}

export const updateSellingInvoiceStatus = async (idFaktur: string, status: StatusFaktur) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi")

	try {
		const fakturPenjualan = await prisma.fakturPenjualan.findFirst({
			where: { id: idFaktur },
			select: { id: true }
		})

		if (!fakturPenjualan) throw new Error("Invoice tidak ditemukan!")

		const updated = await prisma.fakturPenjualan.update({
			where: { id: idFaktur },
			data: {
				status: status
			}
		})

		return {
			success: true,
			message: "Status berhasil diubah!",
			data: updated
		}
	} catch (error: any) {
		console.error(`[updateSellingInvoiceStatus] Error: ${error}`);

		return {
			success: false,
			message: error.message || "Server sedang mengalami gangguan.",
			data: null
		}
	}
}
