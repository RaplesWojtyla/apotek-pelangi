import {
	BarChart,
	Users,
	ShoppingCart,
	ClipboardList,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import BarGraph from "@/components/BarGraph";
import TableTransaction from "@/components/TableTransaction";

export default function DashboardAdmin() {
	return (
		<div className="pl-2 max-w-screen">
			<h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

			{/* Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
				<StatCard
					icon={<Users className="text-blue-500 w-6 h-6" />}
					title="Pengguna"
					value="124"
				/>
				<StatCard
					icon={<ShoppingCart className="text-green-500 w-6 h-6" />}
					title="Transaksi"
					value="82"
				/>
				<StatCard
					icon={<ClipboardList className="text-yellow-500 w-6 h-6" />}
					title="Resep Masuk"
					value="45"
				/>
				<StatCard
					icon={<BarChart className="text-purple-500 w-6 h-6" />}
					title="Pendapatan"
					value="Rp12.000.000"
				/>
			</div>

			{/* Graph & Table Section */}
			<div className="flex flex-col lg:flex-row gap-6 w-full mt-6">
				<BarGraph />
				<TableTransaction />
			</div>
		</div>
	);
}