'use server'

import { prisma } from "@/lib/prisma"
import { LevelUser, StatusUser } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { checkRole, clerkClient } from "@/lib/clerk"


export const getUsers = async ({ page = 1, take = 10, query = "" }) => {
	try {
		const skip = (page - 1) * take
		const users = await prisma.user.findMany({
			skip,
			take,
			where: {
				OR: [
					{ nama: { contains: query, mode: 'insensitive' } },
					{ email: { contains: query, mode: 'insensitive' } },
				],
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return {
			success: true,
			data: users
		}
	} catch (error) {
		console.error("[getUsers] Error:", error)

		return {
			success: false,
			data: [],
			message: 'Gagal mengambil data pengguna.'
		}
	}
}

export const getUserStats = async (query = "", take = 10) => {
	try {
		const totalUsers = await prisma.user.count({
			where: {
				OR: [
					{ nama: { contains: query, mode: 'insensitive' } },
					{ email: { contains: query, mode: 'insensitive' } },
				],
			},
		})
		return {
			success: true,
			total: totalUsers,
			totalPages: Math.ceil(totalUsers / take)
		}
	} catch (error) {
		console.error('[getUserStats] Error:', error)
		return { success: false, total: 0, totalPages: 1, message: 'Gagal menghitung statistik pengguna.' }
	}
}

export const updateUserRoleAndStatus = async (clerkId: string, role: LevelUser, status: StatusUser) => {
	if (!(await checkRole("ADMIN"))) {
		return { success: false, message: "Akses ditolak." }
	}

	try {
		const clerk = clerkClient

		await prisma.user.update({
			where: { clerkId },
			data: { role, status },
		})

		await clerk.users.updateUserMetadata(clerkId, {
			publicMetadata: {
				metadata: { role }
			}
		})

		revalidatePath('/admin/daftaruser')

		return {
			success: true,
			message: "Data pengguna berhasil diperbarui."
		}
	} catch (error) {
		console.error("[updateUserRoleAndStatus] Error:", error)
		return {
			success: false,
			message: "Gagal memperbarui data pengguna."
		}
	}
}

export const deleteUser = async (clerkId: string) => {
	if (!(await checkRole("ADMIN"))) return {
		success: false,
		message: "Akses ditolak."
	}

	try {
		const clerk = clerkClient

		await clerk.users.deleteUser(clerkId)
		await prisma.user.delete({
			where: { clerkId: clerkId }
		})

		revalidatePath('/admin/daftaruser')

		return {
			success: true,
			message: "Pengguna berhasil dihapus."
		}
	} catch (error) {
		console.error("[deleteUser] Error:", error)

		return {
			success: false,
			message: "Gagal menghapus pengguna."
		}
	}
}