import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Search, Package } from "lucide-react";
import Link from "next/link";

const dummyData = [
  {
    id: "OBT001",
    id_barang: "BRG001",
    deskripsi: "Paracetamol 500mg - Obat penurun demam dan pereda nyeri",
    indikasi_umum: "Demam, sakit kepala, nyeri ringan hingga sedang",
    komposisi: "Paracetamol 500mg",
    dosis: "Dewasa: 1-2 tablet 3-4 kali sehari",
    aturan_pakai: "Diminum sesudah makan",
    perhatian: "Jangan melebihi 8 tablet dalam 24 jam",
    kontra_indikasi: "Hipersensitif terhadap paracetamol",
    efek_samping: "Jarang terjadi, dapat berupa ruam kulit",
    golongan: "Bebas Terbatas",
    kemasan: "Strip 10 tablet",
    manufaktur: "PT Kimia Farma",
    no_bpom: "DTL0332706637A1"
  },
  {
    id: "OBT002",
    id_barang: "BRG002",
    deskripsi: "Amoxicillin 500mg - Antibiotik golongan penisilin",
    indikasi_umum: "Infeksi bakteri pada saluran pernapasan, kulit, dan jaringan lunak",
    komposisi: "Amoxicillin trihydrate setara dengan amoxicillin 500mg",
    dosis: "Dewasa: 250-500mg setiap 8 jam",
    aturan_pakai: "Diminum dengan atau tanpa makanan",
    perhatian: "Habiskan antibiotik sesuai petunjuk dokter",
    kontra_indikasi: "Alergi penisilin",
    efek_samping: "Mual, diare, ruam kulit",
    golongan: "Keras",
    kemasan: "Kapsul 10's", 
    manufaktur: "PT Indofarma",
    no_bpom: "GKL0208505843A1"
  },
  {
    id: "OBT003",
    id_barang: "BRG003",
    deskripsi: "Hansaplast Classic - Plester luka waterproof",
    indikasi_umum: "Penutup luka kecil dan goresan",
    komposisi: "Adhesive tape dengan pad penyerap",
    dosis: "Sesuai kebutuhan",
    aturan_pakai: "Tempelkan pada kulit yang bersih dan kering",
    perhatian: "Ganti secara teratur, jaga kebersihan luka",
    kontra_indikasi: "Luka terbuka yang luas atau dalam",
    efek_samping: "Iritasi kulit pada pengguna sensitif",
    golongan: "Alat Kesehatan",
    kemasan: "Box 20 strips",
    manufaktur: "PT Hansaplast Indonesia",
    no_bpom: "AKD20801816454"
  }
];


function StatCardJumlahObat({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-[260px] mb-6">
      <div className="p-4 rounded-full bg-blue-100">
        <Package className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Jumlah Obat</p>
        <h3 className="text-2xl font-bold">{jumlah}</h3>
      </div>
    </div>
  );
}


export default function DaftarObat() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      {/* Stat Card Jumlah Obat */}
      <StatCardJumlahObat jumlah={dummyData.length} />

      {/* Search dan Tambah */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Cari obat..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <Link href="/admin/daftarobat/tambah" passHref>
          <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Tambah Obat
          </Button>
        </Link>
      </div>

      {/* Tabel Daftar Obat */}
      <div className="w-full max-w-full overflow-x-auto rounded-lg shadow">
        <table className="min-w-[1200px] text-sm text-left bg-white">
          <thead className="bg-gray-100 sticky top-0 text-gray-700 z-10">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2">Indikasi</th>
              <th className="px-4 py-2">Komposisi</th>
              <th className="px-4 py-2">Dosis</th>
              <th className="px-4 py-2">Aturan Pakai</th>
              <th className="px-4 py-2">Golongan</th>
              <th className="px-4 py-2">Kemasan</th>
              <th className="px-4 py-2">Manufaktur</th>
              <th className="px-4 py-2">BPOM</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((obat, index) => (
              <tr key={obat.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{obat.deskripsi}</td>
                <td className="px-4 py-3">{obat.indikasi_umum}</td>
                <td className="px-4 py-3">{obat.komposisi}</td>
                <td className="px-4 py-3">{obat.dosis}</td>
                <td className="px-4 py-3">{obat.aturan_pakai}</td>
                <td className="px-4 py-3">{obat.golongan}</td>
                <td className="px-4 py-3">{obat.kemasan}</td>
                <td className="px-4 py-3">{obat.manufaktur}</td>
                <td className="px-4 py-3">{obat.no_bpom}</td>
                <td className="px-4 py-3 flex gap-1">
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
  