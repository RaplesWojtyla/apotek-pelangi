'use client'

import {
  Input
} from "@/components/ui/input"
import {
  Label
} from "@/components/ui/label"
import {
  Textarea
} from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Button
} from "@/components/ui/button"
import Link from "next/link"

export default function TambahObatPage() {
  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/admin/daftarobat" className="hover:underline">
          Daftar Obat
        </Link>{" "}
        &gt; <span>Create</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      {/* Informasi Obat */}
      <div className="bg-muted/10 p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-4">Informasi Obat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Nama Obat</Label>
            <Input placeholder="Contoh: Paracetamol" />
          </div>
          <div>
            <Label>Kategori</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wanita">Kesehatan Wanita</SelectItem>
                <SelectItem value="Demam">Demam</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Unit</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Box">Box</SelectItem>
                <SelectItem value="Strip">Strip</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Golongan Obat</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih golongan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bebas">Bebas</SelectItem>
                <SelectItem value="Keras">Keras</SelectItem>
                <SelectItem value="Narkotika">Narkotika</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tipe Obat</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Umum">Umum</SelectItem>
                <SelectItem value="Resep">Resep dokter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Nomor Izin Edar</Label>
            <Input placeholder="Contoh: DKL123456789A21" />
          </div>
          <div>
            <Label>Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Kadaluwarsa">Kadaluwarsa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Harga Jual (Rp) *</Label>
            <Input type="number" placeholder="Contoh: 12000" />
          </div>
        </div>
      </div>

      {/* Deskripsi dan Indikasi */}
      <div className="bg-muted/10 p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-4">Deskripsi Obat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Deskripsi *</Label>
            <Textarea rows={6} placeholder="Tulis deskripsi obat..." />
          </div>
          <div>
            <Label>Indikasi / Manfaat *</Label>
            <Textarea rows={6} placeholder="Tulis manfaat atau kegunaan..." />
          </div>
        </div>
      </div>

      {/* Detail Tambahan */}
      <div className="bg-muted/10 p-6 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-4">Detail Tambahan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Komposisi</Label>
            <Textarea rows={3} placeholder="Contoh: Paracetamol 500mg" />
          </div>
          <div>
            <Label>Dosis</Label>
            <Textarea rows={3} placeholder="Contoh: 3x sehari setelah makan" />
          </div>
          <div>
            <Label>Aturan Pakai</Label>
            <Textarea rows={3} placeholder="Contoh: Dikonsumsi dengan air putih" />
          </div>
          <div>
            <Label>Perhatian</Label>
            <Textarea rows={3} placeholder="Contoh: Tidak untuk anak di bawah 5 tahun" />
          </div>
          <div>
            <Label>Kontra Indikasi</Label>
            <Textarea rows={3} />
          </div>
          <div>
            <Label>Efek Samping</Label>
            <Textarea rows={3} />
          </div>
          <div>
            <Label>Kemasan</Label>
            <Input placeholder="Contoh: Box isi 10 strip" />
          </div>
          <div>
            <Label>Manufaktur</Label>
            <Input placeholder="Contoh: Kimia Farma" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-white hover:bg-primary/90">Simpan Obat</Button>
      </div>
    </div>
  );
}
