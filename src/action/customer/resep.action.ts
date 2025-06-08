'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "../user.action"


export const createRescriptionSubmission = async (rescriptionImgUrl: string, note?: string) => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) {
		return {
			success: false,
			message: "Pengguna tidak terautentikasi"
		}
	}

	if (!rescriptionImgUrl) {
		return {
			success: false,
			message: "Foto resep wajib diunggah!"
		}
	}

	try {
		await prisma.pengajuanResep.create({
			data: {
				id_user: dbUserId,
				foto_resep: rescriptionImgUrl,
				catatan: note,
				status: 'MENGAJUKAN',
			}
		})

		return {
			success: true,
			message: "Pengajuan resep berhasil dibuat!"
		}
	} catch (error) {
		console.error(`[createRescriptionSubmission] Error: ${error}`);

		return {
			success: false,
			message: "Server sedang mengalami gangguan. Harap coba beberapa saat lagi!"
		}
	}
}