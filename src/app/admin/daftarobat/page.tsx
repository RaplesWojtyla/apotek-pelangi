"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pencil,
  Eye,
  Plus,
  Search,
  Package,
  MoreVertical,
  ChevronsUpDown,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


const dummyData = [
  {
    id: "OBT001",
    nama: "Paracetamol 500mg",
    deskripsi: "Obat penurun demam dan pereda nyeri",
    indikasi_umum: "Demam, sakit kepala, nyeri ringan hingga sedang",
    komposisi: "Paracetamol 500mg",
    dosis: "Dewasa: 1-2 tablet 3-4 kali sehari",
    aturan_pakai: "Diminum sesudah makan",
    perhatian: "Hati-hati pada penderita gangguan fungsi hati",
    kontra_indikasi: "Alergi terhadap paracetamol",
    efek_samping: "Mual, reaksi alergi",
    golongan: "Bebas Terbatas",
    kemasan: "Strip 10 tablet",
    manufaktur: "PT Kimia Farma",
    no_bpom: "DTL0332706637A1",
    total_stok: 100,
    tanggal_kadaluarsa: "2026-12-31",
    status: "Aktif"
  },
  {
    id: "OBT002",
    nama: "Amoxicillin 500mg",
    deskripsi: "Antibiotik golongan penisilin",
    indikasi_umum: "Infeksi saluran pernapasan, kulit, dan jaringan lunak",
    komposisi: "Amoxicillin trihydrate setara dengan amoxicillin 500mg",
    dosis: "Dewasa: 250-500mg setiap 8 jam",
    aturan_pakai: "Diminum dengan atau tanpa makanan",
    perhatian: "Hati-hati pada penderita asma dan gangguan ginjal",
    kontra_indikasi: "Alergi terhadap penisilin",
    efek_samping: "Diare, ruam kulit, mual",
    golongan: "Keras",
    kemasan: "Kapsul 10's",
    manufaktur: "PT Indofarma",
    no_bpom: "GKL0208505843A1",
    total_stok: 80,
    tanggal_kadaluarsa: "2025-10-15",
    status: "Aktif"
  },
  {
    id: "OBT003",
    nama: "Hansaplast Classic",
    deskripsi: "Plester luka waterproof",
    indikasi_umum: "Penutup luka kecil dan goresan",
    komposisi: "Adhesive tape dengan pad penyerap",
    dosis: "Sesuai kebutuhan",
    aturan_pakai: "Tempelkan pada kulit yang bersih dan kering",
    perhatian: "Ganti secara berkala untuk kebersihan",
    kontra_indikasi: "Kulit sensitif terhadap bahan perekat",
    efek_samping: "Iritasi ringan",
    golongan: "Lainnya",
    kemasan: "Box 20 strips",
    manufaktur: "PT Hansaplast Indonesia",
    no_bpom: "AKD20801816454",
    total_stok: 50,
    tanggal_kadaluarsa: "2027-01-01",
    status: "Aktif"
  },
  {
    id: "OBT004",
    nama: "Ibuprofen 400mg",
    deskripsi: "Anti nyeri dan anti radang",
    indikasi_umum: "Nyeri otot, nyeri sendi, nyeri haid, demam",
    komposisi: "Ibuprofen 400mg",
    dosis: "Dewasa: 400mg setiap 4-6 jam jika perlu",
    aturan_pakai: "Sesudah makan",
    perhatian: "Hati-hati untuk penderita maag",
    kontra_indikasi: "Ulkus lambung aktif, kehamilan trimester 3",
    efek_samping: "Sakit perut, mual, pusing",
    golongan: "Bebas Terbatas",
    kemasan: "Strip 10 tablet",
    manufaktur: "PT Kalbe Farma",
    no_bpom: "DTL7120056810A1",
    total_stok: 120,
    tanggal_kadaluarsa: "2025-07-01",
    status: "Aktif"
  },
  {
    id: "OBT005",
    nama: "Cetirizine 10mg",
    deskripsi: "Antihistamin untuk alergi",
    indikasi_umum: "Rinitis alergi, urtikaria kronis",
    komposisi: "Cetirizine HCl 10mg",
    dosis: "Dewasa: 1 tablet per hari",
    aturan_pakai: "Dapat diminum sebelum atau sesudah makan",
    perhatian: "Dapat menyebabkan kantuk",
    kontra_indikasi: "Hipersensitif terhadap cetirizine",
    efek_samping: "Kantuk, mulut kering",
    golongan: "Bebas Terbatas",
    kemasan: "Strip 10 tablet",
    manufaktur: "PT Sanbe Farma",
    no_bpom: "DTL1234567890A1",
    total_stok: 70,
    tanggal_kadaluarsa: "2026-03-30",
    status: "Aktif"
  }
];


function StatCardJumlahObat({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[260px] mb-6">
      <div className="p-4 rounded-full bg-blue-100">
        <Package className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Jumlah Produk</p>
        <h3 className="text-2xl font-bold">{jumlah}</h3>
      </div>
    </div>
  );
}

export default function DaftarObat() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof dummyData[0];
    direction: "asc" | "desc";
  } | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function handleSort(key: keyof typeof dummyData[0]) {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      } else {
        return { key, direction: "asc" };
      }
    });
  }

  const sortedData = useMemo(() => {
    if (!sortConfig) return dummyData;
    return [...dummyData].sort((a, b) => {
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  const headers: { key: keyof typeof dummyData[0]; label: string }[] = [
    { key: "nama", label: "Nama Produk" },
    { key: "deskripsi", label: "Deskripsi" },
    { key: "indikasi_umum", label: "Indikasi" },
    { key: "komposisi", label: "Komposisi" },
    { key: "dosis", label: "Dosis" },
    { key: "aturan_pakai", label: "Aturan Pakai" },
    { key: "perhatian", label: "Perhatian" },
    { key: "kontra_indikasi", label: "Kontra Indikasi" },
    { key: "efek_samping", label: "Efek Samping" },
    { key: "golongan", label: "Golongan" },
    { key: "kemasan", label: "Kemasan" },
    { key: "manufaktur", label: "Manufaktur" },
    { key: "no_bpom", label: "No. BPOM" },
    { key: "total_stok", label: "Total Stok" },
    { key: "tanggal_kadaluarsa", label: "Kadaluarsa" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="p-4 max-w-[1240px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      <StatCardJumlahObat jumlah={dummyData.length} />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Cari produk..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <Link href="/admin/daftarobat/tambah">
          <Button className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600">
            <Plus className="w-4 h-4" />
            Tambah Obat
          </Button>
        </Link>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableCaption />
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              {headers.map((header) => (
                <TableHead
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  className="cursor-pointer select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {header.label}
                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </TableHead>
              ))}
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((obat, index) => (
              <TableRow key={obat.id}>
                {/* No */}
                <TableCell>{index + 1}</TableCell>

                {/* Data berdasarkan headers */}
                {headers.map((h) => (
                  <TableCell key={h.key}>{obat[h.key]}</TableCell>
                ))}

                {/* Aksi (dropdown) */}
                <TableCell className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="z-50 w-36"
                      sideOffset={8}
                    >
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/daftarobat/view/${obat.id}`}>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Lihat
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/daftarobat/edit/${obat.id}`}>
                          <div className="flex items-center gap-2">
                            <Pencil className="w-4 h-4" />
                            Edit
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
