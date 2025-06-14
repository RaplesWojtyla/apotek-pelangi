'use client'

import React, { useState, useTransition } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import toast from "react-hot-toast"
import { deleteFakturPembelian, getDetailLogPembelian, FakturPembelianWithRelations } from "@/action/admin/purchase.action"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Pagination from "@/components/Pagination"
import { ClipboardList, Plus, Search, Loader2, Trash2 } from "lucide-react"

interface LogPembelianClientProps {
	initialLogs: any[]
	totalPages: number
}

export default function LogPembelianClient({ initialLogs, totalPages }: LogPembelianClientProps) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const [isPending, startTransition] = useTransition()
	const [detailLog, setDetailLog] = useState<FakturPembelianWithRelations | null>(null)
	const [isDetailLoading, setIsDetailLoading] = useState(false)

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

	const handleViewDetail = async (id: string) => {
		setIsDetailLoading(true)
		const result = await getDetailLogPembelian(id)
		if (result.success && result.data) {
			setDetailLog(result.data)
		} else {
			toast.error(result.message || "Gagal memuat detail.")
		}
		setIsDetailLoading(false)
	}

	const handleDelete = (id: string) => {
		startTransition(async () => {
			const result = await deleteFakturPembelian(id)

			if (result.success) {
				toast.success(result.message)
			} else {
				toast.error(result.message)
			}
		})
	}

	return (
		<>
			<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full md:w-[280px] mb-6">
				<div className="p-4 rounded-full bg-blue-100"><ClipboardList className="text-blue-600 w-6 h-6" /></div>
				<div>
					<p className="text-sm text-muted-foreground">Total Faktur Pembelian</p>
					<h3 className="text-2xl font-bold">{initialLogs.length}</h3>
				</div>
			</div>

			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Input placeholder="Cari No. Faktur / Vendor..." className="w-full md:w-64" onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('query')?.toString()} />
					<Button variant="outline" size="icon"><Search className="w-4 h-4" /></Button>
				</div>
				<Link href="/admin/logpembelian/tambah">
					<Button className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600"><Plus className="w-4 h-4" />Tambah Pembelian</Button>
				</Link>
			</div>

			<div className="overflow-x-auto rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No. Faktur</TableHead>
							<TableHead>Vendor</TableHead>
							<TableHead>Pencatat</TableHead>
							<TableHead>Tanggal</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{initialLogs.length > 0 ? initialLogs.map((log) => (
							<TableRow key={log.id}>
								<TableCell className="font-medium">{log.nomor_faktur}</TableCell>
								<TableCell>{log.vendor.nama_vendor}</TableCell>
								<TableCell>{log.user.nama}</TableCell>
								<TableCell>{new Date(log.tanggal_faktur).toLocaleDateString()}</TableCell>
								<TableCell>Rp{log.total.toLocaleString()}</TableCell>
								<TableCell className="flex gap-2">
									<Dialog onOpenChange={(open) => !open && setDetailLog(null)}>
										<DialogTrigger asChild>
											<Button variant="outline" size="sm" onClick={() => handleViewDetail(log.id)}>Lihat Detail</Button>
										</DialogTrigger>
										<DialogContent className="max-w-lg max-h-[90vh]">
											<DialogHeader>
												<DialogTitle>Detail Pembelian - {detailLog?.nomor_faktur}</DialogTitle>
												<DialogDescription>
													Transaksi dari <strong>{detailLog?.vendor.nama_vendor}</strong> pada <strong>{detailLog ? new Date(detailLog.tanggal_faktur).toLocaleString('id-ID') : ''}</strong>
												</DialogDescription>
											</DialogHeader>
											{isDetailLoading ? <div className="flex justify-center items-center h-40"><Loader2 className="animate-spin" /></div> : (
												<ScrollArea className="mt-4 h-[400px] pr-2 text-sm">
													<div className="space-y-2">
														<strong>Barang Dibeli:</strong>
														<ul className="list-disc ml-5 mt-2 space-y-1">
															{detailLog?.detail_faktur_pembelian.map(item => (
																<li key={item.id}>
																	{item.barang.nama_barang} (x{item.jumlah}) @ Rp{item.harga_beli.toLocaleString('id-ID')}
																	<br />
																	<span className="text-xs text-gray-500">Batch: {item.kode_batch || '-'} | Exp: {item.tanggal_kadaluarsa ? new Date(item.tanggal_kadaluarsa).toLocaleDateString('id-ID') : '-'}</span>
																</li>
															))}
														</ul>
													</div>
												</ScrollArea>
											)}
										</DialogContent>
									</Dialog>
									
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="destructive" size="sm" disabled={isPending}>
												<Trash2 size={14} />
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Hapus Faktur Pembelian?</AlertDialogTitle>
												<AlertDialogDescription>Aksi ini akan menghapus faktur dan mengembalikan stok yang telah ditambahkan. Aksi ini tidak dapat dibatalkan.</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Batal</AlertDialogCancel>
												<AlertDialogAction onClick={() => handleDelete(log.id)} className="bg-destructive hover:bg-destructive/90">
													{isPending ? 'Menghapus...' : 'Ya, Hapus'}
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</TableCell>
							</TableRow>
						)) : (
							<TableRow><TableCell colSpan={6} className="text-center py-10">Belum ada data pembelian.</TableCell></TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="mt-6 flex justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</>
	)
}