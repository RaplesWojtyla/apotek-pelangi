'use client';

import toast from 'react-hot-toast';
import clsx from 'clsx';

import { Badge } from '@/components/ui/badge';
import HistoryModal from '@/components/kasir/HistoryModal';

// Definisikan tipe FakturItem yang diperbarui
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
    barang?: Array<{ nama: string; jumlah: number; harga: number; gambar: string }>; // Untuk TransaksiOfflineDialog (jika masih digunakan)
}

interface HistoryTransaksiProps {
    fakturHistoryList: FakturItem[];
    page: number;
    take: number;
}

export default function HistoryTransaksi({ fakturHistoryList, page, take }: HistoryTransaksiProps) {

    const renderBadge = (status: string) => {
        return (
            <span className={clsx(
                "inline-block mt-2 px-3 py-1 text-xs rounded",
                {
                    'bg-red-500 text-white': status === 'PEMBAYARAN_GAGAL',
                    'bg-green-600 text-white': status === 'SELESAI',
                    'bg-red-700 text-white': status === 'DIBATALKAN',
                    'bg-gray-400 text-white': !['PEMBAYARAN_GAGAL', 'SELESAI', 'DIBATALKAN'].includes(status),
                }
            )}>
                {status.replaceAll('_', ' ')}
            </span>
        );
    };

    // Fungsi helper untuk menentukan tipe transaksi
    const getTransactionType = (metodePembayaran: string) => {
        const lowerCaseMethod = metodePembayaran.toLowerCase();
        if (lowerCaseMethod === 'qris' || lowerCaseMethod === 'tunai') {
            return 'Transaksi Offline';
        }
        return 'Transaksi Online';
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-x-auto font-inter">
            <table className="w-full min-w-[800px] text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-700 font-semibold text-left">
                    <tr>
                        <th className="p-4 border-b border-gray-200">No</th>
                        <th className="p-4 border-b border-gray-200">ID Transaksi</th>
                        <th className="p-4 border-b border-gray-200">Nama Penerima</th>
                        <th className="p-4 border-b border-gray-200">Tanggal</th>
                        <th className="p-4 border-b border-gray-200">Tipe</th> {/* Kolom baru */}
                        <th className="p-4 border-b border-gray-200">Total</th>
                        <th className="p-4 border-b border-gray-200">Status</th>
                        <th className="p-4 border-b border-gray-200">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {fakturHistoryList.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="p-4 text-center text-gray-500">Tidak ada riwayat transaksi yang sesuai.</td> {/* Perbarui colSpan */}
                        </tr>
                    ) : (
                        fakturHistoryList.map((faktur, idx) => (
                            <tr key={faktur.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                <td className="p-4">{(page - 1) * take + idx + 1}</td>
                                <td className="p-4 font-medium">{faktur.id}</td>
                                <td className="p-4">{faktur.nama_penerima ?? 'N/A'}</td>
                                <td className="p-4">{new Date(faktur.tanggal_faktur).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                <td className="p-4">{getTransactionType(faktur.metode_pembayaran)}</td> {/* Tampilkan tipe transaksi */}
                                <td className="p-4">Rp {faktur.total?.toLocaleString('id-ID')}</td>
                                <td className="p-4">{renderBadge(faktur.status)}</td>
                                <td className="p-4">
                                    <HistoryModal faktur={faktur} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
