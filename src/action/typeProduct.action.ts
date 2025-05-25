'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const createType = async (
    id_kategori_barang: string,
    nama_jenis: string
) => {
    try {
        const newType = await prisma.jenisBarang.create({
            data: {
                id_kategori_barang,
                nama_jenis,
            }
        })

        revalidatePath('/admin')
        return {
            success: true,
            message: 'Berhasil menambahkan jenis barang.',
            data: newType
        }
    } catch (error) {
        console.error('Gagal menambah jenis barang:', error)
        throw new Error('Gagal menambah jenis barang')
    }
}



export const getAllTypes = async () => {
    try {
        const types = await prisma.jenisBarang.findMany({
            include: {
                kategori_barang: {
                    select: {
                        id: true,
                        nama_kategori: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return types
    } catch (error) {
        console.error('Gagal mengambil jenis barang:', error)
        throw new Error('Gagal mengambil data jenis barang')
    }
}

export const getTypes = async (id_kategori_barang?: string) => {
    return prisma.jenisBarang.findMany({
        where: id_kategori_barang ? { id_kategori_barang } : {},
        include: {
            kategori_barang: {
                select: {
                    id: true,
                    nama_kategori: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const updateType = async (
    id: string,
    nama_jenis: string,
    id_kategori_barang: string
) => {
    try {
        const updatedType = await prisma.jenisBarang.update({
            where: { id },
            data: {
                nama_jenis,
                id_kategori_barang
            }
        })

        revalidatePath('/')
        return {
            success: true,
            message: 'Berhasil mengupdate jenis barang.',
            data: updatedType
        }
    } catch (error) {
        console.error('Gagal update jenis barang:', error)
        throw new Error('Gagal mengupdate jenis barang')
    }
}

export const deleteType = async (id: string) => {
    try {
        await prisma.jenisBarang.delete({
            where: { id }
        })

        revalidatePath('/')
        return {
            success: true,
            message: 'Berhasil menghapus jenis barang.'
        }
    } catch (error) {
        console.error('Gagal hapus jenis barang:', error)
        throw new Error('Gagal menghapus jenis barang')
    }
}
