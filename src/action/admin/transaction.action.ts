'use server'

import { prisma } from "@/lib/prisma"


export type FakturPenjualan = Awaited<ReturnType<typeof getFakturPenjualan>>['data'][number]

export const getFakturPenjualan = async ({ page = 1, take = 10, matcher = "" }) => {
    const skip = (page - 1) * take

    try {
        const faktur = await prisma.fakturPenjualan.findMany({
            skip,
            take,
            where: {
                id: {
                    contains: matcher,
                    mode: 'insensitive'
                }
            },
            include: {
                kasir: {
                    select: { nama: true }
                },
                detail_faktur_penjualan: {
                    include: {
                        barang: {
                            select: { nama_barang: true, harga_jual: true }
                        }
                    }
                }
            },
            orderBy: {
                tanggal_faktur: 'desc'
            }
        })

        return { success: true, data: faktur }
    } catch (error) {
        console.error("[getFakturPenjualan] Error:", error)

        return { success: false, data: [] }
    }
}

export const getPenjualanStats = async () => {
    try {
        const aggregations = await prisma.fakturPenjualan.aggregate({
            _count: {
                id: true,
            },
            _sum: {
                total: true,
            },
        })

        const selesaiCount = await prisma.fakturPenjualan.count({
            where: {
                status: 'SELESAI'
            }
        })

        return {
            success: true,
            data: {
                totalFaktur: aggregations._count.id,
                totalOmzet: aggregations._sum.total || 0,
                totalSelesai: selesaiCount
            }
        }
    } catch (error) {
        console.error("[getPenjualanStats] Error:", error)

        return { success: false, data: { totalFaktur: 0, totalOmzet: 0, totalSelesai: 0 } }
    }
}

export const getPenjualanTotalPages = async ({ take = 10 }) => {
    try {
        const total = await prisma.fakturPenjualan.count()

        return { success: true, data: Math.ceil(total / take) }
    } catch (error) {
        console.error("[getPenjualanTotalPages] Error:", error)

        return { success: false, data: 1 }
    }
}