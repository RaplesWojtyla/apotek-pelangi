'use server'

import { checkRole } from "@/lib/clerk"
import { prisma } from "@/lib/prisma"

export type VerifiedMember = {
	id: string
	nama: string | null
}

export const findUserByEmail = async (email: string): Promise<{
	success: boolean
	data?: VerifiedMember | null
	message?: string
}> => {
	if (!(await checkRole('KASIR'))) return {
		success: false,
		data: null,
		message: "Akses anda ditolak!"
	}

	if (!email) return {
		success: false,
		data: null,
		message: "Email tidak boleh kosong!"
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
				role: 'CUSTOMER'
			},
			select: {
				id: true,
				nama: true,
				role: true
			}
		})

		if (user) return {
			success: true,
			data: user
		}

		return {
			success: false,
			data: null,
			message: "Member tidak ditemukan!"
		}
	} catch (error) {
		console.error("[findUserByEmailForCashier] Error:", error)
		
		return {
			success: false,
			message: "Terjadi kesalahan pada server."
		}
	}
}