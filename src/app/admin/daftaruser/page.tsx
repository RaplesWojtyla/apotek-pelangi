import React from "react";
import AdminSidebar from "@/components/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";




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
    role: "customer",
    status: "Nonaktif",
  },
];

export default function DaftarUsers() {
  return (
    <AdminSidebar>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Tambah User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna</DialogTitle>
              <DialogDescription>
                Masukkan informasi untuk pengguna baru.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <Input placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" placeholder="Email pengguna" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin" className="hover:bg-blue-100 duration-200 hover:text-black focus:bg-blue-100 ">Admin</SelectItem>
                    <SelectItem value="Kasir" className="hover:bg-blue-100 duration-200 hover:text-black focus:bg-blue-100 "> Kasir</SelectItem>
                    <SelectItem value="Customer" className="hover:bg-blue-100 duration-200 hover:text-black focus:bg-blue-100 ">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif" className="hover:bg-blue-100 duration-200 hover:text-black focus:bg-blue-100">Aktif</SelectItem>
                    <SelectItem value="Nonaktif" className="hover:bg-blue-100 duration-200 hover:text-black focus:bg-blue-100 ">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </form>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Batal</Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
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
                    className={`px-2 py-1 rounded text-xs font-medium ${user.status === "Aktif"
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
