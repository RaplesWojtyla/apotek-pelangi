'use client'

import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from 'lucide-react';
import { updateCategory } from '@/action/admin/category.action';
import toast from 'react-hot-toast';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';

export default function EditKategoriDialog({ kategori }: { kategori: { id: string, nama_kategori: string } }) {
	const [open, setOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		if (imageUrl) {
			formData.append('foto_kategori', imageUrl);
		}

		startTransition(async () => {
			const result = await updateCategory(kategori.id, formData);
			
			if (result.success) {
				toast.success(result.message);
				setOpen(false);
			} else {
				toast.error(result.message);
			}

			setImageUrl(null)
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon"><Pencil size={16} /></Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit Kategori</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="space-y-1">
							<Label htmlFor="nama_kategori" className='mb-2'>Nama Kategori</Label>
							<Input id="nama_kategori" name="nama_kategori" defaultValue={kategori.nama_kategori} required />
						</div>
						<div className="space-y-1">
							<Label>Ikon Kategori</Label>
							{imageUrl ? (
								<div className="text-center">
									<Image src={imageUrl} alt="preview" width={80} height={80} className="rounded-full mx-auto" />
								</div>
							) : (
								<UploadDropzone
									endpoint={'categoryImgUploader'}
									onClientUploadComplete={(res) => res && setImageUrl(res[0].ufsUrl)}
									onUploadError={(error: Error) => {
										toast.error(`Gagal upload foto kategori: ${error.message}`, { duration: 6500 })
									}}
									config={{
										mode: 'auto'
									}}
								/>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isPending} className="gap-2">
							{isPending && <Loader2 size={16} className="animate-spin" />} Simpan Perubahan
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}