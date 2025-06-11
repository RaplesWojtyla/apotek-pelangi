"use client";

import React, { useState, useMemo, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pencil,
	Eye,
	Plus,
	Search,
	Package,
	MoreVertical,
	ChevronsUpDown,
	Trash2,
	Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // <-- 1. Import komponen Image
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination";
import { deleteProduct } from "@/action/admin/product.action";
import toast from "react-hot-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";


export default function DaftarObatClient({ products, totalPages, totalProducts }: { products: any[], totalPages: number, totalProducts: number }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { push, replace } = useRouter()
	const [isDeleting, startDeleteTransition] = useTransition()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const currPage = Number(searchParams.get("page") || 1)
	const idx = (currPage - 1) * 10

	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: "asc" | "desc";
	} | null>(null);

	const sortedData = useMemo(() => {
		let data = [...products];

		// Sorting
		if (sortConfig !== null) {
			data.sort((a, b) => {
				const aVal = String(a[sortConfig.key] ?? "").toLowerCase();
				const bVal = String(b[sortConfig.key] ?? "").toLowerCase();
				if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
				if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return data;
	}, [products, sortConfig]);

	const handleSearch = useDebouncedCallback(term => {
		const params = new URLSearchParams(searchParams)
		params.set("page", '1')

		term ? params.set("search", term) : params.delete("search")

		replace(`${pathname}?${params.toString()}`)
	}, 300)

	const handleDelete = async (id: string) => {
		startDeleteTransition(async () => {
			try {
				const res = await deleteProduct(id)

				if (res.success) {
					toast.success(res.message)
				} else {
					toast.error(res.message)
				}
			} catch (error) {
				toast.error("Terjadi gangguan pada server!")
			} finally {
				setIsOpen(false)
			}
		})
	}

	function handleSort(key: string) {
		setSortConfig(prev => {
			if (prev?.key === key && prev.direction === 'asc') {
				return { key, direction: 'desc' };
			}
			return { key, direction: 'asc' };
		});
	}

    // --- 2. Tambahkan 'foto_barang' ke dalam headers ---
	const headers = [
        { key: "foto_barang", label: "Foto"},
		{ key: "nama_barang", label: "Nama Produk" },
		{ key: "deskripsi", label: "Deskripsi" },
		{ key: "golongan", label: "Golongan" },
		{ key: "totalStock", label: "Total Stok" },
		{ key: "harga_jual", label: "Harga Jual" },
	];

	return (
		<div className="p-4 max-w-[1240px] mx-auto">
			<h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

			<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[260px] mb-6">
				<div className="p-4 rounded-full bg-blue-100">
					<Package className="text-blue-600 w-6 h-6" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Jumlah Produk</p>
					<h3 className="text-2xl font-bold">{totalProducts}</h3>
				</div>
			</div>


			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Input
						placeholder="Cari produk..."
						className="w-full md:w-64"
						defaultValue={searchParams.get("search")?.toString()}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<Button variant="outline" size="icon">
						<Search className="w-4 h-4" />
					</Button>
				</div>

				<Link href="/admin/daftarobat/tambah">
					<Button className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600">
						<Plus className="w-4 h-4" />
						Tambah Obat
					</Button>
				</Link>
			</div>

			<div className="overflow-auto rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No</TableHead>
							{headers.map((header) => (
								<TableHead
									key={header.key}
									onClick={() => handleSort(header.key)}
									className="cursor-pointer select-none whitespace-nowrap"
								>
									<div className="flex items-center gap-1">
										{header.label}
                                        {/* Jangan tampilkan ikon sort untuk kolom foto */}
										{header.key !== 'foto_barang' && <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />}
									</div>
								</TableHead>
							))}
							<TableHead>Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedData.map((obat, index) => (
							<TableRow key={obat.id}>
								<TableCell>{idx + index + 1}</TableCell>
								{headers.map(h => (
									<TableCell key={h.key}>
                                        {/* --- 3. Logika untuk render gambar --- */}
										{h.key === 'foto_barang' ? (
											<Image 
												src={obat.foto_barang.includes("https") ? obat.foto_barang : `/${obat.foto_barang}`} 
												alt={obat.nama_barang} 
												width={56} 
												height={56}
												className="w-14 h-14 rounded-md object-cover"
											/>
										) : h.key === 'harga_jual' ? (
											`Rp${obat[h.key].toLocaleString('id-ID')}`
										) : (
											obat[h.key]
										)}
									</TableCell>
								))}
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button className="cursor-pointer" variant="ghost" size="icon">
												<MoreVertical className="w-5 h-5" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<Link href={`/admin/daftarobat/view/${obat.id}`} className="flex items-center gap-2 w-full cursor-pointer">
													<Eye className="w-4 h-4" /> Lihat
												</Link>
											</DropdownMenuItem>

											<DropdownMenuItem asChild>
												<Link href={`/admin/daftarobat/edit/${obat.id}`} className="flex items-center gap-2 w-full cursor-pointer">
													<Pencil className="w-4 h-4" /> Edit
												</Link>
											</DropdownMenuItem>

											<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
												<AlertDialogTrigger asChild>
													<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500 hover:bg-red-50 w-full justify-start gap-2">
														<Trash2 className="w-4 h-4" /> Delete
													</div>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Anda Yakin Ingin Menghapus Produk Ini?</AlertDialogTitle>
														<AlertDialogDescription>Data produk yang sudah dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Batal</AlertDialogCancel>
														<Button
															variant={'destructive'}
															className="flex items-center justify-start hover:bg-red-800 transition duration-300 gap-2 cursor-pointer"
															onClick={() => handleDelete(obat.id)}
															disabled={isDeleting}
														>
															{isDeleting ? (
																<>
																	<Loader2 className="size-4 animate-spin" /> <span className="animate-pulse">Menghapus...</span>
																</>
															) : (
																<>
																	<Trash2 className="w-4 h-4" /> Hapus
																</>
															)}
														</Button>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="mt-6 flex justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}