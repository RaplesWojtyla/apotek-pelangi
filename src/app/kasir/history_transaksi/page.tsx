'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import SkeletonHistory from '@/components/skeleton/SkeletonHistory';

// Komponen untuk menampilkan riwayat transaksi selesai
import HistoryTransaksi from '@/components/kasir/HistoryTransaksi';
// Komponen baru untuk menampilkan riwayat pengajuan resep
import HistoryResep from '@/components/kasir/HistoryResep';

import {
    getFakturHistoryPaginated,
    getFakturHistoryTotalPages,
} from '@/action/kasir/faktur.action';

import {
    getPengajuanResepPaginated,
    getPengajuanResepTotalPages,
    PengajuanResepItem,
} from '@/action/kasir/tebusResep.action'; // Import aksi pengajuan resep

// Definisikan tipe untuk data faktur
interface FakturItem {
    id: string;
    nama_penerima?: string;
    tanggal_faktur: Date;
    status: string;
    total: number;
    id_user: string;
    id_kasir?: string | null;
    metode_pembayaran: string;
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

export default function CombinedHistoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [kategori, setKategori] = useState<'resep-pengajuan' | 'transaksi-selesai'>('transaksi-selesai');

    // States untuk History Transaksi Selesai
    const [fakturHistoryList, setFakturHistoryList] = useState<FakturItem[]>([]);
    const [fakturTotalPages, setFakturTotalPages] = useState<number>(1); // Ubah nama state
    const [isLoadingFaktur, setIsLoadingFaktur] = useState<boolean>(true); // Ubah nama state

    // States untuk History Pengajuan Resep
    const [pengajuanResepList, setPengajuanResepList] = useState<PengajuanResepItem[]>([]);
    const [pengajuanResepTotalPages, setPengajuanResepTotalPages] = useState<number>(1); // State baru
    const [isLoadingResep, setIsLoadingResep] = useState<boolean>(true); // State baru


    const page = Number(searchParams.get('page') ?? 1);
    const take = 8;

    // Fungsi untuk mengambil data riwayat transaksi selesai
    const fetchFakturHistoryData = async () => {
        try {
            setIsLoadingFaktur(true);
            const [faktur, total] = await Promise.all([
                getFakturHistoryPaginated(page, take),
                getFakturHistoryTotalPages(take),
            ]);
            setFakturHistoryList(faktur as FakturItem[]);
            setFakturTotalPages(total);
        } catch (error) {
            console.error('[CombinedHistoryPage] Error fetching faktur history:', error);
            toast.error('Gagal memuat data riwayat transaksi.');
        } finally {
            setIsLoadingFaktur(false);
        }
    };

    // Fungsi untuk mengambil data riwayat pengajuan resep
    const fetchPengajuanResepData = async () => {
        try {
            setIsLoadingResep(true);
            const [resep, total] = await Promise.all([
                getPengajuanResepPaginated(page, take),
                getPengajuanResepTotalPages(take),
            ]);
            setPengajuanResepList(resep as PengajuanResepItem[]);
            setPengajuanResepTotalPages(total);
        } catch (error) {
            console.error('[CombinedHistoryPage] Error fetching resep history:', error);
            toast.error('Gagal memuat data riwayat pengajuan resep.');
        } finally {
            setIsLoadingResep(false);
        }
    };

    useEffect(() => {
        if (kategori === 'transaksi-selesai') {
            fetchFakturHistoryData();
        } else if (kategori === 'resep-pengajuan') {
            fetchPengajuanResepData();
        }
    }, [kategori, page]); // Dependensi kategori dan page

    return (
        <div className="bg-gray-100 min-h-screen p-6 max-w-5xl mx-auto space-y-8 font-inter">
            <h1 className="text-3xl font-bold text-gray-800">Riwayat Transaksi & Resep</h1>

            <div className="flex gap-4">
                {/* Tombol untuk History Transaksi Selesai */}
                <Button
                    variant={kategori === 'transaksi-selesai' ? 'default' : 'outline'}
                    onClick={() => {
                        setKategori('transaksi-selesai');
                        if (page !== 1) router.push(`?page=1`); // Reset halaman ke 1 saat mengganti kategori
                    }}
                >
                    History Transaksi
                </Button>
                {/* Tombol untuk History Pengajuan Resep */}
                <Button
                    variant={kategori === 'resep-pengajuan' ? 'default' : 'outline'}
                    onClick={() => {
                        setKategori('resep-pengajuan');
                        if (page !== 1) router.push(`?page=1`); // Reset halaman ke 1 saat mengganti kategori
                    }}
                >
                    History Pengajuan Resep
                </Button>
                
            </div>

            {/* Konten yang ditampilkan berdasarkan kategori */}
            {kategori === 'resep-pengajuan' && (
                <>
                    {isLoadingResep ? (
                        <SkeletonHistory />
                    ) : (
                        <>
                            {/* Render komponen HistoryResep */}
                            <HistoryResep
                                pengajuanResepList={pengajuanResepList}
                                page={page}
                                take={take}
                            />
                            <div className="flex justify-center mt-6">
                                <Pagination totalPages={pengajuanResepTotalPages} />
                            </div>
                        </>
                    )}
                </>
            )}

            {kategori === 'transaksi-selesai' && (
                <>
                    {isLoadingFaktur ? (
                        <SkeletonHistory />
                    ) : (
                        <>
                            {/* Render komponen HistoryTransaksi */}
                            <HistoryTransaksi
                                fakturHistoryList={fakturHistoryList}
                                page={page}
                                take={take}
                            />
                            <div className="flex justify-center mt-6">
                                <Pagination totalPages={fakturTotalPages} />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
