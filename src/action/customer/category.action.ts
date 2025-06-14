'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type Category = Awaited<ReturnType<typeof getCategories>>[number]

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