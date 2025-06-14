'use server'

import { checkRole, clerkClient } from "@/lib/clerk"


export const inviteCashier = async (formData: FormData) => {
	if (!(await checkRole('ADMIN'))) return {
		success: false,
		message: "Anda tidak memiliki hak akses untuk aksi ini!"
	}

	const email = formData.get("email") as string || ""

	if (!email) return {
		success: false,
		message: "Email harus diisi!"
	}

	try {
		await clerkClient.invitations.createInvitation({
			emailAddress: email.trim(),
			publicMetadata: {
				metadata: {
					role: "KASIR"
				}
			},
		})
		
		return {
			success: true,
			message: `Undangan berhasil dikirim ke ${email}!`
		}
	} catch (error: any) {
		console.error("[inviteCashier] Error:", error.errors)

		if (error.clerkError && error.message.includes('duplicate invitation')) {
			return {
				success: false,
				message: "Terdapat undangan yang masih tertunda untuk alamat email berikut: poskesdeslaubaleng@gmail.com"
			}
		}
		return {
			success: false,
			message: "Gagal mengirim undangan."
		}
	}
}