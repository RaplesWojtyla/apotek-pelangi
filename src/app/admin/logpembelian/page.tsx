import React from "react";
import AdminSidebar from "@/components/SidebarAdmin";
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


// Dummy data sesuai struktur fakturpembelian + detailfaktur_pembelian
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
    detail: [
      { id_barang: "B001", nama_barang: "Paracetamol", jumlah: 100, harga_beli: 1000 },
      { id_barang: "B002", nama_barang: "Vitamin C", jumlah: 50, harga_beli: 1500 },
    ],
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

export default function LogPembelianPage() {
  return (
    <AdminSidebar>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Log Pembelian Obat</h1>

        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Cari vendor atau user..." className="max-w-md" />
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Cari</Button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Pajak</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Detail Pembelian</th>
              </tr>
            </thead>
            <tbody>
  {fakturPembelian.map((faktur, index) => (
    <tr key={faktur.id} className="border-t hover:bg-gray-50">
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3">{faktur.nama_vendor}</td>
      <td className="px-4 py-3">{faktur.nama_user}</td>
      <td className="px-4 py-3">
        {new Date(faktur.tanggal_faktur).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">Rp{faktur.pajak.toLocaleString()}</td>
      <td className="px-4 py-3">Rp{faktur.total.toLocaleString()}</td>
      <td className="px-4 py-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Lihat Detail</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Detail Pembelian - {faktur.id}</DialogTitle>
              <DialogDescription>
                Transaksi oleh <strong>{faktur.nama_user}</strong> dari <strong>{faktur.nama_vendor}</strong> pada{" "}
                <strong>{new Date(faktur.tanggal_faktur).toLocaleString()}</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-2">
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
                      <span className="text-xs text-gray-500">Harga satuan: Rp{item.harga_beli.toLocaleString()}</span>
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
    </AdminSidebar>
  );
}
