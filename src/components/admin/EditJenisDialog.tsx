'use client'

import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from 'lucide-react';
import { updateJenisBarang } from '@/action/admin/category.action';
import toast from 'react-hot-toast';

export default function EditJenisDialog({ jenis }: { jenis: { id: string, nama_jenis: string } }) {
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			const result = await updateJenisBarang(jenis.id, formData);
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
				<Button variant="ghost" size="icon" className="h-8 w-8"><Pencil size={14} /></Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit Jenis Barang</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="space-y-1">
							<Label htmlFor="nama_jenis">Nama Jenis</Label>
							<Input id="nama_jenis" name="nama_jenis" defaultValue={jenis.nama_jenis} required />
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