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
					mode: 'insensitive'
				}
			},
			include: {
				detail_barang: true,
				stok_barang: true,
				jenis_barang: {
					include: {
						kategori_barang: {
							select: {
								nama_kategori: true,
								foto_kategori: true
							}
						}
					},
				},
			}
		})

		return products
	} catch (error) {
		console.error(`[getProducts] error: ${error}`);

		throw new Error("Gagal mengambil data produk.")
	}
}