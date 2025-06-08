'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "../user.action"
import { SumberCart } from "@prisma/client"
import { revalidatePath } from "next/cache"

export type CartItem = Awaited<ReturnType<typeof getCart>>[number]
export type SimpleCartItem = Awaited<ReturnType<typeof getCartBySource>>['data'][number]

export const getCart = async () => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) return []

	try {
		const cart = await prisma.cart.findMany({
			where: { id_user: dbUserId },
			include: {
				barang: {
					include: {
						stok_barang: {
							select: { jumlah: true }
						},
						jenis_barang: {
							include: {
								kategori_barang: {
									select: { nama_kategori: true }
								}
							}
						}
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		const formattedCart = cart.map(obj => {
			const totalStock = obj.barang.stok_barang.reduce((acc, item) => acc + item.jumlah, 0)

			return {
				...obj,
				totalStock: totalStock
			}
		})

		return formattedCart
	} catch (error) {
		throw new Error("Gagal memuat keranjang anda")
	}
}

export const getCartBySource = async ( source: SumberCart ) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) return {
		success: false,
		message: "Pengguna tidak terauntentikasi!",
		data: []
	}

	try {
		const cartItems = await prisma.cart.findMany({
			where: {
				id_user: dbUserId,
				sumber: source
			},
			include: {
				barang: {
					select: {
						nama_barang: true
					}
				}
			}
		})

		return {
			success: true,
			message: "Berhasil mengambil data keranjang!",
			data: cartItems
		}
	} catch (error) {
		console.error(`[getCartBySource] Error: ${error}`)

		return {
			success: false,
			message: "Terjadi kesalahan pada server. Harap coba lagi!",
			data: []
		}
	}
}

export const addToCart = async (idBarang: string, amount: number, sumber: SumberCart) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi!")

	try {
		const product = await prisma.barang.findUnique({
			where: { id: idBarang },
			include: { stok_barang: true }
		})

		if (!product) throw new Error("Produk tidak ditemukan")

		const totalStock = product.stok_barang.reduce((acc, item) => acc + item.jumlah, 0)
		if (totalStock < 1) throw new Error(`Stok telah habis :(`)

		const existingCartItem = await prisma.cart.findUnique({
			where: {
				id_user_id_barang: {
					id_user: dbUserId,
					id_barang: idBarang
				}
			}
		})

		const currAmountInCart: number = existingCartItem?.jumlah || 0

		if (currAmountInCart + amount > totalStock) throw new Error(`Stok tidak mencukupi. Sisa stok: ${totalStock}. Dikeranjang: ${currAmountInCart}`)

		const cart = await prisma.cart.upsert({
			where: {
				id_user_id_barang: {
					id_user: dbUserId,
					id_barang: idBarang
				}
			},
			update: {
				jumlah: { increment: amount }
			},
			create: {
				id_user: dbUserId,
				id_barang: idBarang,
				jumlah: amount,
				sumber: sumber
			}
		})

		revalidatePath('/customer/cart')
		revalidatePath('/api/customer/cart')

		return cart
	} catch (error: any) {
		console.error(`[addToCart] ERROR: ${error}`);
		throw new Error(error.message || "Gagal menambahkan data ke keranjang")
	}
}

export const updateCartItemQty = async (cartItemId: string, newQuantity: number) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi!")

	try {
		const existingCartItem = await prisma.cart.findUnique({
			where: {
				id: cartItemId,
				id_user: dbUserId
			},
			include: {
				barang: {
					include: {
						stok_barang: true
					}
				}
			}
		})

		if (!existingCartItem) throw new Error("Item keranjang tidak ditemukan!")

		const totalStock = existingCartItem.barang.stok_barang.reduce((acc, item) => acc + item.jumlah, 0)

		if (newQuantity > totalStock) return new Error(`Stok tidak mencukupi. Sisa stok: ${totalStock}`)

		if (newQuantity < 1) deleteCartItem(cartItemId)

		const updatedItem = await prisma.cart.update({
			where: {
				id: cartItemId,
				id_user: dbUserId
			},
			data: {
				jumlah: newQuantity
			}
		})

		revalidatePath('/customer/cart')
		revalidatePath('/api/customer/cart')

		return updatedItem
	} catch (error: any) {
		console.error(`[updateCartItemQty] ERROR: ${error}`);

		throw new Error(error.message || "Gagal mengubah kuantitas item")
	}
}

export const deleteCartItem = async (cartItemId: string) => {
	const dbUserId = await getDbUserId()
	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi!")

	try {
		const product = await prisma.cart.findUnique({
			where: {
				id: cartItemId,
				id_user: dbUserId
			}
		})

		if (!product) throw new Error("Item tidak ditemukan di dalam keranjang anda.")

		const deletedItem = await prisma.cart.delete({
			where: {
				id: cartItemId,
				id_user: dbUserId
			}
		})

		revalidatePath('/customer/cart')
		revalidatePath('/api/customer/cart')

		return deletedItem
	} catch (error: any) {
		console.error(`[removeCartItem] ERROR: ${error}`);

		throw new Error(error.message || "Gagal menghapus item dari keranjang anda.")
	}
}

export const deleteSelectedCartItems = async (cartItemsIds: string[]) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) throw new Error("Pengguna tidak terautentikasi!")

	if (!cartItemsIds || cartItemsIds.length === 0) throw new Error("Tidak ada item yang dipilih untuk dihapus.")

	try {
		const deleted = await prisma.cart.deleteMany({
			where: {
				id: {
					in: cartItemsIds
				},
				id_user: dbUserId
			}
		})

		revalidatePath('/customer/cart')
		revalidatePath('/api/customer/cart')

		return deleted.count
	} catch (error) {
		console.error(`[removeSelectedCartItems] ERROR: ${error}`);

		throw new Error("Gagal menghapus item yang dipilih dari keranjag")
	}
}
