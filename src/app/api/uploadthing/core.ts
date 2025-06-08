import { auth } from "@clerk/nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

const handleAuth = async () => {
	const { userId } = await auth()

	if (!userId) throw new UploadThingError("Pengguna tidak terauntentikasi! Harap login!")

	return { userId: userId }
}

export const ourFileRouter = {
	resepImgUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(async () => await handleAuth())
		.onUploadComplete(async ({ metadata, file }) => {
			console.log(`Upload complete for userId: ${metadata.userId}`);
			console.log(`File url: ${file.ufsUrl}`);

			return {
				uploadedBy: metadata.userId,
				fileUrl: file.ufsUrl
			}
		})
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
