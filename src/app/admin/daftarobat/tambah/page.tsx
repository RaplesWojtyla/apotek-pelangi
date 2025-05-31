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
import { Button } from "@/components/ui/button"
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
        <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base rounded-lg">
          Simpan Obat
        </Button>
      </div>
    </div>
  )
}
