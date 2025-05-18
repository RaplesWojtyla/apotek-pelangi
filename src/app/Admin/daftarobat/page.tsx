import React from "react";
import AdminSidebar from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

const dummyData = [
  {
    id: 1,
    nama: "Paracetamol",
    kategori: "Obat Bebas",
    stok: 100,
    harga: 5000,
  },
  {
    id: 2,
    nama: "Amoxicillin",
    kategori: "Antibiotik",
    stok: 50,
    harga: 12000,
  },
  {
    id: 3,
    nama: "Vitamin C",
    kategori: "Suplemen",
    stok: 200,
    harga: 8000,
  },
];

export default function DaftarObat() {
  return (
    <AdminSidebar>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Obat</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Obat
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">Nama Obat</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Stok</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((obat) => (
              <tr key={obat.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{obat.nama}</td>
                <td className="px-6 py-4">{obat.kategori}</td>
                <td className="px-6 py-4">{obat.stok}</td>
                <td className="px-6 py-4">Rp{obat.harga.toLocaleString()}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminSidebar>
  );
}
