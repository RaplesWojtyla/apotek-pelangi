import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"


export const syncUser = async () => {
	try {
		const { userId } = await auth()
		const user = await currentUser()
		
		if (!userId || !user) return

		const existingUser = await prisma.user.findUnique({
			where: {
				clerkId: userId
			}
		})

		if (existingUser) return existingUser

		const newDbUser = await prisma.user.create({
			data: {
				clerkId: userId,
				nama: user.fullName,
				email: user.emailAddresses[0].emailAddress,
				foto_profil: user.imageUrl,
				role: user.publicMetadata?.metadata.role ?? 'CUSTOMER'
			}
		})

		return newDbUser
	} catch(e) {
		console.error(e);

		throw new Error("Terjadi kesalahan saat membaca akun user.")
	}
}

export const getUserDb = async ( clerkId: string ) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerkId
			}
		})

		return user
	} catch (error) {
		console.error(error);

		throw new Error('Terjadi kesalahan saat mengambil data user.')
	}
}
