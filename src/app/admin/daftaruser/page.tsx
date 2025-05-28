'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ShoppingCart } from "lucide-react";

const fakturPenjualan = [
  {
    id: "FP001",
    id_user: "U001",
    nama_kasir: "Kasir 1",
    tanggal_faktur: "2025-05-19T10:00:00Z",
    alamat: "Jl. Kesehatan No.10",
    status: "Selesai",
    total: 150000,
    keterangan: "Pembayaran tunai",
    createdAt: "2025-05-19T10:00:00Z",
    detail: Array.from({ length: 20 }, (_, i) => ({
      id_barang: `B00${i}`,
      nama_barang: `Obat ${i + 1}`,
      jumlah: 2,
      harga: 10000,
    })),
  },
];

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border w-full md:w-[260px]">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}

export default function LogPenjualanPage() {
  const totalFaktur = fakturPenjualan.length;
  const totalOmzet = fakturPenjualan.reduce((acc, cur) => acc + cur.total, 0);
  const totalSelesai = fakturPenjualan.filter((f) => f.status === "Selesai").length;

  return (
    <div className="p-4 max-w-[1240px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log Penjualan Kasir</h1>

      {/* Stat Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <StatCard title="Total Faktur" value={totalFaktur} icon={<ShoppingCart className="w-5 h-5" />} />
        <StatCard title="Total Omzet" value={`Rp${totalOmzet.toLocaleString()}`} icon={<ShoppingCart className="w-5 h-5" />} />
        <StatCard title="Transaksi Selesai" value={totalSelesai} icon={<ShoppingCart className="w-5 h-5" />} />
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input placeholder="Cari faktur / kasir..." className="w-full md:w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full rounded-lg shadow">
        <table className="min-w-[1240px] bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama Kasir</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {fakturPenjualan.map((faktur, index) => (
              <tr key={faktur.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{faktur.nama_kasir}</td>
                <td className="px-6 py-4">{new Date(faktur.tanggal_faktur).toLocaleDateString()}</td>
                <td className="px-6 py-4">Rp{faktur.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${faktur.status === "Selesai"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {faktur.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] sm:max-w-lg max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle className="text-base sm:text-lg">
                          Detail Transaksi – {faktur.id}
                        </DialogTitle>
                        <DialogDescription>
                          Kasir: <strong>{faktur.nama_kasir}</strong><br />
                          Tanggal: <strong>{new Date(faktur.tanggal_faktur).toLocaleString()}</strong>
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="mt-4 h-[400px] pr-2 text-sm">
                        <div className="space-y-2">
                          <div><strong>Alamat:</strong> {faktur.alamat}</div>
                          <div><strong>Status:</strong> {faktur.status}</div>
                          <div><strong>Keterangan:</strong> {faktur.keterangan || "-"}</div>
                          <div><strong>Total:</strong> Rp{faktur.total.toLocaleString()}</div>
                          <div className="mt-3">
                            <strong>Barang Dibeli:</strong>
                            <ul className="list-disc ml-5 mt-2 space-y-1">
                              {faktur.detail.map((item, i) => (
                                <li key={i}>
                                  {item.nama_barang} (x{item.jumlah}) – Rp{(item.harga * item.jumlah).toLocaleString()}
                                  <div className="text-xs text-gray-500">
                                    Harga satuan: Rp{item.harga.toLocaleString()}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
