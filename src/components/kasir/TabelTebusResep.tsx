'use client';

import { Badge } from '@/components/ui/badge';
import DetailTebusResepDialog from './DetailTebusDialog';

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

export default function TabelTebusResep() {
  return (
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
              <DetailTebusResepDialog />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
