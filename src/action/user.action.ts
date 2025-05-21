'use server'

import { prisma } from "@/lib/prisma"
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"

export const syncUser = async () => {
	try {
		const user = await currentUser()

		if (!user) return

		const client = await clerkClient()
		const role = user.publicMetadata?.metadata?.role ?? "CUSTOMER"

		const dbUser = await prisma.user.upsert({
			where: { clerkId: user.id },
			update: {
				nama: user.fullName,
				email: user.emailAddresses[0].emailAddress,
				foto_profil: user.imageUrl
			},
			create: {
				clerkId: user.id,
				nama: user.fullName,
				email: user.emailAddresses[0].emailAddress,
				foto_profil: user.imageUrl,
				role: role
			}
		})

		await client.users.updateUserMetadata(user.id, {
			publicMetadata: {
				metadata: {
					role: dbUser.role
				}
			}
		})

		return dbUser
	} catch (e) {
		console.error(e);

		throw new Error("Terjadi kesalahan saat membaca akun user.")
	}
}

export const getUserByClerkId = async (clerkId: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerkId
			},
		})

		return user
	} catch (error) {
		console.error(error);

		throw new Error('Terjadi kesalahan saat mengambil data user.')
	}
}

export const getDbUserId = async () => {
	const { userId: clerkId } = await auth()

	if (!clerkId) return null

	try {
		const dbUserId = await getUserByClerkId(clerkId)

		return dbUserId?.id
	} catch (error) {
		console.error(error)

		throw new Error("Gagal mengambil ID user")
	}
}
