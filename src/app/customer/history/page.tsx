"use client";

import React, { useState } from "react";
import Image from "next/image";

// Dummy data
const transaksi = [
  {
    id: "TRX00000001",
    status: "Berhasil",
    total: 22000,
    items: [
      {
        nama: "Artrodar 50mg 10 kapsul",
        jumlah: 1,
        harga: 12000,
        gambar: "/img/artrodar.png",
      },
    ],
  },
  {
    id: "TRX00000002",
    status: "Proses",
    total: 22000,
    items: [
      {
        nama: "Artrodar 50mg 10 kapsul",
        jumlah: 1,
        harga: 12000,
        gambar: "/img/artrodar.png",
      },
    ],
  },
];

// Status filter
const statusTabs = ["Semua", "Belum Bayar", "Diproses", "Dikirim", "Dibatalkan", "Selesai"];

export default function RiwayatTransaksiPage() {
  const [filter, setFilter] = useState("Semua");

  const filtered = transaksi.filter((t) =>
    filter === "Semua" ? true : t.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="max-w-5xl min-h-screen mx-auto px-4 py-6 pt-18">
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-md font-semibold ${
              filter === tab ? "bg-cyan-500 text-white" : "bg-cyan-100 text-cyan-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Kartu transaksi */}
      <div className="space-y-4">
        {filtered.map((trx) => (
          <div
            key={trx.id}
            className="border rounded-lg p-4 flex flex-col gap-4 shadow-sm bg-white"
          >
            <div className="text-sm text-gray-600 font-medium">No Pesanan : {trx.id}</div>
            <div className="flex items-start gap-4">
              <Image
                src={trx.items[0].gambar}
                alt={trx.items[0].nama}
                width={100}
                height={100}
                className="object-contain rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{trx.items[0].nama}</p>
                <p className="text-sm text-gray-600">
                  {trx.items[0].jumlah} x Rp{trx.items[0].harga.toLocaleString()}
                </p>
                <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                  Lihat Detail
                </a>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">Rp{trx.total.toLocaleString()}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded ${
                    trx.status === "Berhasil"
                      ? "bg-green-500 text-white"
                      : trx.status === "Proses"
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {trx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
