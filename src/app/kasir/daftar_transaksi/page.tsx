'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DetailTebusResepDialog from '@/components/DetailTebusDialog';
import TransaksiDetailDialog from '@/components/TransactionModal';


export default function DaftarTransaksi() {
  const [kategori, setKategori] = useState<'resep' | 'biasa'>('resep');

  const renderBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'selesai' || s === 'berhasil') {
      return <Badge variant="default">Selesai</Badge>;
    } else if (s === 'menunggu') {
      return <Badge variant="secondary">Menunggu</Badge>;
    } else if (s === 'ditolak' || s === 'dibatalkan') {
      return <Badge variant="destructive">Dibatalkan</Badge>;
    }
    return <Badge>Unknown</Badge>;
  };

  // Contoh data transaksi biasa (untuk dialog TransaksiDetailDialog)
  const transaksiBiasaData = {
    id: 'TX-002',
    customer: 'Ny. Sari',
    date: '2025-05-08',
    total: 0,
    status: 'dibatalkan',
    kategori: 'biasa',
    items: [
      { nama: 'Item A', jumlah: 1, harga: 10000, gambar: '/item-a.png' },
      // tambah item sesuai kebutuhan
    ],
  };

  // Fungsi dummy update status (bisa dikembangkan)
  const onUpdateStatus = (id: string, status: string) => {
    console.log(`Update status transaksi ${id} menjadi ${status}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Daftar Transaksi</h1>

      <div className="flex gap-4">
        <Button
          variant={kategori === 'resep' ? 'default' : 'outline'}
          onClick={() => setKategori('resep')}
        >
          Tebus Resep
        </Button>
        <Button
          variant={kategori === 'biasa' ? 'default' : 'outline'}
          onClick={() => setKategori('biasa')}
        >
          Transaksi Biasa
        </Button>
      </div>

      {kategori === 'resep' && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gray-50 text-gray-700 font-semibold text-left">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">ID Transaksi</th>
                <th className="p-4">Nama Pengaju</th>
                <th className="p-4">Tanggal Upload</th>
                <th className="p-4">Status</th>
                <th className="p-4">Catatan</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-4">1</td>
                <td className="p-4 font-medium">TX-001</td>
                <td className="p-4">Tn. Budi</td>
                <td className="p-4">2025-05-07</td>
                <td className="p-4">{renderBadge('selesai')}</td>
                <td className="p-4">Cepat eeee</td>
                <td className="p-4">
                  {/* Panggil dialog DetailTebusResepDialog di sini */}
                  <DetailTebusResepDialog />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {kategori === 'biasa' && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gray-50 text-gray-700 font-semibold text-left">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">ID Transaksi</th>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-4">1</td>
                <td className="p-4 font-medium">{transaksiBiasaData.id}</td>
                <td className="p-4">{transaksiBiasaData.customer}</td>
                <td className="p-4">{transaksiBiasaData.date}</td>
                <td className="p-4">Rp {transaksiBiasaData.total.toLocaleString()}</td>
                <td className="p-4">{renderBadge(transaksiBiasaData.status)}</td>
                <td className="p-4">
                  <TransaksiDetailDialog/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
