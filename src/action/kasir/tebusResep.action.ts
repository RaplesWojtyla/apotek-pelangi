'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getDbUserId } from '../user.action'

export type PengajuanResepItem = Awaited<ReturnType<typeof getPengajuanResepPaginated>>[number]

// Fungsi untuk mendapatkan data pengajuan resep yang dipaginasi
export async function getPengajuanResepPaginated(page: number, take: number = 8) {
    const skip = (page - 1) * take

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
    })
}

// Fungsi untuk mendapatkan total halaman pengajuan resep
export async function getPengajuanResepTotalPages(take: number = 10) {
    const total = await prisma.pengajuanResep.count({
        where: {
            // Filter status hanya DITERIMA atau DITOLAK
            status: {
                in: ['DITERIMA', 'DITOLAK'],
            },
        },
    })
    return Math.ceil(total / take)
}

// Fungsi updatePengajuanResepStatus (tidak ada perubahan dalam implementasi yang diberikan)
export async function updatePengajuanResepStatus(
    id: string,
    status: 'MENGAJUKAN' | 'DITERIMA' | 'DITOLAK'
) {
    const result = await prisma.pengajuanResep.update({
        where: { id },
        data: { status },
    })

    revalidatePath('/kasir/history_transaksi')
    return result
}

export async function getPendingPrescriptions(page: number = 1, take: number = 8) {
    const skip = (page - 1) * take
    
    try {
        const pendingRescriptions = await prisma.pengajuanResep.findMany({
            take,
            where: {
                status: 'MENGAJUKAN',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nama: true,
                    },
                },
            },
            orderBy: {
                tanggal_pengajuan: 'asc',
            },
        })
        return { success: true, data: pendingRescriptions }
    } catch (error) {
        console.error('[getPendingPrescriptions] Error:', error)
        return { success: false, message: 'Gagal mengambil data resep.', data: [] }
    }
}

interface PreparedItem {
    id_barang: string
    jumlah: number
}

export async function processPrescription(
    idResep: string,
    newStatus: 'DITERIMA' | 'DITOLAK',
    preparedItems: PreparedItem[] = [],
    note?: string
) {
    const kasirId = await getDbUserId()
    if (!kasirId) {
        return { success: false, message: 'Akses ditolak. Anda harus login sebagai kasir.' }
    }

    if (newStatus === 'DITERIMA' && preparedItems.length === 0) {
        return { success: false, message: 'Jika resep diterima, minimal harus ada satu obat yang disiapkan.' }
    }

    try {
        await prisma.$transaction(async (tx) => {
            const resep = await tx.pengajuanResep.findUnique({
                where: { id: idResep },
                select: { id_user: true },
            })

            if (!resep) {
                throw new Error('Pengajuan resep tidak ditemukan.')
            }

            await tx.pengajuanResep.update({
                where: { id: idResep },
                data: {
                    status: newStatus,
                    catatan_toko: note,
                },
            })

            if (newStatus === 'DITERIMA') {
                for (const item of preparedItems) {
                    await tx.cart.create({
                        data: {
                            id_user: resep.id_user,
                            id_barang: item.id_barang,
                            jumlah: item.jumlah,
                            id_resep: idResep,
                            sumber: 'RESEP',
                        },
                    })
                }
            }

            await tx.notifikasi.create({
                data: {
                    id_user: resep.id_user,
                    id_sumber: idResep,
                    tipe_sumber: 'PENGAJUAN_RESEP',
                    judul: `Resep Anda Telah Diproses`,
                    pesan: newStatus === 'DITERIMA'
                        ? 'Resep Anda telah disetujui. Obat telah ditambahkan ke keranjang Anda.'
                        : `Maaf, resep Anda ditolak. Alasan: ${note || 'Tidak ada catatan.'}`,
                }
            })

            return { success: true }
        })

        revalidatePath('/kasir/daftar_transaksi')
        revalidatePath('/customer/cart')
        revalidatePath('/customer/tebusresep/list')

        return {
            success: true,
            message: `Resep berhasil diubah statusnya menjadi ${newStatus}.`,
        }
    } catch (error: any) {
        console.error('[processPrescription] Error:', error)
        
        return { success: false, message: error.message || 'Gagal memproses resep.' }
    }
}
