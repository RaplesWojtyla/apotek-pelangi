'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';


// Definisikan tipe FakturItem yang lebih lengkap untuk HistoryModal
interface FakturItem {
    id: string;
    nama_penerima?: string;
    tanggal_faktur: Date;
    status: string;
    total: number;
    id_user: string;
    id_kasir?: string | null;
    metode_pembayaran: string; // Tambahkan metode_pembayaran di sini
    detail_faktur_penjualan?: Array<{
        id: string;
        jumlah: number;
        barang?: {
            nama_barang: string;
            harga_jual: number;
            foto_barang?: string;
        };
    }>;
}

export default function HistoryModal({
  faktur,
}: {
  faktur: FakturItem; // Gunakan tipe FakturItem yang diperbarui
}) {
  const [open, setOpen] = useState(false);
  const currentStatus = faktur.status;

  const baseStatusSteps = [
    { label: 'Menunggu Pembayaran', value: 'MENUNGGU_PEMBAYARAN' },
    { label: 'Pembayaran Berhasil', value: 'PEMBAYARAN_BERHASIL' },
    { label: 'Menunggu Pengambilan', value: 'MENUNGGU_PENGAMBILAN' },
    { label: 'Selesai', value: 'SELESAI' },
  ];

  let displayedSteps = [];
  let finalStatusColorClass = 'bg-gray-300';

  if (currentStatus === 'PEMBAYARAN_GAGAL') {
    displayedSteps = [
      { label: 'Menunggu Pembayaran', value: 'MENUNGGU_PEMBAYARAN' },
      { label: 'Pembayaran Gagal', value: 'PEMBAYARAN_GAGAL' },
    ];
    finalStatusColorClass = 'bg-red-500';
  } else if (currentStatus === 'DIBATALKAN') {
    displayedSteps = [
      { label: 'Menunggu Pembayaran', value: 'MENUNGGU_PEMBAYARAN' },
      { label: 'Dibatalkan', value: 'DIBATALKAN' },
    ];
    finalStatusColorClass = 'bg-red-700';
  } else if (currentStatus === 'JATUH_TEMPO') {
    displayedSteps = [
      { label: 'Menunggu Pembayaran', value: 'MENUNGGU_PEMBAYARAN' },
      { label: 'Jatuh Tempo', value: 'JATUH_TEMPO' },
    ];
    finalStatusColorClass = 'bg-orange-500';
  } else {
    displayedSteps = baseStatusSteps;
  }

  const currentStatusDisplayIndex = displayedSteps.findIndex(s => s.value === currentStatus);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-primary text-sm font-semibold mt-2 inline-block cursor-pointer">Lihat Detail</button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto font-inter">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-56">
          {Array.isArray(faktur.detail_faktur_penjualan) &&
            faktur.detail_faktur_penjualan.map((dtx: any) => (
              <div key={dtx.id} className="flex gap-4 mt-4 items-center">
                <Image
                  src={`/${dtx.barang?.foto_barang ?? 'noimage.jpg'}`}
                  alt={dtx.barang?.nama_barang ?? 'Barang'}
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                  onError={(e) => { e.currentTarget.src = '/noimage.jpg'; }}
                />
                <div>
                  <p className="font-semibold">{dtx.barang?.nama_barang}</p>
                  <p className="text-sm text-gray-600">
                    Rp {dtx.barang?.harga_jual?.toLocaleString('id-ID') ?? 0} x {dtx.jumlah}
                  </p>
                  <p className="font-bold mt-1 text-gray-800">
                    Rp {dtx.barang?.harga_jual ? (dtx.barang.harga_jual * dtx.jumlah).toLocaleString('id-ID') : 0}
                  </p>
                </div>
              </div>
            ))}
          {(!Array.isArray(faktur.detail_faktur_penjualan) || faktur.detail_faktur_penjualan.length === 0) && (
            <p className="text-center text-gray-500 pt-4">Tidak ada detail barang untuk transaksi ini.</p>
          )}
        </ScrollArea>

        <div className="mt-4 text-sm text-gray-700">
          <h4 className="font-semibold mb-1 text-gray-800">Informasi Pesanan</h4>
          <p>ID Transaksi : <span className="font-medium">{faktur.id}</span></p>
          <p>Nama Penerima : <span className="font-medium">{faktur.nama_penerima ?? 'N/A'}</span></p>
          <p>Tanggal : <span className="font-medium">{new Date(faktur.tanggal_faktur).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
          <p>Metode Pembayaran : <span className="font-medium">{faktur.metode_pembayaran.toUpperCase().replaceAll('_', ' ')}</span></p> {/* Tampilkan metode pembayaran */}
          <p>Status : <span className="font-medium">{currentStatus.replaceAll('_', ' ')}</span></p>
          <p>Total : <span className="font-medium">Rp {faktur.total?.toLocaleString('id-ID')}</span></p>

          <h4 className="font-semibold mt-4 mb-2 text-gray-800">Status Pengiriman</h4>
          <div className="flex flex-col relative ml-4">
            {displayedSteps.map((s, idx) => {
              const isActive = idx <= currentStatusDisplayIndex;
              const isCurrentStep = idx === currentStatusDisplayIndex;

              let dotColorClass = isActive ? 'bg-green-500' : 'bg-gray-300';
              if (isCurrentStep && (currentStatus === 'PEMBAYARAN_GAGAL' || currentStatus === 'DIBATALKAN' || currentStatus === 'JATUH_TEMPO')) {
                dotColorClass = finalStatusColorClass;
              }

              return (
                <div className="flex items-start gap-3 relative" key={s.value}>
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${dotColorClass}`} />
                    {idx < displayedSteps.length - 1 && (
                      <div className={`w-[2px] h-8 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                    )}
                  </div>
                  <span className={`text-sm ${isActive ? 'text-black' : 'text-gray-400'}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
