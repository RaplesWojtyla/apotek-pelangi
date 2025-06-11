import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList, Plus, Search } from "lucide-react"; 

const fakturPembelian = [
  {
    id: "PB001",
    id_user: "U001",
    nama_user: "Admin 1",
    id_vendor: "V001",
    nama_vendor: "PT Obat Sehat",
    tanggal_faktur: "2025-05-17T09:00:00Z",
    pajak: 10000,
    total: 200000,
    keterangan: "Pembelian grosir",
    createdAt: "2025-05-17T09:00:00Z",
    detail: Array.from({ length: 20 }, (_, i) => ({
      id_barang: `B00${i}`,
      nama_barang: `Obat ${i + 1}`,
      jumlah: 2,
      harga_beli: 10000,
    })),
  },
  {
    id: "PB002",
    id_user: "U002",
    nama_user: "Admin 2",
    id_vendor: "V002",
    nama_vendor: "CV Farma Jaya",
    tanggal_faktur: "2025-05-18T11:30:00Z",
    pajak: 5000,
    total: 120000,
    keterangan: "-",
    createdAt: "2025-05-18T11:30:00Z",
    detail: [
      { id_barang: "B003", nama_barang: "Amoxicillin", jumlah: 30, harga_beli: 3000 },
    ],
  },
];

// StatCard untuk jumlah faktur pembelian
function StatCardJumlahPembelian({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[280px] mb-6">
      <div className="p-4 rounded-full bg-blue-100">
        <ClipboardList className="text-blue-600 w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Total Faktur Pembelian</p>
        <h3 className="text-2xl font-bold">{jumlah}</h3>
      </div>
    </div>
  );
}

export default function LogPembelianPage() {
  return (
    <div className="p-4 max-w-[1240px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log Pembelian</h1>
      {/* StatCard */}
      <StatCardJumlahPembelian jumlah={fakturPembelian.length} />



      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Cari log pembelian..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
          <Button asChild className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600">
            <span>
              <Plus className="w-4 h-4 inline mr-1" />
              Tambah Pembelian
            </span>
          </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]">No</TableHead>
              <TableHead className="min-w-[150px]">Vendor</TableHead>
              <TableHead className="min-w-[120px]">Pembeli</TableHead>
              <TableHead className="min-w-[150px]">Tanggal</TableHead>
              <TableHead className="min-w-[100px]">Pajak</TableHead>
              <TableHead className="min-w-[120px]">Total</TableHead>
              <TableHead className="min-w-[150px]">Detail Pembelian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fakturPembelian.map((faktur, index) => (
              <TableRow key={faktur.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{faktur.nama_vendor}</TableCell>
                <TableCell>{faktur.nama_user}</TableCell>
                <TableCell>{new Date(faktur.tanggal_faktur).toLocaleDateString()}</TableCell>
                <TableCell>Rp{faktur.pajak.toLocaleString()}</TableCell>
                <TableCell>Rp{faktur.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Lihat Detail</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>Detail Pembelian - {faktur.id}</DialogTitle>
                        <DialogDescription>
                          Transaksi oleh <strong>{faktur.nama_user}</strong> dari{" "}
                          <strong>{faktur.nama_vendor}</strong> pada{" "}
                          <strong>{new Date(faktur.tanggal_faktur).toLocaleString()}</strong>
                        </DialogDescription>
                      </DialogHeader>

                      <ScrollArea className="mt-4 h-[400px] pr-2">
                        <div className="space-y-2">
                          <div><strong>Keterangan:</strong> {faktur.keterangan || "-"}</div>
                          <div><strong>Pajak:</strong> Rp{faktur.pajak.toLocaleString()}</div>
                          <div><strong>Total:</strong> Rp{faktur.total.toLocaleString()}</div>
                          <div className="mt-3">
                            <strong>Barang Dibeli:</strong>
                            <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                              {faktur.detail.map((item, i) => (
                                <li key={i}>
                                  {item.nama_barang} (x{item.jumlah}) – Rp{(item.harga_beli * item.jumlah).toLocaleString()}
                                  <br />
                                  <span className="text-xs text-gray-500">
                                    Harga satuan: Rp{item.harga_beli.toLocaleString()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
