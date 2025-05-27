import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Dumbbell,
  Baby,
  Syringe,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { label: "Semua Kategori", icon: <Stethoscope className="w-6 h-6 text-blue-600" /> },
  { label: "Obat & Perawatan", icon: <Syringe className="w-6 h-6 text-green-600" /> },
  { label: "Weight Management", icon: <Dumbbell className="w-6 h-6 text-purple-600" /> },
  { label: "Susu", icon: <Baby className="w-6 h-6 text-yellow-600" /> },
  { label: "Kesehatan Seksual", icon: <HeartPulse className="w-6 h-6 text-pink-600" /> },
  { label: "Peralatan", icon: <Thermometer className="w-6 h-6 text-gray-600" /> },
];

const obatData = [
  { icon: <Syringe className="w-5 h-5 text-blue-600" />, title: "Batuk, Pilek & Flu" },
  { icon: <Thermometer className="w-5 h-5 text-red-500" />, title: "Demam & Nyeri" },
  { icon: <HeartPulse className="w-5 h-5 text-green-600" />, title: "Masalah Pencernaan" },
  { icon: <Stethoscope className="w-5 h-5 text-purple-600" />, title: "Alergi" },
];

export default function ProdukPage() {
  return (
    <div className="flex justify-center">
      <div className="p-6 w-full max-w-7xl">
        {/* Header Kategori */}
        <h1 className="text-2xl font-bold mb-6 px-2 md:px-0">Kategori</h1>

        {/* Kategori horizontal */}
        <div className="overflow-x-auto mb-8 px-2 md:px-0">
          <div className="flex space-x-6 w-max min-w-full pb-4">
            {/* Tombol Tambah */}
            <Link href="/admin/produk/jenis-obat/tambah">
              <Button className="rounded-xl w-24 h-24 text-4xl min-w-[6rem] flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700">
                +
              </Button>
            </Link>

            {/* Daftar kategori */}
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center min-w-[6rem] space-y-2"
              >
                <div className="w-24 h-24 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                  {cat.icon}
                </div>
                <span className="text-sm text-center w-28 whitespace-normal font-medium text-gray-700">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Judul + Tombol Tambah Jenis */}
        <div className="flex items-center justify-between mb-6 px-2 md:px-0">
          <h2 className="text-xl font-semibold">Obat & Perawatan</h2>
          <Link href="/admin/produk/jenis-obat/tambah">
            <Button variant="default" className="text-sm">
              Tambah Jenis
            </Button>
          </Link>
        </div>

        {/* Kartu Obat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-2 md:px-0">
          {obatData.map((category, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                    {category.icon}
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
