'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type CategoryWithJenis = NonNullable<Awaited<ReturnType<typeof getCategoriesWithJenis>>['data']>[number]

export const getCategoriesWithJenis = async () => {
	try {
		const categories = await prisma.kategoriBarang.findMany({
			include: {
				jenis_barang: {
					orderBy: {
						nama_jenis: 'asc'
					}
				}
			},
			orderBy: {
				nama_kategori: 'asc'
			}
		})

		return {
			success: true,
			data: categories
		}
	} catch (error) {
		console.error("[getCategoriesWithJenis] Error: ", error)

		return {
			success: false,
			message: "Gagal mengambil data kategori.",
			data: []
		}
	}
}

export const createCategory = async (formData: FormData) => {
	const nama_kategori = formData.get('nama_kategori') as string
	const foto_kategori = formData.get('foto_kategori') as string || null

	if (!nama_kategori) {
		return {
			success: false,
			message: "Nama kategori tidak boleh kosong."
		}
	}

	try {
		await prisma.kategoriBarang.create({
			data: {
				nama_kategori,
				foto_kategori: foto_kategori || 'kategori.png'
			}
		})

		revalidatePath('/admin/jenisobat')

		return {
			success: true,
			message: `Kategori '${nama_kategori}' berhasil dibuat.`
		}
	} catch (error) {
		console.error("[createCategory] Error: ", error)

		return {
			success: false,
			message: "Gagal membuat kategori baru."
		}
	}
}

export const createJenisBarang = async (formData: FormData) => {
	const nama_jenis = formData.get('nama_jenis') as string
	const id_kategori_barang = formData.get('id_kategori_barang') as string

	if (!nama_jenis || !id_kategori_barang) {
		return { success: false, message: "Nama jenis dan kategori harus dipilih." }
	}

	try {
		await prisma.jenisBarang.create({
			data: {
				nama_jenis,
				id_kategori_barang,
			}
		})

		revalidatePath('/admin/jenisobat')

		return { success: true, message: `Jenis '${nama_jenis}' berhasil dibuat.` }
	} catch (error) {
		console.error("[createJenisBarang] Error: ", error)

		return { success: false, message: "Gagal membuat jenis barang baru." }
	}
}

export const updateCategory = async (id: string, formData: FormData) => {
	const nama_kategori = formData.get('nama_kategori') as string
	const foto_kategori = formData.get('foto_kategori') as string

	if (!nama_kategori) {
		return { success: false, message: "Nama kategori tidak boleh kosong." }
	}

	try {
		await prisma.kategoriBarang.update({
			where: { id },
			data: { nama_kategori, foto_kategori }
		})

		revalidatePath('/admin/jenisobat')

		return { success: true, message: "Kategori berhasil diperbarui." }
	} catch (error) {
		console.error("[updateCategory] Error: ", error)

		return { success: false, message: "Gagal memperbarui kategori." }
	}
}

export const updateJenisBarang = async (id: string, formData: FormData) => {
	const nama_jenis = formData.get('nama_jenis') as string

	if (!nama_jenis) {
		return { success: false, message: "Nama jenis tidak boleh kosong." }
	}

	try {
		await prisma.jenisBarang.update({
			where: { id },
			data: { nama_jenis }
		})
		revalidatePath('/admin/jenisobat')
		return { success: true, message: "Jenis barang berhasil diperbarui." }
	} catch (error) {
		console.error("[updateJenisBarang] Error: ", error)
		return { success: false, message: "Gagal memperbarui jenis barang." }
	}
}