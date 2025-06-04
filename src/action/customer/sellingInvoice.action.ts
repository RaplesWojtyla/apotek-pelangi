'use server'

import { getDbUserId } from "../user.action"
import { prisma } from "@/lib/prisma"
import { StatusFaktur } from "@prisma/client"

export type SellingInvoice = Awaited<ReturnType<typeof getSellingInvoiceById>>['data']

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

const getSellingInvoiceWithDetails = async (id: string) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi")

	try {
		const data = await prisma.fakturPenjualan.findUnique({
			where: { id },
			include: {
				detail_faktur_penjualan: true
			}
		})

		if (!data) throw new Error("Kode Faktur tidak valid")

		return {
			success: true,
			data: data
		}
	} catch (error: any) {
		console.error(`[getSellingInvoiceWithDetails] Error: ${error.message || error}`);

		return {
			success: false,
			message: error.message || "Server sedang mengalami gangguan."
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
