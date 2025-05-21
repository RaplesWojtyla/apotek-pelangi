"use client";

import { useState } from "react";
import {
	Home,
	ListOrdered,
	ShoppingCart,
	Users,
	LogOut,
	Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarLink from "./SidebarLink";

export default function AdminSidebar({ children }: { children?: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(true); // Start opened by default

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex">
			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 w-64 p-6 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				<h2 className="text-xl font-bold mb-4 mt-16">Admin Panel</h2>
				<nav className="flex flex-col gap-4">
					<SidebarLink href="/admin/#" icon={<Home className="w-5 h-5" />} label="Dashboard" />
					<SidebarLink href="/admin/daftarobat" icon={<ShoppingCart className="w-5 h-5" />} label="Transaksi" />
					<SidebarLink href="/admin/jenisobat" icon={<ListOrdered className="w-5 h-5" />} label="Produk" />
					<SidebarLink href="/admin/daftaruser" icon={<Users className="w-5 h-5" />} label="Pengguna" />
					<SidebarLink href="/admin/logpembelian" icon={<Users className="w-5 h-5" />} label="Log Pembelian" />
					<SidebarLink href="/admin/logpenjualan" icon={<Users className="w-5 h-5" />} label="Log Penjualan" />
					<SidebarLink href="/logout" icon={<LogOut className="w-5 h-5" />} label="Keluar" />
				</nav>
			</aside>

			{/* Toggle Button */}
			<div
				className={`fixed top-20 transition-all duration-300 z-50 ${isOpen ? "left-64" : "left-4"}`}
			>
				<Button variant="outline" onClick={toggleSidebar} aria-label="Toggle sidebar">
					<Menu className="w-5 h-5" />
				</Button>
			</div>

			{/* Overlay (only on small screens) */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-transparent z-30 md:hidden"
					onClick={toggleSidebar}
					aria-hidden="true"
				/>
			)}

			{/* Main content */}
			<main
				className={`flex-1 min-h-screen transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"} mt-16`}
			>
				<div className="p-4">{children}</div>
			</main>
		</div>
	);
}
