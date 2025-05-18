import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Users,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import AdminSidebar from "@/components/SidebarAdmin"; 

export default function DashboardAdmin() {
  return (
    <AdminSidebar>
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
    </AdminSidebar>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="text-3xl">{icon}</div>
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </Card>
  );
}
  