import { Roles } from "@/types/globals"
import { createClerkClient, currentUser } from "@clerk/nextjs/server"

export const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export const checkRole = async (role: Roles) => {
	const user  = await currentUser()

	return user?.publicMetadata.metadata?.role === role
}