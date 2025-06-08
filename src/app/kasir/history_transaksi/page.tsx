'use client';

import { Badge } from '@/components/ui/badge';
import DetailTebusResepDialog from '@/components/DetailTebusDialog';
import TransaksiDetailDialog from '@/components/TransactionModal';
import TransaksiOfflineDialog from '@/components/TransactionOffline';

export default function SemuaTransaksi() {
    const renderBadge = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'selesai' || s === 'berhasil') return <Badge variant="default">Selesai</Badge>;
        if (s === 'menunggu') return <Badge variant="secondary">Menunggu</Badge>;
        if (s === 'ditolak' || s === 'dibatalkan') return <Badge variant="destructive">Dibatalkan</Badge>;
        return <Badge>Unknown</Badge>;
    };

    const transaksiResep = [
        {
            id: 'TX-001',
            nama: 'Tn. Budi',
            tanggal: '2025-05-07',
            status: 'selesai',
            catatan: 'Cepat eeee',
        },
    ];

    const transaksiOffline = [
        {
            id: 'TX-002',
            nama: 'Ny. Sari',
            tanggal: '2025-05-08',
            total: 0,
            status: 'dibatalkan',
        },
    ];

    const transaksiOnline = [
        {
            id: 'TX-003',
            nama: 'Sdr. Andi',
            tanggal: '2025-05-09',
            total: 245000,
            status: 'menunggu',
            catatan: 'Menunggu pembayaran',
        },
    ];


    const semuaTransaksi = [
        ...transaksiResep.map((item) => ({ ...item, tipe: 'Tebus Resep', total: 0 })),
        ...transaksiOffline.map((item) => ({ ...item, tipe: 'Transaksi Offline', catatan: '' })),
        ...transaksiOnline.map((item) => ({ ...item, tipe: 'Transaksi Online' })),
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-6 max-w-5xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Riwayat Transaksi</h1>

            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-semibold text-left">
                        <tr>
                            <th className="p-4">No</th>
                            <th className="p-4">ID Transaksi</th>
                            <th className="p-4">Nama</th>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Tipe</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semuaTransaksi.map((item, idx) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="p-4">{idx + 1}</td>
                                <td className="p-4 font-medium">{item.id}</td>
                                <td className="p-4">{item.nama}</td>
                                <td className="p-4">{item.tanggal}</td>
                                <td className="p-4">{item.tipe}</td>
                                <td className="p-4">Rp {item.total.toLocaleString()}</td>
                                <td className="p-4">{renderBadge(item.status)}</td>
                                <td className="p-4">
                                    {item.tipe === 'Tebus Resep' ? (
                                        <DetailTebusResepDialog />
                                    ) : item.tipe === 'Transaksi Offline' ? (
                                        <TransaksiOfflineDialog
                                            id={item.id}
                                            nama={item.nama}
                                            tanggal={item.tanggal}
                                            total={item.total}
                                            status={item.status}
                                            barang={[
                                                {
                                                    nama: 'Paracetamol',
                                                    jumlah: 2,
                                                    harga: 5000,
                                                    gambar: '/obat_a.jpg',
                                                },
                                                {
                                                    nama: 'Vitamin C',
                                                    jumlah: 1,
                                                    harga: 10000,
                                                    gambar: '/obat_b.jpg',
                                                },
                                            ]}
                                        />


                                    ) : (
                                        <TransaksiDetailDialog />
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
