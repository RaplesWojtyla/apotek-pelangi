import React from "react";
import AdminSidebar from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

const dummyJenis = [
  {
    id: 1,
    nama: "Antibiotik",
    deskripsi: "Obat untuk infeksi bakteri",
  },
  {
    id: 2,
    nama: "Analgesik",
    deskripsi: "Pereda nyeri dan sakit kepala",
  },
  {
    id: 3,
    nama: "Vitamin",
    deskripsi: "Suplemen nutrisi",
  },
];

export default function DaftarJenisObat() {
  return (
    <AdminSidebar>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Jenis Obat</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Jenis
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">Nama Jenis</th>
              <th className="px-6 py-3">Deskripsi</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyJenis.map((jenis) => (
              <tr key={jenis.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{jenis.nama}</td>
                <td className="px-6 py-4">{jenis.deskripsi}</td>
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
