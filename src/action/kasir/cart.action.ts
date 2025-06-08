// File: action/kasir/cart.action.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Tipe satu item full‐data Cart termasuk relasi ke Barang.
// Kita sertakan field barang agar mudah di‐render di UI.
export type CartItemWithBarang = Prisma.CartGetPayload<{
  include: { barang: { select: { id: true; nama_barang: true; harga_jual: true; foto_barang: true } } }
}>

/**
 * Fetch semua item keranjang untuk user tertentu.
 * Meng-include data `barang` (id, nama_barang, harga_jual, foto_barang).
 */
export const getCartItems = async (id_user: string): Promise<CartItemWithBarang[]> => {
  try {
    const items = await prisma.cart.findMany({
      where: { id_user },
      include: {
        barang: {
          select: {
            id: true,
            nama_barang: true,
            harga_jual: true,
            foto_barang: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })
    return items
  } catch (error) {
    console.error('[getCartItems] error:', error)
    throw new Error('Gagal mengambil data keranjang')
  }
}

/**
 * Tambah 1 buah barang ke keranjang:
 * - Jika sudah ada record Cart(id_user + id_barang), otomatis tambah `jumlah` +1
 * - Jika belum ada, buat record baru dengan jumlah = 1 dan sumber = “MANUAL”
 */
export const addCartItem = async (id_user: string, id_barang: string) => {
  try {
    // Cek apakah sudah ada item serupa
    const existing = await prisma.cart.findUnique({
      where: {
        id_user_id_barang: {
          id_user,
          id_barang,
        },
      },
    })

    if (existing) {
      // Update jumlah +1
      await prisma.cart.update({
        where: { id: existing.id },
        data: { jumlah: existing.jumlah + 1 },
      })
    } else {
      // Buat record baru (sumber: MANUAL)
      await prisma.cart.create({
        data: {
          id_user,
          id_barang,
          jumlah: 1,
          sumber: 'MANUAL', // enum SumberCart: “RESEP” atau “MANUAL”
        },
      })
    }

    // Revalidate path '/kasir' agar UI Kasir otomatis refresh
    revalidatePath('/kasir')

    return { success: true }
  } catch (error) {
    console.error('[addCartItem] error:', error)
    throw new Error('Gagal menambahkan item ke keranjang')
  }
}

/**
 * Update jumlah (jumlah baru) untuk satu item Cart (berdasarkan id Cart).
 * Jika newJumlah <= 0, record akan dihapus.
 */
export const updateCartItem = async (cartId: string, newJumlah: number) => {
  try {
    if (newJumlah <= 0) {
      // Hapus item
      await prisma.cart.delete({ where: { id: cartId } })
    } else {
      // Update jumlah
      await prisma.cart.update({
        where: { id: cartId },
        data: { jumlah: newJumlah },
      })
    }

    revalidatePath('/kasir')
    return { success: true }
  } catch (error) {
    console.error('[updateCartItem] error:', error)
    throw new Error('Gagal memperbarui jumlah item keranjang')
  }
}

/**
 * Hapus satu item keranjang berdasarkan id Cart.
 */
export const removeCartItem = async (cartId: string) => {
  try {
    await prisma.cart.delete({ where: { id: cartId } })
    revalidatePath('/kasir')
    return { success: true }
  } catch (error) {
    console.error('[removeCartItem] error:', error)
    throw new Error('Gagal menghapus item dari keranjang')
  }
}

/**
 * Hapus semua item keranjang milik user tertentu.
 * (Misalnya setelah checkout berhasil.)
 */
export const clearCartByUser = async (id_user: string) => {
  try {
    await prisma.cart.deleteMany({ where: { id_user } })
    revalidatePath('/kasir')
    return { success: true }
  } catch (error) {
    console.error('[clearCartByUser] error:', error)
    throw new Error('Gagal mengosongkan keranjang')
  }
}
