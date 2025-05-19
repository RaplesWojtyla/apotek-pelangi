import { Roles } from "@/types/globals"
import { currentUser } from "@clerk/nextjs/server"

export const checkRole = async (role: Roles) => {
	const user  = await currentUser()

	return user?.publicMetadata.metadata?.role === role
}