"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}
from "@/components/ui/table";

import { Pencil, Trash2, Plus, Search, User, MoreVertical, Eye, ChevronsUpDown }
from "lucide-react";

// Definisikan tipe untuk user, TANPA properti 'createdAt'
interface UserData {
  id: number;
  nama: string;
  email: string;
  role: string;
  status: "Aktif" | "Nonaktif";
}

// Data dummy TANPA properti 'createdAt'
const dummyUsers: UserData[] = [
  {
    id: 1,
    nama: "Admin Utama",
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

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full sm:w-[280px]">
      <div className="p-4 rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

export default function DaftarUsers() {
  const [search, setSearch] = useState("");
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // State untuk sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserData;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredUsers = dummyUsers.filter((user) =>
    user.nama.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase()) ||
    user.status.toLowerCase().includes(search.toLowerCase())
  );

  const sortedAndFilteredUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];

    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Hanya handle perbandingan string dan number, TANPA Date
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const res = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
          return sortConfig.direction === 'asc' ? res : -res;
        }
        // Perbandingan untuk tipe selain string (misalnya number untuk 'id')
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  const handleView = (user: UserData) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (user: UserData) => {
    setSelectedUser(user);
    setOpenAlertDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      console.log("Delete user:", selectedUser.nama);
      // Di sini Anda akan memanggil fungsi delete dari action server atau API
      // Untuk demo, kita hanya log ke konsol.
      // TODO: Implement actual deletion and update the `dummyUsers` array state.
      setOpenAlertDialog(false);
      setSelectedUser(null);
    }
  };

  // Fungsi sorting
  const handleSort = (key: keyof UserData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  return (
    <div className="p-4 max-w-[1240px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>
      {/* StatCard */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
        <StatCard
          title="Total Pengguna"
          value={dummyUsers.length}
          icon={<User className="w-6 h-6" />}
        />
        <StatCard
          title="Jumlah Kasir"
          value={dummyUsers.filter((u) => u.role === "Kasir").length}
          icon={<User className="w-6 h-6" />}
        />
        <StatCard
          title="Jumlah Customer"
          value={dummyUsers.filter((u) => u.role === "Customer").length}
          icon={<User className="w-6 h-6" />}
        />
      </div>

      {/* Search + Tambah */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Cari pengguna..."
            className="w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
        <Table className="min-w-[1204px] bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <TableHead className="px-6 py-3">No</TableHead>
              <TableHead
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("nama")}
              >
                <div className="flex items-center gap-1">
                  Nama
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-1">
                  Email
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center gap-1">
                  Role
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead
                className="px-6 py-3 cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </TableHead>
              {/* Kolom 'Tanggal Daftar' Dihapus */}
              <TableHead className="px-6 py-3 text-right">Aksi</TableHead>
            </tr>
          </thead>
          <TableBody>
            {sortedAndFilteredUsers.length > 0 ? (
              sortedAndFilteredUsers.map((user, index) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <TableCell className="px-6 py-4">{index + 1}</TableCell>
                  <TableCell className="px-6 py-4">{user.nama}</TableCell>
                  <TableCell className="px-6 py-4">{user.email}</TableCell>
                  <TableCell className="px-6 py-4">{user.role}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="w-4 h-4 text-cyan-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(user)} className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(user)} className="cursor-pointer">
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(user)} className="text-red-500 hover:text-red-600 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <TableCell colSpan={6} className="py-8 text-muted-foreground"> {/* colSpan disesuaikan */}
                  Tidak ada pengguna ditemukan.
                </TableCell>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Lihat User */}
      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <p><strong>ID:</strong> {selectedUser?.id}</p>
            <p><strong>Nama:</strong> {selectedUser?.nama}</p>
            <p><strong>Email:</strong> {selectedUser?.email}</p>
            <p><strong>Role:</strong> {selectedUser?.role}</p>
            <p><strong>Status:</strong> {selectedUser?.status}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Edit User */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Pengguna: {selectedUser?.nama}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="editUserName" className="mb-3 block">
                Nama Pengguna
              </Label>
              <Input
                id="editUserName"
                defaultValue={selectedUser?.nama || ""}
                placeholder="Nama pengguna baru"
              />
            </div>
            <div>
              <Label htmlFor="editUserEmail" className="mb-3 block">
                Email
              </Label>
              <Input
                id="editUserEmail"
                defaultValue={selectedUser?.email || ""}
                placeholder="Email pengguna"
              />
            </div>
            <div>
              <Label htmlFor="editUserRole" className="mb-3 block">
                Role
              </Label>
              <Input
                id="editUserRole"
                defaultValue={selectedUser?.role || ""}
                placeholder="Role pengguna"
              />
            </div>
            <div>
              <Label htmlFor="editUserStatus" className="mb-3 block">
                Status
              </Label>
              <Input
                id="editUserStatus"
                defaultValue={selectedUser?.status || ""}
                placeholder="Status pengguna (Aktif/Nonaktif)"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Batal</Button>
              <Button className="bg-cyan-600 text-white hover:bg-cyan-700" onClick={() => {
                console.log("Saving edited user:", selectedUser?.nama);
                setOpenEditDialog(false);
                // TODO: Implement actual update
              }}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Konfirmasi Hapus */}
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda Yakin Ingin Menghapus Pengguna Ini?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Data pengguna "{selectedUser?.nama}" yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}