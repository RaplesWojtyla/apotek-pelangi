'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "../user.action"

export type Rescription = Awaited<ReturnType<typeof getRescriptionSubmissionList>>['data'][number]

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

export const getRescriptionSubmissionList = async () => {
	const dbUserId = await getDbUserId()

	if (!dbUserId) {
		return {
			success: false,
			message: "Pengguna tidak terautentikasi.",
			data: []
		}
	}

	try {
		const rescriptionList = await prisma.pengajuanResep.findMany({
			where: {
				id_user: dbUserId
			},
			orderBy: {
				tanggal_pengajuan: 'desc'
			}
		})

		return {
			success: true,
			message: "Daftar tebus resep berhasil diambil.",
			data: rescriptionList
		}
	} catch (error) {
		console.error(`[getRescriptionSubmissionList] Error: ${error}`);

		return {
			success: false,
			message: "Terjadi kesalahan pada server. Harap coba lagi!",
			data: []
		}
	}
}
