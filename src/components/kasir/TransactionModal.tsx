'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { updateFakturStatus, buatNotifikasi } from '@/action/kasir/faktur.action';

export default function TransaksiDetailDialog({
  faktur,
  onUpdate,
}: {
  faktur: any;
  onUpdate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(faktur.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusSteps = [
    { label: 'Menunggu Pembayaran', value: 'MENUNGGU_PEMBAYARAN' },
    { label: 'Pembayaran Berhasil', value: 'PEMBAYARAN_BERHASIL' },
    { label: 'Menunggu Pengambilan', value: 'MENUNGGU_PENGAMBILAN' },
    { label: 'Selesai', value: 'SELESAI' },
  ];

  const currStatusIndex = statusSteps.findIndex((s) => s.value === currentStatus);

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      await updateFakturStatus(faktur.id, 'SELESAI');
      toast.success('Transaksi diselesaikan.');
      setCurrentStatus('SELESAI');
      setOpen(false);
      onUpdate();
    } catch (err) {
      toast.error('Gagal menyelesaikan transaksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSiapkan = async () => {
    try {
      setIsSubmitting(true);
      await updateFakturStatus(faktur.id, 'MENUNGGU_PENGAMBILAN');
      await buatNotifikasi({
        id_user: faktur.id_user,
        id_sumber: faktur.id,
        tipe_sumber: 'FAKTUR_PENJUALAN',
        judul: 'Pesanan Siap Diambil',
        pesan: `Pesanan ID ${faktur.id} siap diambil.`,
      });
      toast.success('Barang dikemas.');
      setCurrentStatus('MENUNGGU_PENGAMBILAN');
      setOpen(false);
      onUpdate();
    } catch (err) {
      toast.error('Gagal menyiapkan barang.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-primary text-sm font-semibold mt-2 inline-block cursor-pointer">Lihat Detail</button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-56">
          {Array.isArray(faktur.detail_faktur_penjualan) &&
            faktur.detail_faktur_penjualan.map((dtx: any) => (
              <div key={dtx.id} className="flex gap-4 mt-4">
                <Image
                  src={`/${dtx.barang?.foto_barang ?? 'noimage.jpg'}`}
                  alt={dtx.barang?.nama_barang ?? 'Barang'}
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <div>
                  <p className="font-semibold">{dtx.barang?.nama_barang}</p>
                  <p className="text-sm">
                    Rp {dtx.barang?.harga_jual?.toLocaleString('id-ID') ?? 0} x {dtx.jumlah}
                  </p>
                  <p className="font-bold mt-1">
                    Rp {dtx.barang?.harga_jual ? (dtx.barang.harga_jual * dtx.jumlah).toLocaleString('id-ID') : 0}
                  </p>
                </div>
              </div>
            ))}
        </ScrollArea>

        <div className="mt-4 text-sm">
          <h4 className="font-semibold mb-1">Informasi Pesanan</h4>
          <p>ID Transaksi : {faktur.id}</p>
          <p>Nama Penerima : {faktur.nama_penerima}</p>
          <p>Tanggal : {new Date(faktur.tanggal_faktur).toLocaleDateString()}</p>
          <p>Status : {currentStatus.replaceAll('_', ' ')}</p>
          <p>Total : Rp {faktur.total?.toLocaleString('id-ID')}</p>

          <h4 className="font-semibold mt-4 mb-2">Status Pengiriman</h4>
          <div className="flex flex-col relative ml-4">
            {statusSteps.map((s, idx) => {
              const isActive = idx <= currStatusIndex;
              return (
                <div className="flex items-start gap-3 relative" key={idx}>
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {idx < statusSteps.length - 1 && (
                      <div className={`w-[2px] h-8 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                    )}
                  </div>
                  <span className={`text-sm ${isActive ? 'text-black' : 'text-gray-400'}`}>{s.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 space-y-3">
            {currentStatus === 'PEMBAYARAN_BERHASIL' && (
              <Button className="w-full" onClick={handleSiapkan} disabled={isSubmitting}>
                Siapkan Barang
              </Button>
            )}
            {currentStatus === 'MENUNGGU_PENGAMBILAN' && (
              <Button className="w-full" onClick={handleComplete} disabled={isSubmitting}>
                Transaksi Selesai
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
