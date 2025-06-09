"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Terima 'products' sebagai prop
export default function DaftarObatClient({ products }: { products: any[] }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: "asc" | "desc";
	} | null>(null);

	const filteredAndSortedData = useMemo(() => {
		let data = [...products];

		// Filter berdasarkan searchTerm
		if (searchTerm) {
			data = data.filter(item =>
				item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

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
	}, [products, searchTerm, sortConfig]);

	function handleSort(key: string) {
		setSortConfig(prev => {
			if (prev?.key === key && prev.direction === 'asc') {
				return { key, direction: 'desc' };
			}
			return { key, direction: 'asc' };
		});
	}

	const headers = [
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
					<h3 className="text-2xl font-bold">{products.length}</h3>
				</div>
			</div>


			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Input
						placeholder="Cari produk..."
						className="w-full md:w-64"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
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
										<ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
									</div>
								</TableHead>
							))}
							<TableHead>Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredAndSortedData.map((obat, index) => (
							<TableRow key={obat.id}>
								<TableCell>{index + 1}</TableCell>
								{headers.map(h => (
									<TableCell key={h.key}>
										{h.key === 'harga_jual' ? `Rp${obat[h.key].toLocaleString('id-ID')}` : obat[h.key]}
									</TableCell>
								))}
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreVertical className="w-5 h-5" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<Link href={`/admin/daftarobat/view/${obat.id_barang}`} className="flex items-center gap-2">
													<Eye className="w-4 h-4" /> Lihat
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<Link href={`/admin/daftarobat/edit/${obat.id_barang}`} className="flex items-center gap-2">
													<Pencil className="w-4 h-4" /> Edit
												</Link>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}