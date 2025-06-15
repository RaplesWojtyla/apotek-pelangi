"use client"

import { useState, useTransition, useEffect } from "react"
import Image from "next/image"
import toast from "react-hot-toast"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getProducts, Product } from "@/action/kasir/product.action"
import { processPrescription } from "@/action/kasir/tebusResep.action"
import { Loader2, PackageOpen, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { StatusResep } from "@prisma/client"

type PengajuanResep = {
	id: string
	id_user: string
	tanggal_pengajuan: Date
	status: string
	catatan: string | null
	foto_resep: string
	user: {
		id: string
		nama: string | null
	} | null
}

interface DetailTebusResepDialogProps {
	resep: PengajuanResep
	onProcessSuccess: () => void
}

interface PreparedItem {
	id_barang: string
	nama_barang: string
	jumlah: number
	totalStock: number
}

type Steps = {
	label: string
	value: StatusResep,
}

export default function DetailTebusResepDialog({ resep, onProcessSuccess }: DetailTebusResepDialogProps) {
	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const [allProducts, setAllProducts] = useState<Product[]>([])
	const [searchTerm, setSearchTerm] = useState("")
	const [preparedItems, setPreparedItems] = useState<PreparedItem[]>([])
	const [note, setNote] = useState("")

	useEffect(() => {
		if (open && allProducts.length === 0) {
			getProducts({ take: 1000 }).then(setAllProducts)
		}
	}, [open, allProducts.length])

	const steps: Steps[] = [
		{ label: "Resep Diajukan", value: 'MENGAJUKAN' },
		{ label: "Menunggu Konfirmasi", value: 'MENGAJUKAN' },
		{ label: resep.status === "DITOLAK" ? "Ditolak" : "Diterima", value: resep.status as StatusResep },
	]

	const currentStepIndex = resep.status === "MENGAJUKAN"
		? 1
		: resep.status === "DITOLAK" || resep.status === 'DITERIMA' ? 2 : 1;

	const filteredProducts = allProducts.filter(p =>
		p.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) &&
		!preparedItems.some(item => item.id_barang === p.id)
	)

	const handleAddItem = (product: Product) => {
		setPreparedItems(prev => [...prev, { id_barang: product.id, nama_barang: product.nama_barang, jumlah: 1, totalStock: product.stok_barang }])
	}

	const handleRemoveItem = (id_barang: string) => {
		setPreparedItems(prev => prev.filter(item => item.id_barang !== id_barang))
	}

	const handleQtyChange = (id_barang: string, newQty: number) => {
		setPreparedItems(prev => prev.map(item => item.id_barang === id_barang ? { ...item, jumlah: newQty } : item))
	}

	const handleProcess = (status: 'DITERIMA' | 'DITOLAK') => {
		startTransition(async () => {
			const itemsToSubmit = preparedItems.map(item => ({ id_barang: item.id_barang, jumlah: item.jumlah }))
			const result = await processPrescription(resep.id, status, itemsToSubmit, note)

			if (result.success) {
				toast.success(result.message || "Resep berhasil diproses.")
				onProcessSuccess()
				setOpen(false)
			} else {
				toast.error(result.message || "Gagal memproses resep.")
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">Lihat Detail</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[90vh] grid grid-cols-1 gap-6 overflow-y-auto">

				<div className="flex flex-col space-y-4">
					<DialogHeader>
						<DialogTitle className="truncate text-primary">
							Detail Penebusan Resep
						</DialogTitle>
					</DialogHeader>
					<div className="relative w-full h-64 border rounded-lg overflow-hidden">
						<Link
							href={resep.foto_resep}
							target="_blank"
						>
							<Image src={resep.foto_resep} alt="Foto Resep" layout="fill" objectFit="contain" />
						</Link>
					</div>

					<div className="flex flex-col relative ml-4 mb-8">
						{steps.map((step, idx) => {
							const isActive = idx <= currentStepIndex
							const isRejected = resep.status === "DITOLAK" && idx === 2

							return (
								<div className="flex items-start gap-3 relative" key={step.label}>
									<div className="flex flex-col items-center">
										<div
											className={`w-4 h-4 rounded-full ${isRejected
												? "bg-red-600"
												: isActive
													? "bg-green-500"
													: "bg-gray-300"
												}`}
										/>
										{idx < steps.length - 1 && (
											<div
												className={`w-[2px] h-8 ${isRejected
													? "bg-red-600"
													: idx < currentStepIndex
														? "bg-green-500"
														: "bg-gray-300"
													}`}
											/>
										)}
									</div>
									<span
										className={`text-sm ${isRejected
											? "text-red-600 font-semibold"
											: isActive
												? "text-black font-semibold"
												: "text-gray-400"
											}`}
									>
										{step.label}
									</span>
								</div>
							);
						})}
					</div>

					<div className="border rounded-md p-4 mb-6">
						<p><span className="font-semibold">Nama Pengaju:</span> {resep.user?.nama}</p>
						<p><span className="font-semibold">Tanggal Upload:</span> {resep.tanggal_pengajuan.toLocaleDateString('id-ID')}</p>
						<p><span className="font-semibold">Status:</span> {resep.status}</p>
						<p><span className="font-semibold">Catatan:</span> {resep.catatan || "-"}</p>
					</div>

					<Textarea placeholder="Catatan untuk pelanggan (cth: alasan penolakan, dosis, dll)" value={note} onChange={e => setNote(e.target.value)} />
					<div>
						<h3 className="font-semibold mb-2">Barang yang Disiapkan</h3>
						<ScrollArea className="border rounded-md p-2 h-48">
							{preparedItems.length > 0 ? (
								preparedItems.map(item => (
									<div key={item.id_barang} className="flex items-center justify-between p-2 hover:bg-gray-50">
										<span className="text-sm">{item.nama_barang}</span>
										<div className="flex items-center gap-2">
											<Button
												size={'sm'}
												variant={'outline'}
												onClick={() => handleQtyChange(item.id_barang, item.jumlah - 1)}
												disabled={item.jumlah < 2}
											>
												-
											</Button>
											<Input disabled value={item.jumlah} className="w-16 h-8 text-center" />
											<Button
												size={'sm'}
												variant={'outline'}
												onClick={() => handleQtyChange(item.id_barang, item.jumlah + 1)}
												disabled={item.jumlah >= item.totalStock}
											>
												+
											</Button>
											<Button
												size="icon"
												variant="ghost"
												onClick={() => handleRemoveItem(item.id_barang)}
												className="text-red-500 h-8 w-8"
											>
												<Trash2 size={16} />
											</Button>
										</div>
									</div>
								))
							) : (
								<div className="flex flex-col items-center justify-center h-full text-gray-500">
									<PackageOpen size={32} className="mb-2" />
									<p className="text-sm text-center">Belum ada barang</p>
								</div>
							)}
						</ScrollArea>
					</div>
				</div>

				<div className="flex flex-col space-y-4">
					<h3 className="font-semibold">Cari & Tambah Produk</h3>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
						<Input placeholder="Cari nama obat..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
					</div>
					<ScrollArea className="border rounded-md h-[200px]">
						{filteredProducts.length === 0 ? (
							<div className="flex items-center justify-between p-3 hover:bg-cyan-50 cursor-pointer">
								<p className="text-sm font-medium animate-pulse">Memuat...</p>
							</div>
						) : (
							filteredProducts.map(product => (
								<div key={product.id} onClick={() => handleAddItem(product)} className="flex items-center justify-between p-3 hover:bg-cyan-50 cursor-pointer">
									<span className="text-sm font-medium">{product.nama_barang}</span>
									<span className="text-xs text-gray-500">Stok: {product.stok_barang}</span>
								</div>
							))
						)}
					</ScrollArea>
					<DialogFooter className="!justify-between items-center pt-4 border-t sticky bottom-0 bg-background pb-2 -mb-2">
						<Button variant="destructive" onClick={() => handleProcess('DITOLAK')} disabled={isPending}>
							{isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Tolak Resep
						</Button>
						<div className="flex gap-2">
							<DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
							<Button onClick={() => handleProcess('DITERIMA')} disabled={isPending || preparedItems.length === 0}>
								{isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Setujui & Siapkan
							</Button>
						</div>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	)
}