'use server'

import { prisma } from "@/lib/prisma"

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