'use client'

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  { label: "Semua Kategori", icon: "/logo.png" },
  { label: "Obat & Perawatan", icon: "/logo.png" },
  { label: "Weight Management", icon: "/logo.png" },
  { label: "Susu", icon: "/logo.png" },
  { label: "Kesehatan Seksual", icon: "/logo.png" },
  { label: "Peralatan", icon: "/logo.png" },
];

const obatData = [
  { icon: "/logo.png", title: "Batuk, Pilek & Flu" },
  { icon: "/logo.png", title: "Demam & Nyeri" },
  { icon: "/logo.png", title: "Masalah Pencernaan" },
  { icon: "/logo.png", title: "Alergi" },
];

export default function ProdukPage() {
  return (
    <div className="flex justify-center">
      <div className="p-6 w-full max-w-7xl">
        {/* Header Kategori */}
        <h1 className="text-2xl font-bold mb-6 px-2 md:px-0">Kategori</h1>

        {/* Kategori horizontal dengan item + untuk tambah kategori */}
        <div className="overflow-x-auto mb-8 px-2 md:px-0">
          <div className="flex space-x-6 w-max min-w-full pb-4">
            {/* Item Tambah Kategori sebagai gambar + modal */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-24 h-24 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer text-4xl font-bold text-blue-600 select-none">
                  +
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah Kategori</DialogTitle>
                  <DialogDescription>
                    Masukkan nama kategori baru dan upload ikon kategori.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Nama Kategori */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="kategori" className="text-right">
                      Nama Kategori
                    </Label>
                    <Input id="kategori" className="col-span-3" placeholder="Masukkan nama kategori" />
                  </div>

                  {/* Upload Icon */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="iconUpload" className="text-right">
                      Upload Icon
                    </Label>
                    <input
                      id="iconUpload"
                      type="file"
                      accept="image/*"
                      className="col-span-3 cursor-pointer"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button">Simpan</Button>
                </DialogFooter>
              </DialogContent>

            </Dialog>

            {/* Daftar kategori */}
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center min-w-[6rem] space-y-2"
              >
                <div className="w-24 h-24 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center shadow-sm">
                  <Image src={cat.icon} alt={cat.label} width={40} height={40} />
                </div>
                <span className="text-sm text-center w-28 whitespace-normal font-medium text-gray-700">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Judul Obat & Perawatan + tombol tambah jenis */}
        <div className="flex items-center justify-between mb-6 px-2 md:px-0">
          <h2 className="text-xl font-semibold">Obat & Perawatan</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="text-sm">
                Tambah Jenis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Jenis Obat</DialogTitle>
                <DialogDescription>
                  Pilih kategori dan masukkan nama jenis obat baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kategoriSelect" className="text-right">
                    Kategori
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Pilih Kategori.." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat, idx) => (
                        <SelectItem key={idx} value={cat.label}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="jenisNama" className="text-right">
                    Nama Jenis
                  </Label>
                  <Input id="jenisNama" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Kartu Obat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-2 md:px-0">
          {obatData.map((category, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                    <Image src={category.icon} alt={category.title} width={32} height={32} />
                  </div>
                  <h3 className="font-semibold text-md text-gray-800">
                    {category.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
