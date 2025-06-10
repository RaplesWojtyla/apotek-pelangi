'use server'

import { prisma } from "@/lib/prisma"

export type Product = Awaited<ReturnType<typeof getProducts>>[number]
export type ProductDetail = Awaited<ReturnType<typeof getProductDetail>>
import { revalidatePath } from "next/cache"


export const getProducts = async ({ page = 1, matcher = '', take = 16, id_jenis_barang = '' }) => {
	const skip = (page - 1) * take

	try {
		const whereClause: any = {
			nama_barang: {
				contains: matcher,
				mode: 'insensitive'
			}
		}

		if (id_jenis_barang) {
			whereClause.id_jenis_barang = id_jenis_barang
		}

		const products = await prisma.barang.findMany({
			skip,
			take,
			where: whereClause,
			include: {
				jenis_barang: {
					include: {
						kategori_barang: true,
					},
				},
				stok_barang: {
					select: { jumlah: true }
				}
			}
		})

		const formattedProducts = products.map(product => {
			const totalStock = product.stok_barang.reduce((acc, item) => acc + item.jumlah, 0)

			return {
				...product,
				totalStock: totalStock
			}
		})

		return formattedProducts
	} catch (error) {
		console.error("[getProducts] error:", error)
		throw new Error("Gagal mengambil data produk.")
	}
}

export const getRecommendedProducts = async (idJenisBarang: string, currIdBarang: string) => {
	try {
		const products = await prisma.barang.findMany({
			where: {
				id_jenis_barang: idJenisBarang,
				id: {
					not: currIdBarang
				}
			},
			take: 4,
			include: {
				jenis_barang: {
					include: {
						kategori_barang: true
					}
				},
				stok_barang: {
					select: { jumlah: true }
				}
			}
		})

		const formattedProducts = products.map(product => {
			const totalStock = product.stok_barang.reduce((acc, stock) => acc + stock.jumlah, 0)

			return {
				...product,
				totalStock: totalStock
			}
		})

		return formattedProducts
	} catch (error) {
		console.error(`[getRecommendedProducts] Error: ${error}`);

		return []
	}
}

export const getProductDetail = async (id: string) => {
	try {
		const productDetail = await prisma.barang.findUnique({
			where: {
				id
			},
			include: {
				detail_barang: true,
				stok_barang: true,
				jenis_barang: {
					include: {
						kategori_barang: true
					}
				}
			}
		})

		if (!productDetail?.detail_barang || !productDetail.stok_barang) return null

		const totalStok = productDetail.stok_barang.reduce((sum, stok) => sum + stok.jumlah, 0)

		return {
			...productDetail,
			totalStock: totalStok
		}
	} catch (error) {
		console.error(`[getProducts] error: ${error}`);

		throw new Error("Gagal mengambil detail produk.")
	}
}

export const getCatalogTotalPages = async (matcher: string = '', take: number, id_jenis_barang: string = '') => {
	try {
		const whereClause: any = {
			nama_barang: {
				contains: matcher,
				mode: 'insensitive'
			}
		}

		if (id_jenis_barang) {
			whereClause.id_jenis_barang = id_jenis_barang
		}

		const productsCount = await prisma.barang.count({
			where: whereClause
		})

		const totalPages: number = Math.ceil(productsCount / take)

		return totalPages === 0 ? 1 : totalPages
	} catch (error) {
		console.error(`[getProductDetail] ERROR: ${error}`);

		throw new Error("Gagal memuat halaman katalog!")
	}
}
