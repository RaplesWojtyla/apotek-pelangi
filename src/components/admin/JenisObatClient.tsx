'use client'

import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { CategoryWithJenis, createCategory, createJenisBarang } from "@/action/admin/category.action";
import toast from "react-hot-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import TambahJenisDialog from "./TambahJenisDialog";
import EditKategoriDialog from "./EditKategoriDialog";
import EditJenisDialog from "./EditJenisDialog";


function TambahKategoriDialog() {
	const [isPending, startTransition] = useTransition();
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = async (formData: FormData) => {
		if (imageUrl) {
			formData.append('foto_kategori', imageUrl);
		}
		
		startTransition(async () => {
			const result = await createCategory(formData);
			if (result.success) {
				toast.success(result.message);
				formRef.current?.reset();
				setImageUrl(null);
			} else {
				toast.error(result.message);
			}
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex-shrink-0 w-24 h-24 bg-blue-50 border-2 border-dashed border-blue-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer text-4xl font-bold text-blue-600 select-none hover:bg-blue-100 transition">
					+
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={handleSubmit} ref={formRef}>
					<DialogHeader>
						<DialogTitle>Tambah Kategori Baru</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="space-y-1">
							<Label htmlFor="nama_kategori">Nama Kategori</Label>
							<Input id="nama_kategori" name="nama_kategori" required />
						</div>
						<div className="space-y-1">
							<Label>Ikon Kategori</Label>
							{imageUrl ? (
								<div className="text-center"><Image src={imageUrl} alt="preview" width={80} height={80} className="rounded-full mx-auto" /></div>
							) : (
								<UploadDropzone
									endpoint={'categoryImgUploader'}
									onClientUploadComplete={res => {
										if (res && res.length > 0) {
											setImageUrl(res[0].ufsUrl)
											toast.success("Berhasil mengupload foto kategori!")
										}
									}}
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
							{isPending && <Loader2 size={16} className="animate-spin" />} Simpan
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}


export default function JenisObatClient({ initialCategories }: { initialCategories: CategoryWithJenis[] }) {
	const [selectedCategory, setSelectedCategory] = useState<CategoryWithJenis | null>(initialCategories[0] || null);

	return (
		<div className="p-6 w-full max-w-7xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Kategori & Jenis Produk</h1>

			{/* Daftar Kategori */}
			<div className="overflow-x-auto mb-10">
				<div className="flex items-center space-x-6 w-max min-w-full pb-4">
					<TambahKategoriDialog />
					{initialCategories.map((cat) => (
						<div
							key={cat.id}
							onClick={() => setSelectedCategory(cat)}
							className="flex flex-col items-center flex-shrink-0 w-28 space-y-2 cursor-pointer group"
						>
							<div className={`w-24 h-24 bg-blue-50 border rounded-full flex items-center justify-center shadow-sm transition-all duration-200 group-hover:border-cyan-500 ${selectedCategory?.id === cat.id ? 'border-cyan-500 border-2' : 'border-blue-200'}`}>
								<img 
									src={cat.foto_kategori.includes("https") ? cat.foto_kategori : `/${cat.foto_kategori}`} 
									alt={cat.nama_kategori}
									className="transition-transform group-hover:scale-110 rounded-full size-full object-cover" />
							</div>
							<span className="text-sm text-center font-medium text-gray-700">{cat.nama_kategori}</span>
						</div>
					))}
				</div>
			</div>

			{/* Jenis Barang */}
			{selectedCategory && (
				<div>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<h2 className="text-xl font-semibold">{selectedCategory.nama_kategori}</h2>
							<EditKategoriDialog kategori={selectedCategory} />
						</div>
						<TambahJenisDialog kategori={selectedCategory} />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{selectedCategory.jenis_barang.length > 0 ? (
							selectedCategory.jenis_barang.map((jenis) => (
								<div key={jenis.id} className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
									<h4 className="font-medium text-md text-gray-800">{jenis.nama_jenis}</h4>
									<EditJenisDialog jenis={jenis} />
								</div>
							))
						) : (
							<p className="text-sm text-gray-500 col-span-full">Belum ada jenis barang di kategori ini.</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}