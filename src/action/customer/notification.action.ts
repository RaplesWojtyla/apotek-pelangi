'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getDbUserId } from "../user.action"


export const getNotifications = async () => {
	const userId = await getDbUserId()
	if (!userId) return { 
		success: false, 
		message: "User tidak ditemukan", 
		data: [] 
	}

	try {
		const notifications = await prisma.notifikasi.findMany({
			where: { id_user: userId },
			orderBy: { createdAt: 'desc' },
			take: 20,
		})

		return { success: true, data: notifications }
	} catch (error) {
		console.error("[getNotifications] Error:", error)

		return { 
			success: false, 
			message: "Gagal mengambil notifikasi", 
			data: [] 
		}
	}
}


export const getUnreadNotificationCount = async () => {
	const userId = await getDbUserId()
	if (!userId) return { success: false, count: 0 }

	try {
		const count = await prisma.notifikasi.count({
			where: {
				id_user: userId,
				sudah_dibaca: false,
			}
		})

		return { 
			success: true, 
			count 
		}
	} catch (error) {
		console.error("[getUnreadNotificationCount] Error:", error)
		
		return { 
			success: false, 
			count: 0 
		}
	}
}


export const markAllNotificationsAsRead = async () => {
	const userId = await getDbUserId()
	if (!userId) return { success: false, message: "User tidak ditemukan" }

	try {
		await prisma.notifikasi.updateMany({
			where: {
				id_user: userId,
				sudah_dibaca: false,
			},
			data: {
				sudah_dibaca: true,
			}
		})

		revalidatePath('/customer/notification')

		return { 
			success: true, 
			message: "Semua notifikasi telah dibaca" 
		}
	} catch (error) {
		console.error("[markAllAsRead] Error:", error)

		return { 
			success: false, 
			message: "Gagal menandai notifikasi" 
		}
	}
}