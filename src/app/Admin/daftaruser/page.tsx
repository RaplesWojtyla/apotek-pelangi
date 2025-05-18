import React from "react";
import AdminSidebar from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

const dummyUsers = [
  {
    id: 1,
    nama: "Admin Utama",
    email: "admin@example.com",
    role: "Admin",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Kasir 1",
    email: "kasir1@example.com",
    role: "Kasir",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Kasir 2",
    email: "kasir2@example.com",
    role: "Kasir",
    status: "Nonaktif",
  },
];

export default function DaftarUsers() {
  return (
    <AdminSidebar>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah User
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
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
    </AdminSidebar>
  );
}
