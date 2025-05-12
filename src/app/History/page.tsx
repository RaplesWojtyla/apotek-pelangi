'use client';

import React from "react";
import "../../app/globals.css";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const transactions = [
  {
    id: "TRX001",
    date: "2024-05-01",
    status: "success",
    total: 120000,
  },
  {
    id: "TRX002",
    date: "2024-05-02",
    status: "pending",
    total: 45000,
  },
  {
    id: "TRX003",
    date: "2024-05-03",
    status: "failed",
    total: 70000,
  },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge className="bg-green-500 text-white">Berhasil</Badge>;
    case "pending":
      return <Badge className="bg-yellow-400 text-black">Diproses</Badge>;
    case "failed":
      return <Badge variant="destructive">Gagal</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow w-full px-4 sm:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Riwayat Transaksi</h1>

        <div className="space-y-4 max-w-6xl mx-auto">
          {transactions.map((trx) => (
            <Card
              key={trx.id}
              className="p-6 sm:p-8 bg-white rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <p className="text-base sm:text-lg font-semibold">ID Transaksi: {trx.id}</p>
                <p className="text-sm text-gray-500">Tanggal: {trx.date}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-col items-start sm:items-end gap-1">
                {statusBadge(trx.status)}
                <p className="text-base sm:text-lg font-bold text-gray-700">
                  Total: Rp{trx.total.toLocaleString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
