'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { NextResponse } from "next/server"
import { SumberCart } from "@prisma/client"

const getCart = async () => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) return null

	try {
		const cart = await prisma.cart.findMany({
			where: { id_user: dbUserId },
			include: {
				barang: true
			}
		})

		return cart
	} catch (error) {
		throw new Error("Gagal memuat keranjang anda")
	}
}

const addToCart = async (idBarang: string, amount: number, sumber: SumberCart) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) return NextResponse.redirect('/unauthorized')

	try {
		const cart = await prisma.cart.upsert({
			where: {
				id_user_id_barang: { id_user: dbUserId, id_barang: idBarang }
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

		return cart
	} catch (error) {
		throw new Error("Gagal menambahkan data ke kasir")
	}
}
