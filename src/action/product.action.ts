'use server'

import { prisma } from "@/lib/prisma"

export type Product = Awaited<ReturnType<typeof getProducts>>[number]
export type ProductDetail = Awaited<ReturnType<typeof getProductDetail>>

export const getProducts = async ({ page = 1, matcher = '', take = 16 }) => {
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
						kategori_barang: true,
					},
				},
			}
		})

		return products
	} catch (error) {
		console.error("[getProducts] error:", error)
		throw new Error("Gagal mengambil data produk.")
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
