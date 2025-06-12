'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

// Definisikan tipe untuk item PengajuanResepItem yang diterima sebagai prop
interface PengajuanResepItem {
    id: string;
    id_user: string;
    tanggal_pengajuan: Date;
    status: string; // Akan mencerminkan enum StatusResep Anda (MENGAJUKAN, DITERIMA, DITOLAK)
    catatan?: string | null;
    foto_resep: string;
    createdAt: Date;
    user?: {
        nama: string;
    };
    // Menambahkan detail_faktur_penjualan untuk menampilkan barang yang dikonfirmasi
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

export default function HistoryResepModal({ resep }: { resep: PengajuanResepItem }) {
    const [open, setOpen] = useState(false);

    let displayedStatusSteps: { label: string; value: string }[] = [];
    let finalStatusColorClass = 'bg-gray-300'; // Default color for fallback

    // Atur langkah-langkah status secara dinamis berdasarkan status resep
    if (resep.status === 'DITOLAK') {
        displayedStatusSteps = [
            { label: 'Resep Diajukan', value: 'MENGAJUKAN' },
            { label: 'Resep Ditolak', value: 'DITOLAK' },
        ];
        finalStatusColorClass = 'bg-red-600'; // Warna merah untuk ditolak
    } else if (resep.status === 'DITERIMA') {
        displayedStatusSteps = [
            { label: 'Resep Diajukan', value: 'MENGAJUKAN' },
            { label: 'Resep Dikonfirmasi', value: 'DITERIMA' },
        ];
        finalStatusColorClass = 'bg-green-500'; // Warna hijau untuk diterima
    } else {
        // Fallback jika ada status lain yang tidak terduga atau perlu timeline default
        displayedStatusSteps = [
            { label: 'Resep Diajukan', value: 'MENGAJUKAN' },
        ];
    }

    const currentStatusIndex = displayedStatusSteps.findIndex(step => step.value === resep.status);

    // Fungsi untuk mendapatkan label status yang ditampilkan (tidak ada perubahan)
    const getDisplayStatusLabel = (status: string) => {
        switch (status) {
            case 'MENGAJUKAN': return 'Menunggu Konfirmasi';
            case 'DITERIMA': return 'Diterima';
            case 'DITOLAK': return 'Ditolak';
            case 'DRAFT': return 'Draft';
            default: return status.replaceAll('_', ' ');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Lihat Detail
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto font-inter">
                <DialogHeader>
                    <DialogTitle>Detail Pengajuan Resep</DialogTitle>
                </DialogHeader>

                <div className="mb-6 flex justify-center">
                    <Image
                        src={resep.foto_resep || '/placeholder-resep.jpg'}
                        alt="Foto Resep"
                        width={300}
                        height={200}
                        className="max-h-52 object-contain rounded-md shadow-md"
                        onError={(e) => { e.currentTarget.src = '/placeholder-resep.jpg'; }}
                    />
                </div>

                {/* Bagian detail barang hanya ditampilkan jika status DITERIMA */}
                {resep.status === 'DITERIMA' && Array.isArray(resep.detail_faktur_penjualan) && resep.detail_faktur_penjualan.length > 0 && (
                    <div className="mt-4 text-sm text-gray-700">
                        <h4 className="font-semibold mb-2 text-gray-800">Barang Diterima</h4>
                        {/* Mengikuti styling ScrollArea dan item dari HistoryModal */}
                        <ScrollArea className="h-40 border rounded-md p-2 mb-4">
                            {resep.detail_faktur_penjualan.map((dtx: any) => (
                                <div key={dtx.id} className="flex gap-4 mt-2 items-center">
                                    <Image
                                        src={`/${dtx.barang?.foto_barang ?? 'noimage.jpg'}`}
                                        alt={dtx.barang?.nama_barang ?? 'Barang'}
                                        width={100} // Mengikuti lebar HistoryModal
                                        height={100} // Mengikuti tinggi HistoryModal
                                        className="object-contain rounded-md"
                                        onError={(e) => { e.currentTarget.src = '/noimage.jpg'; }}
                                    />
                                    <div>
                                        <p className="font-semibold">{dtx.barang?.nama_barang}</p>
                                        <p className="text-sm text-gray-600"> {/* Mengikuti ukuran font */}
                                            Rp {dtx.barang?.harga_jual?.toLocaleString('id-ID') ?? 0} x {dtx.jumlah}
                                        </p>
                                        <p className="font-bold mt-1 text-gray-800">
                                            Rp {dtx.barang?.harga_jual ? (dtx.barang.harga_jual * dtx.jumlah).toLocaleString('id-ID') : 0}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {/* Pesan jika tidak ada detail barang */}
                            {(!Array.isArray(resep.detail_faktur_penjualan) || resep.detail_faktur_penjualan.length === 0) && (
                                <p className="text-center text-gray-500 pt-4">Tidak ada detail barang untuk resep ini.</p>
                            )}
                        </ScrollArea>
                    </div>
                )}

                <div className="mt-4 text-sm text-gray-700">
                    <h4 className="font-semibold mb-1 text-gray-800">Informasi Pengajuan</h4>
                    <p>ID Pengajuan : <span className="font-medium">{resep.id}</span></p>
                    <p>Nama User : <span className="font-medium">{resep.user?.nama ?? resep.id_user}</span></p>
                    <p>Tanggal Pengajuan : <span className="font-medium">{new Date(resep.tanggal_pengajuan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></p>
                    <p>Status : <span className="font-medium">{getDisplayStatusLabel(resep.status)}</span></p>
                    <p>Catatan : <span className="font-medium">{resep.catatan ?? '-'}</span></p>
                </div>

                <h4 className="font-semibold mt-4 mb-2 text-gray-800">Status Proses</h4>
                <div className="flex flex-col relative ml-4">
                    {displayedStatusSteps.map((step, idx) => {
                        const isActive = idx <= currentStatusIndex;
                        const isCurrentStep = idx === currentStatusIndex;

                        let dotColorClass = isActive ? 'bg-green-500' : 'bg-gray-300';
                        let lineColorClass = isActive ? 'bg-green-500' : 'bg-gray-300'; // Default tetap hijau jika aktif
                        let textColorClass = isActive ? 'text-black font-semibold' : 'text-gray-400';

                        // Perlakuan khusus untuk status DITOLAK
                        if (resep.status === 'DITOLAK' && isCurrentStep) {
                            dotColorClass = finalStatusColorClass; // Titik DITOLAK berwarna merah
                            textColorClass = 'text-red-600 font-semibold';
                        }
                        // Garis akan tetap hijau jika aktif, tidak peduli status akhir DITOLAK
                        // Hanya titik terakhir yang berubah warna jika statusnya DITOLAK

                        return (
                            <div className="flex items-start gap-3 relative" key={step.value}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-4 h-4 rounded-full ${dotColorClass}`} />
                                    {idx < displayedStatusSteps.length - 1 && (
                                        <div className={`w-[2px] h-8 ${lineColorClass}`} />
                                    )}
                                </div>
                                <span className={`text-sm ${textColorClass}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
