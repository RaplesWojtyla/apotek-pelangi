'use server'

import { prisma } from "@/lib/prisma"

export async function getFinancialReport(startDate: Date, endDate: Date) {
	try {
		const revenueResult = await prisma.fakturPenjualan.aggregate({
			_sum: {
				total: true,
			},
			where: {
				tanggal_faktur: {
					gte: startDate,
					lte: endDate,
				},
				status: {
					in: ['PEMBAYARAN_BERHASIL', 'SELESAI']
				}
			}
		})

		const expenseResult = await prisma.fakturPembelian.aggregate({
			_sum: {
				total: true,
			},
			where: {
				tanggal_faktur: {
					gte: startDate,
					lte: endDate,
				}
			}
		})

		const totalPemasukan = revenueResult._sum.total ?? 0
		const totalPengeluaran = expenseResult._sum.total ?? 0
		const labaKotor = totalPemasukan - totalPengeluaran

		return {
			success: true,
			data: {
				totalPemasukan,
				totalPengeluaran,
				labaKotor,
				startDate,
				endDate
			}
		}

	} catch (error) {
		console.error("[getFinancialReport] Error:", error)
		return { success: false, message: "Gagal mengambil laporan keuangan." }
	}
}