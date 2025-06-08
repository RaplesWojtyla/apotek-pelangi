'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type Category = Awaited<ReturnType<typeof getCategories>>[number]

export const createCategory = async (nama_kategori: string, foto_kategori?: string) => {
    try {
        const newCategory = await prisma.kategoriBarang.create({
            data: {
                nama_kategori,
                foto_kategori: foto_kategori || "kategori.png",
            },
        })
        revalidatePath('/admin')

        return {
            success: true,
            status: 201,
            message: "Kategori berhasil ditambahkan",
            data: newCategory,
        }
    } catch (error) {
        console.error("Gagal menambahkan kategori:", error)
        throw new Error("Gagal menambahkan kategori.")
    }
}

export const getCategories = async (take: number) => {
    try {
        const categories = await prisma.kategoriBarang.findMany({
            take,
            include: {
                jenis_barang: true
            }
        })

        return categories
    } catch (error) {
        console.error(`[getCategory] error: ${error}`);

        throw new Error("Gagal mengambil kategori produk")
    }
}

export const countAllCategories = async () => {
    try {
        return await prisma.kategoriBarang.count()
    } catch (error) {
        console.error(`[countAllCategories] error: ${error}`)

        throw new Error('Gagal menghitung jumlah kategori')
    }
}

export const getCategoryById = async (id: string) => {
    try {
        const category = await prisma.kategoriBarang.findUnique({
            where: { id },
        })
        return category
    } catch (error) {
        console.error("Gagal mengambil data kategori:", error)
        throw new Error("Gagal mengambil data kategori.")
    }
}

export const updateCategory = async (
    id: string,
    nama_kategori?: string,
    foto_kategori?: string
) => {
    try {
        const updated = await prisma.kategoriBarang.update({
            where: { id },
            data: {
                nama_kategori,
                foto_kategori,
            },
        })
        revalidatePath('/admin')

        return {
            success: true,
            status: 200,
            message: "Kategori berhasil diperbarui",
            data: updated,
        }
    } catch (error) {
        console.error("Gagal memperbarui kategori:", error)
        throw new Error("Gagal memperbarui kategori.")
    }
}

export const deleteCategory = async (id: string) => {
    try {
        const deleted = await prisma.kategoriBarang.delete({
            where: { id },
        })
        revalidatePath('/admin')

        return {
            success: true,
            status: 200,
            message: "Kategori berhasil dihapus",
            data: deleted,
        }
    } catch (error) {
        console.error("Gagal menghapus kategori:", error)
        throw new Error("Gagal menghapus kategori.")
    }
}