'use server'

import { getDbUserId } from "../user.action"
import { prisma } from "@/lib/prisma"

export type SellingInvoice = Awaited<ReturnType<typeof getSellingInvoiceById>>

export const getSellingInvoiceById = async (id: string) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi")
	
	try {
		const sellingInvoice = await prisma.fakturPenjualan.findUnique({
			where: {
				id
			}
		})

		return sellingInvoice
	} catch (error: any) {
		console.error(`[getSellingInvoiceById] Error: ${error.message}`);
		throw new Error("Gagal mengambil data invoice")
	}
}