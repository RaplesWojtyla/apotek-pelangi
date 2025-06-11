import { checkRole } from "@/lib/clerk"
import { Roles } from "@/types/globals"
import { auth } from "@clerk/nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

const handleAuth = async (role: Roles) => {
	const { userId } = await auth()

	if (!userId) throw new UploadThingError("Pengguna tidak terauntentikasi! Harap login!")
	
	if(!(await checkRole(role))) throw new UploadThingError("Pengguna tidak memiliki hak akses!")

	return { userId: userId }
}

// const handleAdminAuth

export const ourFileRouter = {
	resepImgUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(async () => await handleAuth('CUSTOMER'))
		.onUploadComplete(async ({ metadata, file }) => {
			console.log(`Upload complete for userId: ${metadata.userId}`);
			console.log(`File url: ${file.ufsUrl}`);

			return {
				uploadedBy: metadata.userId,
				fileUrl: file.ufsUrl
			}
		}),
	
	categoryImgUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }})
		.middleware(async () => await handleAuth('ADMIN'))
		.onUploadComplete(async ({ metadata, file }) => {
			return {
				uploadedBy: metadata.userId,
				fileUrl: file.ufsUrl
			}
		}),

	resepImgKasirUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }})
		.middleware(async() => await handleAuth('KASIR'))
		.onUploadComplete(async ({ metadata, file }) => {
			return {
				uploadedBy: metadata.userId,
				fileUrl: file.ufsUrl 
			}
		})
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
