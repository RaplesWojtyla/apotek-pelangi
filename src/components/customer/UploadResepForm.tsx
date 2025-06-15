'use client'

import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { createRescriptionSubmission } from "@/action/customer/resep.action";

export default function UploadResepForm() {
	const [imgUrl, setImgUrl] = useState<string | null>(null)
	const [note, setNote] = useState<string>("")
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const router = useRouter()

	const handleSubmit = async () => {
		if (!imgUrl) {
			toast.error("Silahkan unggah foto resep terlebih dahulu.")
			return
		}

		setIsSubmitting(true)

		try {
			const res = await createRescriptionSubmission(imgUrl, note)

			if (res.success) {
				toast.success("Pengajuan resep berhasil dikirim!")
				router.push("/customer/tebusresep/list")
			} else {
				toast.error(res.message || "Gagal mengirim pengajuan resep!")
			}
		} catch (error) {
			console.error(`[UploadResepForm]: [handleSubmit] Error: ${error}`);
			toast.error("Terjadi kesalahan pada server!")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			{imgUrl ? (
				<div className="p-4 border rounded-lg text-center bg-gray-50">
					<Image
						src={imgUrl}
						alt="Preview Resep"
						width={200}
						height={200}
						className="mx-auto rounded-md mb-4"
					/>
					<p className="text-sm text-gray-600 mb-4">Upload berhasil!</p>
					<Button
						variant="destructive"
						size="sm"
						className="gap-2 cursor-pointer"
						onClick={() => setImgUrl(null)}
					>
						<Trash2 size={16} /> Hapus & Upload Ulang
					</Button>
				</div>
			) : (
				<div id="tour-upload-resep">
					<UploadDropzone
						className="cursor-pointer hover:bg-gray-200 transition ease-linear duration-300"
						endpoint={'resepImgUploader'}
						onClientUploadComplete={(res) => {
							if (res && res.length > 0) {
								setImgUrl(res[0].ufsUrl)
								toast.success("Foto resep berhasil diunggah!")
							}
						}}
						onUploadError={(error: Error) => {
							toast.error(`Gagal upload foto resep: ${error.message}`, { duration: 6500 })
						}}
						config={{
							mode: "auto"
						}}
					/>
				</div>
			)}

			<Textarea
				id="tour-catatan-resep"
				placeholder="Tambahkan Catatan (Opsional)..."
				className="w-full border-gray-300 rounded-md p-2 mt-4 resize-none"
				rows={3}
				value={note}
				onChange={(e) => setNote(e.target.value)}
				disabled={isSubmitting}
			/>
			<div className="text-center mt-4">
				<Button
					id="tour-kirim-resep-button"
					onClick={handleSubmit}
					disabled={!imgUrl || isSubmitting}
					className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all gap-2"
				>
					{isSubmitting && <Loader2 className="animate-spin" size={16} />}
					Kirim Pengajuan Resep
				</Button>
			</div>
		</>
	)
}