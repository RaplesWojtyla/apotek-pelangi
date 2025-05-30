'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TambahUserPage() {
  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/admin/daftaruser" className="hover:underline">
          Daftar Pengguna
        </Link>{" "}
        &gt; <span className="text-foreground font-medium">Tambah Pengguna</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8">Tambah Pengguna</h1>

      {/* Form Card - Posisi kiri */}
      <div className="w-full max-w-2xl bg-card p-6 rounded-xl shadow-sm border space-y-6">
        {/* Informasi Pengguna */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Informasi Pengguna</h2>

          <div>
            <Label htmlFor="nama" className="mb-2 block">
              Nama Lengkap <span className="text-red-500">*</span>
            </Label>
            <Input id="nama" placeholder="Contoh: John Doe" />
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input id="email" type="email" placeholder="Contoh: john@example.com" />
          </div>
        </section>



          <div>
            <Label className="mb-2 block">
              Role <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Kasir">Kasir</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Link href="/admin/daftaruser">
            <Button variant="outline">Batal</Button>
          </Link>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Simpan</Button>
        </div>
      </div>
    </div>
  )
}
