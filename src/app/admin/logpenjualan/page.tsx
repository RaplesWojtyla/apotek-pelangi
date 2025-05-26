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
  DialogClose,
} from "@/components/ui/dialog";


// Dummy data sesuai struktur tabel
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
    detail: [
      { id_barang: "B001", nama_barang: "Paracetamol", jumlah: 2, harga: 5000 },
      { id_barang: "B002", nama_barang: "Vitamin C", jumlah: 1, harga: 8000 },
    ],
  },
  {
    id: "FP002",
    id_user: "U002",
    nama_kasir: "Kasir 2",
    tanggal_faktur: "2025-05-18T14:30:00Z",
    alamat: "Jl. Sehat Selalu No.12",
    status: "Selesai",
    total: 90000,
    keterangan: "-",
    createdAt: "2025-05-18T14:30:00Z",
    detail: [
      { id_barang: "B003", nama_barang: "Amoxicillin", jumlah: 3, harga: 12000 },
    ],
  },
];

export default function LogPenjualanPage() {
  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Log Penjualan Kasir</h1>

        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Cari kasir atau faktur..." className="max-w-md" />
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Cari</Button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Nama Kasir</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Detail Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {fakturPenjualan.map((faktur, index) => (
                <tr key={faktur.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{faktur.nama_kasir}</td>
                  <td className="px-4 py-3">
                    {new Date(faktur.tanggal_faktur).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">Rp{faktur.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${faktur.status === "Selesai"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {faktur.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Lihat Detail</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Detail Transaksi – {faktur.id}</DialogTitle>
                          <DialogDescription>
                            Dilayani oleh <strong>{faktur.nama_kasir}</strong> pada{" "}
                            <strong>{new Date(faktur.tanggal_faktur).toLocaleString()}</strong>
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 space-y-2 text-sm">
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
                                  <br />
                                  <span className="text-xs text-gray-500">Harga satuan: Rp{item.harga.toLocaleString()}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <DialogClose asChild>
                          <Button variant="outline" className="mt-4">Tutup</Button>
                        </DialogClose>
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
