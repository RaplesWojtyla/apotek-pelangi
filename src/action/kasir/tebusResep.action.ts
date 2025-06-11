'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
// getDbUserId tidak lagi diperlukan di sini karena kita tidak memfilter berdasarkan user ID
// import { getDbUserId } from '../user.action';

// Fungsi untuk mendapatkan data pengajuan resep yang dipaginasi
export async function getPengajuanResepPaginated(page: number, take: number = 8) {
    const skip = (page - 1) * take;

    return await prisma.pengajuanResep.findMany({
        where: {
            // Filter status hanya DITERIMA atau DITOLAK
            status: {
                in: ['DITERIMA', 'DITOLAK'],
            },
        },
        orderBy: {
            tanggal_pengajuan: 'desc', // Urutkan berdasarkan tanggal pengajuan terbaru
        },
        skip,
        take,
        include: {
            user: true, // Sertakan data user jika perlu ditampilkan di tabel
            // Menambahkan include untuk detail_faktur_penjualan
            // Ini akan mengambil detail barang yang terkait dengan id_resep di PengajuanResep ini
            detail_faktur_penjualan: {
                include: {
                    barang: true, // Sertakan detail barang juga
                },
                where: {
                    // Pastikan hanya mengambil detail_faktur_penjualan yang memiliki id_resep ini
                    // Prisma secara otomatis akan menangani relasi id_resep ke id PengajuanResep
                    id_resep: {
                        not: null // Hanya sertakan yang punya id_resep terisi
                    }
                }
            }
        },
    });
}

// Fungsi untuk mendapatkan total halaman pengajuan resep
export async function getPengajuanResepTotalPages(take: number = 8) {
    const total = await prisma.pengajuanResep.count({
        where: {
            // Filter status hanya DITERIMA atau DITOLAK
            status: {
                in: ['DITERIMA', 'DITOLAK'],
            },
        },
    });
    return Math.ceil(total / take);
}

// Fungsi updatePengajuanResepStatus (tidak ada perubahan dalam implementasi yang diberikan)
export async function updatePengajuanResepStatus(
    id: string,
    status: 'MENGAJUKAN' | 'DITERIMA' | 'DITOLAK' 
) {
    const result = await prisma.pengajuanResep.update({
        where: { id },
        data: { status },
    });

    revalidatePath('/kasir/history_transaksi');
    return result;
}
