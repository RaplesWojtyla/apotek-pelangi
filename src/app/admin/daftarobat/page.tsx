'use client'

import React from 'react'
import AdminSidebar from '@/components/SidebarAdmin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpDown, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// ✅ Tipe data diperluas
type Obat = {
  id: string
  id_barang: string
  deskripsi: string
  indikasi_umum: string
  komposisi: string
  dosis: string
  aturan_pakai: string
  perhatian: string
  kontra_indikasi: string
  efek_samping: string
  golongan: string
  kemasan: string
  manufaktur: string
  no_bpom: string
}

// ✅ Dummy data
const dummyObat: Obat[] = [
  {
    id: '1',
    id_barang: 'BRG001',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG002',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG003',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG004',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG005',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG006',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG001',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
  {
    id: '1',
    id_barang: 'BRG001',
    deskripsi: 'Paracetamol 500mg',
    indikasi_umum: 'Mengurangi demam dan nyeri',
    komposisi: 'Paracetamol 500mg',
    dosis: '3x sehari',
    aturan_pakai: 'Sesudah makan',
    perhatian: 'Hati-hati untuk penderita gangguan hati',
    kontra_indikasi: 'Alergi paracetamol',
    efek_samping: 'Mual, ruam kulit',
    golongan: 'Obat Bebas',
    kemasan: 'Strip @10 tablet',
    manufaktur: 'PT Kimia Farma',
    no_bpom: 'BPOM RI D123456789',
  },
]

const columns: ColumnDef<Obat>[] = [
  {
    id: 'no',
    header: ({ column }) => <SortableHeader column={column} label="No" />,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'id_barang',
    header: ({ column }) => <SortableHeader column={column} label="ID Barang" />,
  },
  {
    accessorKey: 'deskripsi',
    header: ({ column }) => <SortableHeader column={column} label="Deskripsi" />,
  },
  {
    accessorKey: 'indikasi_umum',
    header: ({ column }) => <SortableHeader column={column} label="Indikasi Umum" />,
  },
  {
    accessorKey: 'komposisi',
    header: ({ column }) => <SortableHeader column={column} label="Komposisi" />,
  },
  {
    accessorKey: 'dosis',
    header: ({ column }) => <SortableHeader column={column} label="Dosis" />,
  },
  {
    accessorKey: 'aturan_pakai',
    header: ({ column }) => <SortableHeader column={column} label="Aturan Pakai" />,
  },
  {
    accessorKey: 'golongan',
    header: ({ column }) => <SortableHeader column={column} label="Golongan" />,
  },
  {
    accessorKey: 'kemasan',
    header: ({ column }) => <SortableHeader column={column} label="Kemasan" />,
  },
  {
    accessorKey: 'manufaktur',
    header: ({ column }) => <SortableHeader column={column} label="Manufaktur" />,
  },
  {
    accessorKey: 'no_bpom',
    header: ({ column }) => <SortableHeader column={column} label="No BPOM" />,
  },
]

// ✅ Header kolom sortable statis (tidak berubah-ubah)
function SortableHeader({ column, label }: { column: any; label: string }) {
  return (
    <Button
      variant="ghost"
      className="px-0 hover:bg-transparent"
      onClick={() => column.toggleSorting()}
    >
      {label}
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </Button>
  )
}

export default function DaftarObat() {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: dummyObat,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <AdminSidebar>
      <h1 className="text-2xl font-bold mb-4">Daftar Obat</h1>

      {/* Filter dan tombol tambah */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 w-full md:w-auto">
          <Input placeholder="Cari obat..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <Link href="/admin/daftarobat/tambah">
          <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Tambah Obat
          </Button>
        </Link>
      </div>

      {/* Tabel dengan horizontal scroll */}
      <div className="relative w-full">
        <div className="overflow-x-auto pb-4">
          <Table className="min-w-[1800px] text-sm">
            <TableHeader>
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id}>
                  {group.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminSidebar>
  )
}
