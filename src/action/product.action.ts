import { prisma } from "@/lib/prisma"

export type ProductDetail = Awaited<ReturnType<typeof getProducts>>[number]

const ITEMS_PER_PAGE: number = 16

export const getProducts = async (page: number, search: string) => {
	const skip = (page - 1) * ITEMS_PER_PAGE

	try {
		const products = await prisma.barang.findMany({
			skip,
			take: ITEMS_PER_PAGE,
			where: {
				nama_barang: {
					contains: search,
					mode: "insensitive"
				}
			},
			include: {
				detail_barang: true,
				stok_barang: true,
				ulasan: true,
				jenis_barang: {
					include: {
						kategori_barang: {
							select: {
								nama_kategori: true,
								foto_kategori: true
							}
						}
					}
				}
			}
		})

		const enriched = products.map((product) => {
			const totalStok = product.stok_barang.reduce((sum, stok) => sum + stok.jumlah, 0)
			const totalRating = product.ulasan.reduce((sum, u) => sum + u.rating, 0)
			const rataRating = product.ulasan.length > 0 ? totalRating / product.ulasan.length : 0

			return {
				...product,
				totalStok,
				rataRating
			}
		})

		return enriched
	} catch (error) {
		console.error("[getProducts] error:", error)
		throw new Error("Gagal mengambil data produk.")
	}
}

export const getAllCategories = async () => {
	try {
		const categories = await prisma.kategoriBarang.findMany({
			select: {
				id: true,
				nama_kategori: true,
				foto_kategori: true
			}
		})
		return categories
	} catch (error) {
		console.error("[getAllCategories] error:", error)
		throw new Error("Gagal mengambil kategori.")
	}
}

export const getAllTypes = async (id_kategori: string) => {
	try {
		const types = await prisma.jenisBarang.findMany({
			where: {
				id_kategori_barang: id_kategori
			},
			select: {
				id: true,
				nama_jenis: true
			}
		})
		return types
	} catch (error) {
		console.error("[getAllTypes] error:", error)
		throw new Error("Gagal mengambil jenis barang.")
	}
}

export const getTotalStock = async (id_barang: string) => {
	try {
		const stok = await prisma.stokBarang.aggregate({
			where: { id_barang },
			_sum: { jumlah: true }
		})

		return stok._sum.jumlah ?? 0
	} catch (error) {
		console.error("[getTotalStokBarang] error:", error)
		throw new Error("Gagal menghitung stok barang.")
	}
}

export const getRating = async (id_barang: string) => {
	try {
		const ulasan = await prisma.ulasan.aggregate({
			where: { id_barang },
			_avg: { rating: true },
			_count: { id: true }
		})

		return {
			rataRating: ulasan._avg.rating ?? 0,
			totalUlasan: ulasan._count.id
		}
	} catch (error) {
		console.error("[getRatingUlasanBarang] error:", error)
		throw new Error("Gagal mengambil data ulasan barang.")
	}
}
