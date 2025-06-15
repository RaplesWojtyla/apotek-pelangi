// src/app/admin/vendor/VendorClientPage.tsx
'use client'

import { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import toast from "react-hot-toast"
import { createVendor, deleteVendor, updateVendor } from "@/action/admin/vendor.action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/Pagination"
import { Building2, Eye, Loader2, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react"


interface Vendor {
	id: string
	nama_vendor: string
	alamat: string | null
	no_hp: string | null
	email: string | null
}

interface VendorClientPageProps {
	vendors: Vendor[]
	totalVendors: number
	totalPages: number
}

export default function VendorClientPage({ vendors, totalVendors, totalPages }: VendorClientPageProps) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const [openDialog, setOpenDialog] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
	const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add')

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', '1')

		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	const handleAction = (action: 'add' | 'edit' | 'view', vendor?: Vendor) => {
		setDialogMode(action)
		setSelectedVendor(vendor || null)
		setOpenDialog(true)
	}

	const handleSubmit = (formData: FormData) => {
		const no_hp = (formData.get("no_hp") as string).trim()

		if (!no_hp) {
			toast.error("Nomor telepon wajib diisi.")
			return
		}

		if (!no_hp.startsWith('08')) {
			toast.error("Nomor telepon harus diawali dengan '08'.")
			return
		}

		if (no_hp.length < 9) {
			toast.error("Nomor telepon minimal harus 9 digit.")
			return
		}

		startTransition(async () => {
			const action = selectedVendor ? updateVendor.bind(null, selectedVendor.id) : createVendor
			const result = await action(formData)

			if (result.success) {
				toast.success(result.message)
				setOpenDialog(false)
			} else {
				toast.error(result.message)
			}
		})
	}

	const handleDelete = (id: string) => {
		startTransition(async () => {
			const result = await deleteVendor(id)

			if (result.success) {
				toast.success(result.message)
				setOpenDialog(false)
			} else {
				toast.error(result.message)
			}
		})
	}

	return (
		<>
			<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[280px] mb-6">
				<div className="p-4 rounded-full bg-cyan-100">
					<Building2 className="text-cyan-600 w-6 h-6" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Total Vendor</p>
					<h3 className="text-2xl font-bold">{totalVendors}</h3>
				</div>
			</div>

			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Input
						placeholder="Cari vendor..."
						className="w-full md:w-64"
						defaultValue={searchParams.get('query')?.toString()}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<Button variant="outline" size="icon"><Search className="w-4 h-4" /></Button>
				</div>
				<Button onClick={() => handleAction('add')} className="bg-cyan-500 hover:bg-cyan-600 text-white">
					<Plus className="w-4 h-4 mr-2" />
					Tambah vendor
				</Button>
			</div>
			
			<div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
				<Table className="w-full text-sm">
					<TableHeader>
						<TableRow>
							<TableHead>Nama Vendor</TableHead>
							<TableHead>Kontak</TableHead>
							<TableHead>Alamat</TableHead>
							<TableHead className="text-right">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{vendors.length > 0 ? (
							vendors.map((vendor) => (
								<TableRow key={vendor.id}>
									<TableCell className="font-medium">{vendor.nama_vendor}</TableCell>
									<TableCell>
										{vendor.email && <div>{vendor.email}</div>}
										{vendor.no_hp && <div className="text-muted-foreground">{vendor.no_hp}</div>}
									</TableCell>
									<TableCell className="text-muted-foreground max-w-xs truncate">{vendor.alamat || '-'}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button size="icon" variant="ghost"><MoreVertical className="w-4 h-4" /></Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => handleAction('view', vendor)} className="cursor-pointer gap-2"><Eye size={14} />Lihat</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleAction('edit', vendor)} className="cursor-pointer gap-2"><Pencil size={14} />Edit</DropdownMenuItem>
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-red-500 hover:bg-red-50 w-full justify-start gap-2">
															<Trash2 size={14} />Hapus
														</div>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
															<AlertDialogDescription>Aksi ini akan menghapus vendor '{vendor.nama_vendor}'. Data yang terhapus tidak dapat dikembalikan.</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Batal</AlertDialogCancel>
															<Button variant="destructive" onClick={() => handleDelete(vendor.id)} disabled={isPending}>
																{isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Hapus
															</Button>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Tidak ada vendor ditemukan.</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="mt-6 flex justify-center">
				<Pagination totalPages={totalPages} />
			</div>
	
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{dialogMode === 'add' && 'Tambah Vendor Baru'}
							{dialogMode === 'edit' && `Edit Vendor: ${selectedVendor?.nama_vendor}`}
							{dialogMode === 'view' && `Detail Vendor: ${selectedVendor?.nama_vendor}`}
						</DialogTitle>
						<DialogDescription>
							{dialogMode === 'add' && 'Isi detail vendor untuk ditambahkan ke sistem.'}
							{dialogMode === 'edit' && 'Perbarui informasi vendor di bawah ini.'}
							{dialogMode === 'view' && 'Informasi detail mengenai vendor.'}
						</DialogDescription>
					</DialogHeader>
					{dialogMode === 'view' ? (
						<div className="space-y-2 mt-2">
							<p><strong>Nama Vendor:</strong> {selectedVendor?.nama_vendor}</p>
							<p><strong>Email:</strong> {selectedVendor?.email || '-'}</p>
							<p><strong>No. HP:</strong> {selectedVendor?.no_hp || '-'}</p>
							<p><strong>Alamat:</strong> {selectedVendor?.alamat || '-'}</p>
						</div>
					) : (
						<form action={handleSubmit}>
							<div className="space-y-4 py-4">
								<div>
									<Label htmlFor="nama_vendor" className="mb-2">Nama Vendor</Label>
									<Input id="nama_vendor" name="nama_vendor" defaultValue={selectedVendor?.nama_vendor || ''} required />
								</div>
								<div>
									<Label htmlFor="email" className="mb-2">Email</Label>
									<Input id="email" name="email" type="email" defaultValue={selectedVendor?.email || ''} />
								</div>
								<div>
									<Label htmlFor="no_hp" className="mb-2" >No. HP</Label>
									<Input id="no_hp" name="no_hp" defaultValue={selectedVendor?.no_hp || ''} />
								</div>
								<div>
									<Label htmlFor="alamat" className="mb-2">Alamat</Label>
									<Input id="alamat" name="alamat" defaultValue={selectedVendor?.alamat || ''} />
								</div>
							</div>
							<DialogFooter>
								<Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>Batal</Button>
								<Button type="submit" disabled={isPending}>
									{isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
									{dialogMode === 'add' ? 'Simpan' : 'Simpan Perubahan'}
								</Button>
							</DialogFooter>
						</form>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}