'use server'

import { prisma } from "@/lib/prisma"

export async function getDashboardStats() {
	try {
		const totalRevenue = await prisma.fakturPenjualan.aggregate({
			_sum: {
				total: true,
			},
			where: {
				status: {
					in: ['PEMBAYARAN_BERHASIL', 'SELESAI']
				}
			}
		})

		const totalSales = await prisma.fakturPenjualan.count({
			where: {
				status: {
					in: ['PEMBAYARAN_BERHASIL', 'SELESAI']
				}
			}
		})

		const totalUsers = await prisma.user.count()

		const pendingPrescriptions = await prisma.pengajuanResep.count({
			where: {
				status: 'MENGAJUKAN'
			}
		})

		return {
			totalRevenue: totalRevenue._sum.total ?? 0,
			totalSales,
			totalUsers,
			pendingPrescriptions,
		}
	} catch (error) {
		console.error("[getDashboardStats] Error:", error)

		return {
			totalRevenue: 0,
			totalSales: 0,
			totalUsers: 0,
			pendingPrescriptions: 0
		}
	}
}

export async function getSalesDataForChart() {
	try {
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setHours(0, 0, 0, 0)
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

		const sales = await prisma.fakturPenjualan.findMany({
			where: {
				tanggal_faktur: {
					gte: sevenDaysAgo,
				},
				status: {
					in: ['PEMBAYARAN_BERHASIL', 'SELESAI']
				}
			},
			select: {
				tanggal_faktur: true,
				total: true,
			},
			orderBy: {
				tanggal_faktur: 'asc'
			}
		})

		const salesByDay: { [key: string]: number } = {}

		for (let i = 0; i < 7; i++) {
			const date = new Date(sevenDaysAgo)
			date.setDate(date.getDate() + i)

			const formattedDate = date.toLocaleDateString('id-ID', { weekday: 'short' })
			salesByDay[formattedDate] = 0
		}

		sales.forEach(sale => {
			const day = sale.tanggal_faktur.toLocaleDateString('id-ID', { weekday: 'short' })

			if (salesByDay.hasOwnProperty(day)) {
				salesByDay[day] += sale.total
			}
		})

		return Object.keys(salesByDay).map(day => ({
			name: day,
			total: salesByDay[day],
		}))

	} catch (error) {
		console.error("[getSalesDataForChart] Error:", error)

		return []
	}
}

export async function getMonthlyRevenueAndExpense() {
	try {
		const now = new Date()
		const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), 1)

		const revenueData = await prisma.fakturPenjualan.groupBy({
			by: ['tanggal_faktur'],
			where: {
				tanggal_faktur: {
					gte: oneYearAgo,
				},
				status: {
					in: ['PEMBAYARAN_BERHASIL', 'SELESAI']
				}
			},
			_sum: {
				total: true,
			},
		})

		const expenseData = await prisma.fakturPembelian.groupBy({
			by: ['tanggal_faktur'],
			where: {
				tanggal_faktur: {
					gte: oneYearAgo,
				},
			},
			_sum: {
				total: true,
			},
		})

		const monthlyData: {
			[key: string]: {
				pemasukan: number
				pengeluaran: number
			}
		} = {}

		for (let i = 0; i < 12; i++) {
			const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
			const monthKey = `${date.getFullYear()}-${date.getMonth()}`
			monthlyData[monthKey] = { pemasukan: 0, pengeluaran: 0 }
		}

		revenueData.forEach(item => {
			const date = new Date(item.tanggal_faktur)
			const monthKey = `${date.getFullYear()}-${date.getMonth()}`
			if (monthlyData[monthKey]) {
				monthlyData[monthKey].pemasukan += item._sum.total ?? 0
			}
		})

		expenseData.forEach(item => {
			const date = new Date(item.tanggal_faktur)
			const monthKey = `${date.getFullYear()}-${date.getMonth()}`
			if (monthlyData[monthKey]) {
				monthlyData[monthKey].pengeluaran += item._sum.total ?? 0
			}
		})

		const chartData = Object.keys(monthlyData).map(key => {
			const [year, month] = key.split('-').map(Number)
			const date = new Date(year, month)
			return {
				name: date.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }),
				pemasukan: monthlyData[key].pemasukan,
				pengeluaran: monthlyData[key].pengeluaran,
				sortKey: date.getTime(),
			}
		}).sort((a, b) => a.sortKey - b.sortKey)

		return chartData
	} catch (error) {
		console.error("[getMonthlyRevenueAndExpense] Error:", error)

		return []
	}
}

export async function getRecentTransactions() {
	try {
		return await prisma.fakturPenjualan.findMany({
			take: 5,
			orderBy: {
				tanggal_faktur: 'desc'
			},
			include: {
				user: {
					select: { nama: true }
				}
			}
		})
	} catch (error) {
		console.error("[getRecentTransactions] Error:", error)

		return []
	}
}