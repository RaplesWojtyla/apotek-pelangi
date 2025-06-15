import { currentUser } from "@clerk/nextjs/server"
import { BarChart, Users, ShoppingCart, FileText } from "lucide-react"
import StatCard from "@/components/StatCard"
import { getDashboardStats, getRecentTransactions, getMonthlyRevenueAndExpense } from "@/action/admin/dashboard.action"
import RecentTransactions from "@/components/admin/RecentTransactions"
import AnnualChart from "@/components/AnnualChart"

export default async function DashboardAdmin() {
	const user = await currentUser()

	const { totalRevenue, totalSales, totalUsers, pendingPrescriptions } = await getDashboardStats()
	const annualData = await getMonthlyRevenueAndExpense()
	const recentTransactions = await getRecentTransactions()

	return (
		<div className="p-4 sm:p-6 lg:p-8 space-y-6">
			<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<h2 className="text-lg text-muted-foreground">
					Selamat Datang, {user?.firstName || "Admin"}!
				</h2>
			</div>

			{/* Kartu Statistik */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
				<StatCard
					icon={<BarChart className="text-green-500 w-6 h-6" />}
					title="Total Pendapatan"
					value={`Rp${totalRevenue.toLocaleString('id-ID')}`}
				/>
				<StatCard
					icon={<ShoppingCart className="text-blue-500 w-6 h-6" />}
					title="Total Penjualan"
					value={totalSales.toLocaleString('id-ID')}
				/>
				<StatCard
					icon={<Users className="text-yellow-500 w-6 h-6" />}
					title="Total Pengguna"
					value={totalUsers.toLocaleString('id-ID')}
				/>
				<StatCard
					icon={<FileText className="text-purple-500 w-6 h-6" />}
					title="Resep Menunggu"
					value={pendingPrescriptions.toLocaleString('id-ID')}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white p-4 rounded-xl shadow border">
					<h3 className="font-semibold mb-4">Penjualan 7 Hari Terakhir</h3>
					<AnnualChart data={annualData} />
				</div>
				<div className="bg-white p-4 rounded-xl shadow border">
					<h3 className="font-semibold mb-4">Transaksi Terbaru</h3>
					<RecentTransactions transactions={recentTransactions} />
				</div>
			</div>
		</div>
	)
}