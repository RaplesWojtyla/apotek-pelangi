'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TambahObatPage() {
  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/admin/daftarobat" className="hover:underline">
          Daftar Produk
        </Link>{" "}
        &gt; <span className="text-foreground font-medium">Tambah Produk</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Tambah Produk</h1>

      <section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Informasi Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Deskripsi (Nama Produk)<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: Hansaplast Classic - Plester luka waterproof" />
          </div>
          <div>
            <Label>Golongan<span className="text-red-500">*</span></Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih golongan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Obat Bebas">Obat Bebas</SelectItem>
                <SelectItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</SelectItem>
                <SelectItem value="Obat Keras">Obat Keras</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kemasan<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: Box 20 strips" />
          </div>
          <div>
            <Label>Manufaktur<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: PT Hansaplast Indonesia" />
          </div>
          <div>
            <Label>No BPOM<span className="text-red-500">*</span></Label>
            <Input placeholder="Contoh: AKD20801816454" />
          </div>
        </div>
      </section>

      <section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Detail Obat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Indikasi Umum<span className="text-red-500">*</span></Label>
            <Textarea rows={4} placeholder="Penutup luka kecil dan goresan" />
          </div>
          <div>
            <Label>Komposisi<span className="text-red-500">*</span></Label>
            <Textarea rows={4} placeholder="Adhesive tape dengan pad penyerap" />
          </div>
          <div>
            <Label>Dosis<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Sesuai kebutuhan" />
          </div>
          <div>
            <Label>Aturan Pakai<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Tempelkan pada kulit yang bersih dan kering" />
          </div>
          <div>
            <Label>Perhatian<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Ganti secara teratur, jaga kebersihan luka" />
          </div>
          <div>
            <Label>Kontra Indikasi<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Luka terbuka yang luas atau dalam" />
          </div>
          <div>
            <Label>Efek Samping<span className="text-red-500">*</span></Label>
            <Textarea rows={3} placeholder="Iritasi kulit pada pengguna sensitif" />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-2 text-base rounded-lg">
          Simpan Obat
        </Button>
      </div>
    </div>
  )
}
