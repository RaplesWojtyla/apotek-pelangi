import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Search, User } from "lucide-react";

const dummyUsers = [
  {
    id: 1,
    nama: "Admin",
    email: "admin@example.com",
    role: "Admin",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Kasir",
    email: "kasir@example.com",
    role: "Kasir",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Customer",
    email: "customer@example.com",
    role: "Customer",
    status: "Nonaktif",
  },
];

// StatCard komponen, mirip contoh sebelumnya
function StatCardJumlahUser({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[260px] mb-6">
      <div className="p-4 rounded-full bg-blue-100">
        <User className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Jumlah Pengguna</p>
        <h3 className="text-2xl font-bold">{jumlah}</h3>
      </div>
    </div>
  );
}

export default function DaftarUsers() {
  return (
    <div className="p-4 max-w-[1240px] mx-auto">
      {/* StatCard */}
      <StatCardJumlahUser jumlah={dummyUsers.length} />

      {/* Judul */}
      <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>

      {/* Search + Tambah */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Cari pengguna..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Link href="/admin/daftaruser/tambah" passHref>
          <Button asChild className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600">
            <span>
              <Plus className="w-4 h-4 inline mr-1" />
              Tambah User
            </span>
          </Button>
        </Link>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto w-full rounded-lg shadow">
        <table className="min-w-[1204px] bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user, index) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.nama}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === "Aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
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
    </div>
  );
}
