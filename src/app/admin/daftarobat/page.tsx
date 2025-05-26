import React from "react";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const dummyData = [
  {
    id: 1,
    nama: "Paracetamol",
    kategori: "Obat & Perawatan",
    stok: 100,
    harga: 5000,
  },
  {
    id: 2,
    nama: "Amoxicillin",
    kategori: "Obat & Perawatan",
    stok: 50,
    harga: 12000,
  },
  {
    id: 3,
    nama: "Hansaplast",
    kategori: "Peralatan",
    stok: 200,
    harga: 2000,
  },
];

export default function DaftarObat() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Daftar Obat</h1>

      {/* Search + Tambah */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Cari obat..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Tambah Obat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Obat</DialogTitle>
              <DialogDescription>
                Masukkan data obat yang ingin ditambahkan.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Obat</label>
                <Input placeholder="Contoh: Paracetamol" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Obat & Perawatan" className="hover:bg-blue-100">Obat & Perawatan</SelectItem>
                    <SelectItem value="Peralatan" className="hover:bg-blue-100">Peralatan</SelectItem>
                    <SelectItem value="Susu" className="hover:bg-blue-100">Susu</SelectItem>
                    <SelectItem value="Weight Management" className="hover:bg-blue-100">Weight Management</SelectItem>
                    <SelectItem value="Kesehatan Seksual" className="hover:bg-blue-100">Kesehatan Seksual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stok</label>
                <Input type="number" placeholder="Masukkan stok" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <Input type="number" placeholder="Masukkan harga" />
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

      {/* Tabel Obat */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Obat</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Stok</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((obat, index) => (
              <tr key={obat.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
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
    </>
  );
}
