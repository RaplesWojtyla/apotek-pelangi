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
		<>
			<h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					icon={<Users className="text-blue-500" />}
					title="Pengguna"
					value="124"
				/>
				<StatCard
					icon={<ShoppingCart className="text-green-500" />}
					title="Transaksi"
					value="82"
				/>
				<StatCard
					icon={<ClipboardList className="text-yellow-500" />}
					title="Resep Masuk"
					value="45"
				/>
				<StatCard
					icon={<BarChart className="text-purple-500" />}
					title="Pendapatan"
					value="Rp12.000.000"
				/>
			</div>
			<div className=" flex max-w-full mr-14 h-[200px] mt-6 md:h-[300px] lg:h-[400px]">
				< BarGraph />
				< TableTransaction />
			</div>
		</>
	);
}