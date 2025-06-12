'use client';

import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';
import HistoryResepModal from './HistoryResepModal';


interface PengajuanResepItem {
    id: string;
    id_user: string;
    tanggal_pengajuan: Date;
    status: string;
    catatan?: string | null;
    foto_resep: string;
    createdAt: Date;
    user?: {
        nama: string;
    };
}

interface HistoryResepProps {
    pengajuanResepList: PengajuanResepItem[];
    page: number;
    take: number;
}

export default function HistoryResep({ pengajuanResepList, page, take }: HistoryResepProps) {

    const renderResepStatusBadge = (status: string) => {
        return (
            <span className={clsx(
                "inline-block mt-2 px-3 py-1 text-xs rounded",
                {
                    'bg-green-600 text-white': status === 'DITERIMA', // Status DITERIMA
                    'bg-red-700 text-white': status === 'DITOLAK', // Status DITOLAK
                    // Fallback untuk status lain yang mungkin tidak terduga, meskipun filter sudah ketat
                    'bg-gray-400 text-white': !['DITERIMA', 'DITOLAK'].includes(status),
                }
            )}>
                {status.replaceAll('_', ' ')}
            </span>
        );
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-x-auto font-inter">
            <table className="w-full min-w-[800px] text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-700 font-semibold text-left">
                    <tr>
                        <th className="p-4 border-b border-gray-200">No</th>
                        <th className="p-4 border-b border-gray-200">ID Pengajuan</th>
                        <th className="p-4 border-b border-gray-200">Nama User</th>
                        <th className="p-4 border-b border-gray-200">Tanggal Pengajuan</th>
                        <th className="p-4 border-b border-gray-200">Catatan</th>
                        <th className="p-4 border-b border-gray-200">Status</th>
                        <th className="p-4 border-b border-gray-200">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuanResepList.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="p-4 text-center text-gray-500">Tidak ada riwayat pengajuan resep yang diterima atau ditolak.</td>
                        </tr>
                    ) : (
                        pengajuanResepList.map((resep, idx) => (
                            <tr key={resep.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                <td className="p-4">{(page - 1) * take + idx + 1}</td>
                                <td className="p-4 font-medium">{resep.id}</td>
                                <td className="p-4">{resep.user?.nama ?? resep.id_user}</td>
                                <td className="p-4">{new Date(resep.tanggal_pengajuan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                <td className="p-4 max-w-[200px] truncate">{resep.catatan ?? '-'}</td>
                                <td className="p-4">{renderResepStatusBadge(resep.status)}</td>
                                <td className="p-4">
                                    <HistoryResepModal resep={resep} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
