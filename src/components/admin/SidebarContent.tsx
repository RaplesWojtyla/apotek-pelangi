import {
  Home,
  ShoppingCart,
  ListOrdered,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import SidebarLink from "../SidebarLink";
import { UserButton } from "@clerk/nextjs";

export default function SidebarContent() {
  return (
    <div className="flex flex-col max-h-full px-3 py-4">
      {/* Logo / Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md">
            <UserButton />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-none">Admin Panel</h1>
            <p className="text-xs text-gray-500">Apotek Pelangi</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pr-1">
        <p className="text-xs uppercase text-gray-400 mb-3">Menu</p>

        <div className="space-y-2">
          <SidebarLink href="/admin" icon={<Home size={16} />} label="Dashboard" />
          <SidebarLink href="/admin/daftarobat" icon={<ListOrdered size={16} />} label="Produk" />
          <SidebarLink href="/admin/jenisobat" icon={<ShoppingCart size={16} />} label="Kategori" />
          <SidebarLink href="/admin/daftaruser" icon={<Users size={16} />} label="Pengguna" />
          <SidebarLink href="/admin/daftarkasir" icon={<Users size={16} />} label="Kasir" />
          <SidebarLink href="/admin/logpembelian" icon={<FileText size={16} />} label="Log Pembelian" />
          <SidebarLink href="/admin/logpenjualan" icon={<FileText size={16} />} label="Log Penjualan" />
        </div>

        <hr className="my-5 border-gray-200" />

        <Link
          href="/logout"
          className="flex items-center space-x-2 text-gray-700 hover:text-red-600 text-sm transition-colors duration-200"
        >
          <LogOut size={16} />
          <span>Keluar</span>
        </Link>
      </div>
    </div>
  );
}
