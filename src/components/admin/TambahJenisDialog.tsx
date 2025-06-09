'use client'

import React, { useState, useTransition, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from 'lucide-react';
import { createJenisBarang } from '@/action/admin/category.action';
import toast from 'react-hot-toast';


export default function TambahJenisDialog({ kategori }: { kategori: { id: string, nama_kategori: string } }) {
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = async (formData: FormData) => {
		formData.append('id_kategori_barang', kategori.id);

		startTransition(async () => {
			const result = await createJenisBarang(formData);
			if (result.success) {
				toast.success(result.message);
				setOpen(false);
			} else {
				toast.error(result.message);
			}
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="gap-1">
					<Plus size={16} /> Tambah Jenis
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={handleSubmit} ref={formRef}>
					<DialogHeader>
						<DialogTitle>Tambah Jenis di Kategori '{kategori.nama_kategori}'</DialogTitle>
						<DialogDescription>
							Masukkan nama jenis barang baru untuk ditambahkan ke dalam kategori ini.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="nama_jenis" className="text-right">
								Nama Jenis
							</Label>
							<Input id="nama_jenis" name="nama_jenis" className="col-span-3" required />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isPending} className="gap-2">
							{isPending && <Loader2 size={16} className="animate-spin" />}
							Simpan Jenis
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}