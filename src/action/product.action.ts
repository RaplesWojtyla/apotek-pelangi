'use server'

import { prisma } from "@/lib/prisma"

export type Product = Awaited<ReturnType<typeof getProducts>>[number]
export type ProductDetail = Awaited<ReturnType<typeof getProductDetail>>
import { revalidatePath } from "next/cache"

export const createProduct = async (
	nama_barang: string,
	harga_jual: number,
	id_jenis_barang: string,
	foto_barang: string,
	detail: {
		deskripsi?: string,
		indikasi_umum?: string,
		komposisi?: string,
		dosis?: string,
		aturan_pakai?: string,
		perhatian?: string,
		kontra_indikasi?: string,
		efek_samping?: string,
		golongan?: string,
		kemasan?: string,
		manufaktur?: string,
		no_bpom?: string,
	}
) => {
	try {
		const barang = await prisma.barang.create({
			data: {
				nama_barang,
				harga_jual,
				foto_barang: foto_barang && foto_barang.trim() !== "" ? foto_barang : "Barang.png",
				id_jenis_barang,
				detail_barang: {
					create: {
						...detail
					}
				}
			}
		});
		revalidatePath('/')

		return {
			success: true,
			status: 201,
			message: "Barang berhasil ditambahkan",
			data: barang,
		}
	} catch (error) {
		console.error("[createProduct] error:", error);
		throw new Error("Gagal menambahkan produk");
	}
};


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

export const getCatalogTotalPages = async (matcher: string, take: number) => {
	try {
		const products = await prisma.barang.findMany({
			where: {
				nama_barang: {
					contains: matcher,
					mode: 'insensitive'
				}
			}
		})

		const totalPages: number = Math.ceil(products.length / take)

		return totalPages === 0 ? 1 : totalPages
	} catch (error) {
		console.error(`[getProductDetail] ERROR: ${error}`);

		throw new Error("Gagal memuat halaman katalog!")
	}
}

export const updateProduct = async (
	id: string,
	data: {
		nama_barang?: string;
		harga_jual?: number;
		foto_barang?: string;
		id_jenis_barang?: string;
	}
) => {
	try {
		const updatedBarang = await prisma.barang.update({
			where: { id },
			data,
		});
		revalidatePath('/')

		return {
			success: true,
			status: 201,
			message: "Barang berhasil diperbarui",
			data: updatedBarang,
		}
	} catch (error) {
		console.error("[updateProduct]", error);
		throw new Error("Gagal memperbarui data barang");
	}
};

export const updateDetailProduct = async (
	id_barang: string,
	detailData: {
		deskripsi?: string;
		indikasi_umum?: string;
		komposisi?: string;
		dosis?: string;
		aturan_pakai?: string;
		perhatian?: string;
		kontra_indikasi?: string;
		efek_samping?: string;
		golongan?: string;
		kemasan?: string;
		manufaktur?: string;
		no_bpom?: string;
	}
) => {
	try {
		const updatedDetailProduct = await prisma.detailBarang.update({
			where: { id_barang },
			data: detailData,
		});
		revalidatePath('/')

		return {
			success: true,
			status: 201,
			message: "Detail Barang berhasil diperbarui",
			data: updatedDetailProduct,
		}
	} catch (error) {
		console.error("[updateDetailProduct]", error);
		throw new Error("Gagal memperbarui detail barang");
	}
};

export const deleteProduct = async (id: string) => {
	try {
		await prisma.detailBarang.delete({
			where: {
				id_barang: id
			}
		});

		await prisma.barang.delete({
			where: {
				id
			}
		});
		revalidatePath('/')

		return {
			success: true,
			status: 201,
			message: "Barang berhasil dihapus",
		}
	} catch (error) {
		console.error("[deleteProduct] error:", error);
		throw new Error("Gagal menghapus produk");
	}
};

