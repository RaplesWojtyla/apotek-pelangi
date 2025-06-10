'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getDbUserId } from '../user.action'; // Pastikan path ini benar dan fungsi ini tersedia



// Fungsi yang sudah ada
export async function getFakturCustomerPaginated(page: number, take: number = 8) {
    const skip = (page - 1) * take;
    return await prisma.fakturPenjualan.findMany({
        where: {
            user: {
                role: 'CUSTOMER',
            },
        },
        orderBy: {
            tanggal_faktur: 'desc',
        },
        skip,
        take,
        include: {
            user: true,
            detail_faktur_penjualan: {
                include: {
                    barang: true,
                },
            },
        },
    });
}

// Fungsi yang sudah ada
export async function getFakturTotalPages(take: number = 8) {
    const total = await prisma.fakturPenjualan.count({
        where: {
            user: {
                role: 'CUSTOMER',
            },
        },
    });

    return Math.ceil(total / take);
}

// Fungsi yang sudah ada
export async function getFakturById(id: string) {
    return await prisma.fakturPenjualan.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            detail_faktur_penjualan: {
                include: {
                    barang: true,
                },
            },
        },
    });
}

// Fungsi yang diperbarui untuk mengambil faktur histori dengan filter status dan user ID
export async function getFakturHistoryPaginated(page: number, take: number = 8) {
    const dbUserId = await getDbUserId();
	if (!dbUserId) {
		return []
	}

    const skip = (page - 1) * take;

    return await prisma.fakturPenjualan.findMany({
        where: {
            AND: [
                {
                    status: {
                        in: ['SELESAI', 'PEMBAYARAN_GAGAL', 'DIBATALKAN'], // Filter status yang diinginkan
                    },
                },
                {
                    OR: [
                        { id_user: dbUserId }, // Transaksi yang dibuat oleh user ini
                        { id_kasir: dbUserId }, // Transaksi yang ditangani oleh kasir ini
                    ],
                },
            ],
        },
        orderBy: {
            tanggal_faktur: 'desc', // Urutkan berdasarkan tanggal terbaru
        },
        skip,
        take,
        include: {
            user: true,
            detail_faktur_penjualan: {
                include: {
                    barang: true,
                },
            },
        },
    });
}

// Fungsi yang diperbarui untuk mendapatkan total halaman histori
export async function getFakturHistoryTotalPages(take: number = 8) {
    const dbUserId = await getDbUserId();
	if (!dbUserId) {
		return 0
	}

    const total = await prisma.fakturPenjualan.count({
        where: {
            AND: [
                {
                    status: {
                        in: ['SELESAI', 'PEMBAYARAN_GAGAL', 'DIBATALKAN'],
                    },
                },
                {
                    OR: [
                        { id_user: dbUserId },
                        { id_kasir: dbUserId },
                    ],
                },
            ],
        },
    });
    return Math.ceil(total / take);
}

// Fungsi updateFakturStatus yang sudah ada, dengan revalidatePath tambahan
export async function updateFakturStatus(
    id: string,
    status:
        | 'SELESAI'
        | 'DIBATALKAN'
        | 'MENUNGGU_PEMBAYARAN'
        | 'PEMBAYARAN_BERHASIL'
        | 'PEMBAYARAN_GAGAL'
        | 'MENUNGGU_PENGAMBILAN'
        | 'JATUH_TEMPO'
) {
    const dbUserId = await getDbUserId(); // Pastikan id kasir yang update adalah user yang sedang login

    const result = await prisma.fakturPenjualan.update({
        where: { id },
        data: {
            id_kasir: dbUserId,
            status
        },
    });

    revalidatePath('/kasir/daftar_transaksi');
    revalidatePath('/admin/logpenjualan');
    revalidatePath('/kasir/history_transaksi');
    return result;
}

// Fungsi buatNotifikasi yang sudah ada
export async function buatNotifikasi({
    id_user,
    id_sumber,
    tipe_sumber,
    judul,
    pesan,
}: {
    id_user: string;
    id_sumber: string;
    tipe_sumber: 'FAKTUR_PENJUALAN';
    judul: string;
    pesan: string;
}) {
    return await prisma.notifikasi.create({
        data: {
            id_user,
            id_sumber,
            tipe_sumber,
            judul,
            pesan,
        },
    });
}
