'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import HistoryTransaksi from '@/components/kasir/HistoryTransaksi';
import Pagination from '@/components/Pagination';
import SkeletonHistory from '@/components/skeleton/SkeletonHistory';

import {
    getFakturHistoryPaginated,
    getFakturHistoryTotalPages,
} from '@/action/kasir/faktur.action';

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
    tipe_transaksi?: 'Tebus Resep' | 'Transaksi Offline' | 'Transaksi Online'; // Tipe ini sekarang akan dihitung di komponen
    detail_faktur_penjualan?: Array<{
        id: string;
        jumlah: number;
        barang?: {
            nama_barang: string;
            harga_jual: number;
            foto_barang?: string;
        };
    }>;
    barang?: Array<{ nama: string; jumlah: number; harga: number; gambar: string }>;
}

export default function HistoryTransaksiPage() {
    const searchParams = useSearchParams();

    const [fakturHistoryList, setFakturHistoryList] = useState<FakturItem[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const page = Number(searchParams.get('page') ?? 1);
    const take = 8;

    const fetchFakturHistory = async () => {
        try {
            setIsLoading(true);
            const [faktur, total] = await Promise.all([
                getFakturHistoryPaginated(page, take),
                getFakturHistoryTotalPages(take),
            ]);
            setFakturHistoryList(faktur as FakturItem[]);
            setTotalPages(total);
        } catch (error) {
            console.error('[HistoryTransaksiPage] Error:', error);
            toast.error('Gagal memuat data riwayat transaksi.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFakturHistory();
    }, [page]);

    return (
        <div className="bg-gray-100 min-h-screen p-6 max-w-5xl mx-auto space-y-8 font-inter">
            <h1 className="text-3xl font-bold text-gray-800">Riwayat Transaksi</h1>

            {isLoading ? (
                <SkeletonHistory />
            ) : (
                <>
                    <HistoryTransaksi fakturHistoryList={fakturHistoryList} page={page} take={take} />
                    <div className="flex justify-center mt-6">
                        <Pagination totalPages={totalPages} />
                    </div>
                </>
            )}
        </div>
    );
}
