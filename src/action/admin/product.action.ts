'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export type Product = Awaited<ReturnType<typeof getProducts>>[number]
export type ProductForEdit = NonNullable<Awaited<ReturnType<typeof getProductForEdit>>>

export const getAllJenisBarang = async () => {
	try {
		return await prisma.jenisBarang.findMany()
	} catch (error) {
		console.error(`[getAllJenisBarang] Error: ${error}`);

		return []
	}
}

export const createProduct = async (formData: FormData) => {
	const detailData = {
		deskripsi: formData.get('deskripsi') as string || undefined,
		indikasi_umum: formData.get('indikasi_umum') as string || undefined,
		komposisi: formData.get('komposisi') as string || undefined,
		dosis: formData.get('dosis') as string || undefined,
		aturan_pakai: formData.get('aturan_pakai') as string || undefined,
		perhatian: formData.get('perhatian') as string || undefined,
		kontra_indikasi: formData.get('kontra_indikasi') as string || undefined,
		efek_samping: formData.get('efek_samping') as string || undefined,
		golongan: formData.get('golongan') as string || undefined,
		kemasan: formData.get('kemasan') as string || undefined,
		manufaktur: formData.get('manufaktur') as string || undefined,
		no_bpom: formData.get('no_bpom') as string || undefined,
	};

	try {
		const newProduct = await prisma.barang.create({
			data: {
				nama_barang: formData.get("nama_barang") as string,
				harga_jual: Number(formData.get("harga_jual")),
				id_jenis_barang: formData.get("id_jenis_barang") as string,
				foto_barang: formData.get("foto_barang") as string || "Barang.png",
				detail_barang: {
					create: detailData
				}
			}
		})

		revalidatePath('/admin/daftarobat')
		return {
			success: true,
			message: "Produk berhasil ditambahkan!",
			data: {
				id: newProduct.id
			}
		}
	} catch (error) {
		console.error(`[admin]: [createProduct] Error : ${error}`)

		return {
			success: false,
			message: "Gagal menambahkan produk!"
		}
	}
}

export const getProducts = async (page=1, matcher="", take=10) => {
	const skip = (page - 1) * take
	try {
		const products = await prisma.barang.findMany({
			skip,
			take,
			where: {
				nama_barang: {
					contains: matcher,
					mode: 'insensitive'
				}
			},
			include: {
				jenis_barang: {
					include: {
						kategori_barang: true
					}
				},
				stok_barang: {
					select: {
						jumlah: true
					}
				},
				detail_barang: true
			}
		})

		const formattedProducts = products.map(product => {
			const totalStock = product.stok_barang.reduce((acc, s) => acc + s.jumlah, 0)

			return {
				...product,
				...product.detail_barang,
				totalStock: totalStock
			}
		})

		return formattedProducts
	} catch (error) {
		console.error(`[admin]: [getProducts] Error: ${error}`)

		throw new Error("Gagal mengambil data produk!")
	}
}

export const getProductForEdit = async (id: string) => {
	try {
		const product = await prisma.barang.findUnique({
			where: {
				id
			},
			include: {
				detail_barang: true,
				stok_barang: {
					orderBy: {
						tanggal_masuk: 'desc'
					}
				}
			}
		})

		if (!product) return null

		const totalStock = product.stok_barang.reduce((acc, s) => acc + s.jumlah, 0)

		return {
			...product,
			totalStock: totalStock
		}
	} catch (error) {
		console.error(`[getProductForEdit] Error: ${error}`)

		return null
	}
}

export const updateProduct = async (id: string, formData: FormData) => {
	try {
		await prisma.barang.update({
			where: {
				id
			},
			data: {
				nama_barang: formData.get("nama_barang") as string,
				harga_jual: Number(formData.get("harga_jual") as string),
				id_jenis_barang: formData.get("id_jenis_barang") as string,
				foto_barang: formData.get("foto_barang") as string || "Barang.png",
				detail_barang: {
					update: {
						deskripsi: formData.get('deskripsi') as string,
						indikasi_umum: formData.get('indikasi_umum') as string,
						komposisi: formData.get('komposisi') as string,
						dosis: formData.get('dosis') as string,
						aturan_pakai: formData.get('aturan_pakai') as string,
						perhatian: formData.get('perhatian') as string,
						kontra_indikasi: formData.get('kontra_indikasi') as string,
						efek_samping: formData.get('efek_samping') as string,
						golongan: formData.get('golongan') as string,
						kemasan: formData.get('kemasan') as string,
						manufaktur: formData.get('manufaktur') as string,
						no_bpom: formData.get('no_bpom') as string,
					}
				}
			}
		})

		revalidatePath(`/admin/daftarobat/edit/${id}`)
		revalidatePath('/admin/daftarobat')

		return {
			success: true,
			message: "Informasi produk berhasil diperbarui"
		}
	} catch (error) {
		console.error(`[admin]: [updateProduct] Error: ${error}`)

		return {
			success: false,
			message: "Gagal memperbarui produk."
		}
	}
}

export const deleteProduct = async (id: string) => {
	try {
		const product = await prisma.barang.findUnique({
			where: {
				id
			}
		})

		if (!product) {
			return {
				success: false,
				message: "Produk tidak ditemukan!"
			}
		}
		
		await prisma.barang.delete({
			where: {
				id
			}
		})

		revalidatePath('/admin/daftarobat')
		
		return {
			success: true,
			message: "Berhasil menghapus produk!"
		}
	} catch (error) {
		console.error(`[deleteProduct] Error: ${error}`)

		return {
			success: false,
			message: "Gagal menghapus produk!"
		}
	}
}

export const addStockBatch = async (formData: FormData) => {
	const id_barang = formData.get("id_barang") as string
	
	if (!id_barang || id_barang.length === 0) return {
		success: false,
		message: "ID Barang tidak ditemukan!"
	}

	try {
		await prisma.stokBarang.create({
			data: {
				id_barang: id_barang,
				jumlah: Number(formData.get('jumlah')),
				kode_batch: formData.get('kode_batch') as string || undefined,
				tanggal_kadaluarsa: new Date(formData.get('tanggal_kadaluarsa') as string),
			}
		});

		revalidatePath(`/admin/daftarobat/edit/${id_barang}`)
		return {
			success: true,
			message: "Batch baru berhasil ditambahkan!"
		}
	} catch (error) {
		console.error(`[addStockBatch] Error: ${error}`)

		return {
			success: false,
			message: "Gagal menambahkan batch."
		}
	}
}

export const getTotalProducts = async () => {
	try {
		const totalProducts = await prisma.barang.count()

		return totalProducts
	} catch (error) {
		console.error(`[Admin]: [getTotalProducts] Error: ${error}`)

		return 0;
	}
}

export const getProductsTotalPages = async (matcher="", take=10) => {
	try {
		const totalProducts = await prisma.barang.count({
			where: {
				nama_barang: {
					contains: matcher,
					mode: 'insensitive'
				}
			}
		})

		return Math.ceil(totalProducts / take)
	} catch (error) {
		console.error(`[admin]: [getProductsTotalPages] Error: ${error}`)

		throw new Error("Gagal menghitung total halaman produk")
	}
}
