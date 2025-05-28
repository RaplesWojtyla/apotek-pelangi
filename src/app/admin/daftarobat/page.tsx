import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, Search, Package } from "lucide-react";
import Link from "next/link";

const dummyData = [
  {
    id: "OBT001",
    deskripsi: "Paracetamol 500mg - Obat penurun demam dan pereda nyeri",
    indikasi_umum: "Demam, sakit kepala, nyeri ringan hingga sedang",
    komposisi: "Paracetamol 500mg",
    dosis: "Dewasa: 1-2 tablet 3-4 kali sehari",
    aturan_pakai: "Diminum sesudah makan",
    golongan: "Bebas Terbatas",
    kemasan: "Strip 10 tablet",
    manufaktur: "PT Kimia Farma",
    no_bpom: "DTL0332706637A1"
  },
  {
    id: "OBT002",
    deskripsi: "Amoxicillin 500mg - Antibiotik golongan penisilin",
    indikasi_umum: "Infeksi bakteri pada saluran pernapasan, kulit, dan jaringan lunak",
    komposisi: "Amoxicillin trihydrate setara dengan amoxicillin 500mg",
    dosis: "Dewasa: 250-500mg setiap 8 jam",
    aturan_pakai: "Diminum dengan atau tanpa makanan",
    golongan: "Keras",
    kemasan: "Kapsul 10's",
    manufaktur: "PT Indofarma",
    no_bpom: "GKL0208505843A1"
  },
  {
    id: "OBT003",
    deskripsi: "Hansaplast Classic - Plester luka waterproof",
    indikasi_umum: "Penutup luka kecil dan goresan",
    komposisi: "Adhesive tape dengan pad penyerap",
    dosis: "Sesuai kebutuhan",
    aturan_pakai: "Tempelkan pada kulit yang bersih dan kering",
    golongan: "Alat Kesehatan",
    kemasan: "Box 20 strips",
    manufaktur: "PT Hansaplast Indonesia",
    no_bpom: "AKD20801816454"
  }
];

function StatCardJumlahObat({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[260px] mb-6">
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
    <div className="p-4 max-w-[1204px]">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

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
          <Button className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600">
            <Plus className="w-4 h-4" />
            Tambah Obat
          </Button>
        </Link>
      </div>

      <div className="">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Indikasi</TableHead>
              <TableHead>Komposisi</TableHead>
              <TableHead>Dosis</TableHead>
              <TableHead>Aturan Pakai</TableHead>
              <TableHead>Golongan</TableHead>
              <TableHead>Kemasan</TableHead>
              <TableHead>Manufaktur</TableHead>
              <TableHead>No. BPOM</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((obat, index) => (
              <TableRow key={obat.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{obat.deskripsi}</TableCell>
                <TableCell>{obat.indikasi_umum}</TableCell>
                <TableCell>{obat.komposisi}</TableCell>
                <TableCell>{obat.dosis}</TableCell>
                <TableCell>{obat.aturan_pakai}</TableCell>
                <TableCell>{obat.golongan}</TableCell>
                <TableCell>{obat.kemasan}</TableCell>
                <TableCell>{obat.manufaktur}</TableCell>
                <TableCell>{obat.no_bpom}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      </div>


    </div>
  );
}