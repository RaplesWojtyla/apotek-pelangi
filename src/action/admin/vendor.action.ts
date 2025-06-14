'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function createVendor(formData: FormData) {
    const nama_vendor = formData.get('nama_vendor') as string
    const alamat = formData.get('alamat') as string
    const no_hp = formData.get('no_hp') as string
    const email = formData.get('email') as string

    if (!nama_vendor) {
        return { success: false, message: 'Nama vendor wajib diisi.' }
    }

    try {
        
        const existingVendor = await prisma.vendor.findFirst({
            where: { nama_vendor: { equals: nama_vendor, mode: 'insensitive' } }
        })

        if (existingVendor) {
            return { success: false, message: `Vendor dengan nama '${nama_vendor}' sudah ada.` }
        }

        await prisma.vendor.create({
            data: {
                nama_vendor,
                alamat,
                no_hp,
                email,
            }
        })

        revalidatePath('/admin/vendor')
        return { success: true, message: 'Vendor berhasil ditambahkan.' }
    } catch (error) {
        console.error('[CREATE_VENDOR_ERROR]', error)
        return { success: false, message: 'Terjadi kesalahan saat menambahkan vendor.' }
    }
}

export async function getVendors({ page = 1, take = 10, query = "" }) {
    const skip = (page - 1) * take
    try {
        const vendors = await prisma.vendor.findMany({
            skip,
            take,
            where: {
                nama_vendor: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return { success: true, data: vendors }
    } catch (error) {
        console.error('[GET_VENDORS_ERROR]', error)
        return { success: false, data: [], message: 'Gagal mengambil data vendor.' }
    }
}


export async function getVendorStats(query = "") {
     try {
        const totalVendors = await prisma.vendor.count({
             where: {
                nama_vendor: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
        })
        return { success: true, total: totalVendors }
    } catch (error) {
        console.error('[GET_VENDOR_STATS_ERROR]', error)
        return { success: false, total: 0, message: 'Gagal menghitung statistik vendor.' }
    }
}

export async function updateVendor(id: string, formData: FormData) {
    const nama_vendor = formData.get('nama_vendor') as string
    const alamat = formData.get('alamat') as string
    const no_hp = formData.get('no_hp') as string
    const email = formData.get('email') as string

    if (!nama_vendor) {
        return { success: false, message: 'Nama vendor wajib diisi.' }
    }

    try {
        await prisma.vendor.update({
            where: { id },
            data: {
                nama_vendor,
                alamat,
                no_hp,
                email,
            }
        })

        revalidatePath('/admin/vendor')
        return { success: true, message: 'Vendor berhasil diperbarui.' }
    } catch (error) {
        console.error('[UPDATE_VENDOR_ERROR]', error)
        return { success: false, message: 'Terjadi kesalahan saat memperbarui vendor.' }
    }
}

export async function deleteVendor(id: string) {
    try {
        const existingFaktur = await prisma.fakturPembelian.findFirst({
            where: { id_vendor: id }
        })

        if (existingFaktur) {
            return { success: false, message: 'Gagal menghapus. Vendor ini sudah memiliki riwayat transaksi pembelian.' }
        }

        await prisma.vendor.delete({
            where: { id }
        })

        revalidatePath('/admin/vendor')

        return { success: true, message: 'Vendor berhasil dihapus.' }
    } catch (error) {
        console.error('[DELETE_VENDOR_ERROR]', error)
        return { success: false, message: 'Terjadi kesalahan saat menghapus vendor.' }
    }
}