import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/SidebarAdmin";
import Link from "next/link";

const categories = [
  "Semua Kategori",
  "Obat & Perawatan",
  "Weight Management",
  "Susu",
  "Kesehatan Seksual",
  "Peralatan",
];

const obatData = [
  {
    icon : "🥲",
    title: "Batuk, Pilek & Flu",
  },
  {
    icon : "🥲",
    title: "Demam & Nyeri",
  },
  {
    icon : "🥲",
    title: "Masalah Pencernaan",
  },
  {
    icon : "🥲",
    title: "Alergi",
  },
];

export default function ProdukPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6 ml-2">Kategori</h1>

        {/* Kategori horizontal */}
        <div className="overflow-x-auto ml-2 mb-6">
          <div className="flex space-x-6 pb-4 w-max min-w-full">
            {/* Tombol + */}
            <Link href="/admin/produk/jenis-obat/tambah">
              <Button className="rounded-full w-24 h-24 text-4xl min-w-24 flex items-center justify-center">
                +
              </Button>
            </Link>

            {/* Daftar kategori */}
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center min-w-24">
                <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center"></div>
                <span className="text-sm text-center mt-2 w-28 whitespace-normal">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Judul + Tombol Tambah Jenis */}
        <div className="flex items-center justify-between mb-4 ml-2 mr-4">
          <h2 className="text-xl font-semibold">Obat & Perawatan</h2>
          <Link href="/admin/produk/jenis-obat/tambah">
            <Button variant="default" className="text-sm">
              Tambah Jenis
            </Button>
          </Link>
        </div>

        {/* Kartu Obat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ml-2">
          {obatData.map((category, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <span className="rounded-full mr-2">{category.icon}</span>
                  <h3 className="font-bold text-md">{category.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
