'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import Link from "next/link"

export default function TambahObatPage() {
  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8 bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/admin/daftarobat" className="hover:underline">
          Daftar Produk
        </Link>{" "}
        &gt; <span className="text-foreground font-medium">Tambah Produk</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">Tambah Produk</h1>

      {/* Informasi Produk */}
      <section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Informasi Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nama Produk<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: Paracetamol 500 mg tablet" className="h-12 text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Golongan<span className="text-red-500">*</span></Label>
            <Select>
              <SelectTrigger className="w-full h-12 text-sm md:text-base">
                <SelectValue placeholder="Pilih golongan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Obat Bebas">Obat Bebas</SelectItem>
                <SelectItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</SelectItem>
                <SelectItem value="Obat Keras">Obat Keras</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Kemasan<span className="text-red-500">*</span></Label>
            <Select>
              <SelectTrigger className="w-full h-12 text-sm md:text-base">
                <SelectValue placeholder="Pilih jenis kemasan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Strip 10 tablet">Strip</SelectItem>
                <SelectItem value="Box isi 10 strip">Box</SelectItem>
                <SelectItem value="Botol 60 ml">Botol</SelectItem>
                <SelectItem value="Tube 5 gram">Tube</SelectItem>
                <SelectItem value="Sachet 5 gram">Sachet</SelectItem>
                <SelectItem value="Kaplet dalam blister">Blister</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Manufaktur<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: PT Kimia Farma Tbk" className="h-12 text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>No BPOM<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: DTL1234567890A1" className="h-12 text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Total Stok<span className="text-red-500">*</span></Label>
            <Input type="number" placeholder="Contoh: 100" className="h-12 text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Tanggal Kedaluwarsa<span className="text-red-500">*</span></Label>
            <Input type="date" className="h-12 text-sm md:text-base" />
          </div>
        </div>
      </section>

      {/* Detail Obat */}
      <section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Detail Obat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Indikasi Umum<span className="text-red-500">*</span></Label>
            <Textarea rows={4} placeholder="Digunakan untuk menurunkan demam dan meredakan nyeri ringan hingga sedang." className="text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Komposisi<span className="text-red-500">*</span></Label>
            <Textarea rows={4} placeholder="Tiap tablet mengandung Paracetamol 500 mg" className="text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Dosis<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Dewasa: 1 tablet setiap 4-6 jam, maksimal 8 tablet per hari." className="text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Aturan Pakai<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Dikonsumsi setelah makan dengan air putih." className="text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Perhatian<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Tidak dianjurkan untuk penggunaan jangka panjang tanpa pengawasan medis." className="text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Kontra Indikasi<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Hipersensitif terhadap paracetamol atau komponen lain dalam obat ini." className="text-sm md:text-base" />
          </div>
          <div className="space-y-2">
            <Label>Efek Samping<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Mual, ruam kulit, reaksi alergi." className="text-sm md:text-base" />
          </div>
        </div>
      </section>

      {/* Tombol Simpan */}
      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base rounded-lg mb-8">
          Simpan Obat
        </Button>
      </div>

      {/* Tambah Batch Obat */}
      <section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-6">Batch Obat</h2>

        {/* Toolbar: Search + Tambah */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <Input
            type="text"
            placeholder="Cari batch..."
            className="w-full md:w-64 h-10 text-sm"
          />
          <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-2.5 text-sm rounded-lg">
            + Tambah Batch
          </Button>
        </div>

        {/* Tabel Batch */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">ID Batch</TableHead>
                <TableHead>Tanggal Kedaluwarsa</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Harga Beli</TableHead>
                <TableHead className="text-center w-[80px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Contoh row statis */}
              <TableRow>
                <TableCell>BATCH001</TableCell>
                <TableCell>2026-05-01</TableCell>
                <TableCell>50</TableCell>
                <TableCell>Rp 2.500</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-muted">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Lihat</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </div>


  )
}
