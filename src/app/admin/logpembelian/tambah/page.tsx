'use client'

import React, { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2, Trash2 } from 'lucide-react'
import { recordPurchaseInvoice, getVendors, searchProducts, PurchaseItemPayload } from '@/action/admin/purchase.action'
import { type Vendor, type Barang } from '@prisma/client'
import { useDebouncedCallback } from 'use-debounce'


interface FormItem extends PurchaseItemPayload {
	nama_barang: string
}

export default function TambahLogPembelianPage() {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [isSearch, startSearch] = useTransition()

	const [vendors, setVendors] = useState<Vendor[]>([])
	const [searchedProducts, setSearchedProducts] = useState<Barang[]>([])
	const [searchedProductsNotFound, setSearchedProductsNotFound] = useState<boolean>(false)

	const [vendorId, setVendorId] = useState('')
	const [nomorFaktur, setNomorFaktur] = useState('')
	const [tanggalFaktur, setTanggalFaktur] = useState('')
	const [items, setItems] = useState<FormItem[]>([])
	const [searchTerm, setSearchTerm] = useState('')


	useEffect(() => {
		const fetchVendor = async () => {
			const res = await getVendors()

			if (res.success) {
				setVendors(res.data)
			} else {
				toast.error(res.message)
				setVendors([])
			}
		}

		fetchVendor()
	}, [])


	const handleSearch = useDebouncedCallback((searchTerm: string) => {
		if (searchTerm.length > 0) {
			startSearch(async () => {
				const res = await searchProducts(searchTerm)

				setSearchedProducts(res)
				setSearchedProducts(res)

				if (res.length > 0) {
					setSearchedProductsNotFound(false)
				} else {
					setSearchedProductsNotFound(true)
				}
			})
		} else {
			setSearchedProducts([])
		}
	}, 300)

	useEffect(() => {
		handleSearch(searchTerm.trim())
	}, [searchTerm])


	const handleAddItem = (product: Barang) => {
		if (items.some(item => item.id_barang === product.id)) {
			toast.error("Produk sudah ada di dalam daftar.")
			return
		}
		setItems([...items, {
			id_barang: product.id,
			nama_barang: product.nama_barang,
			jumlah: 1,
			harga_beli: 0,
			kode_batch: '',
			tanggal_kadaluarsa: (() => {
				const now = new Date()
				now.setMonth(now.getMonth() + 3)

				return now
			})()
		}])
		setSearchTerm('')
		setSearchedProducts([])
	}

	const handleItemChange = (index: number, field: keyof FormItem, value: any) => {
		const newItems = [...items]
		const item = newItems[index]

		if (field === 'jumlah' || field === 'harga_beli') {
			(item[field] as number) = Number(value)
		} else if (field === 'tanggal_kadaluarsa') {
			(item[field] as Date | null) = value ? new Date(value) : null
		} else {
			(item[field] as string) = value
		}
		setItems(newItems)
	}

	const handleRemoveItem = (index: number) => {
		setItems(items.filter((_, i) => i !== index))
	}

	const handleSubmit = () => {
		if (!vendorId || !nomorFaktur || !tanggalFaktur || items.length === 0) {
			toast.error("Harap lengkapi informasi faktur dan tambahkan minimal satu item.")
			return
		}

		startTransition(async () => {
			const payload = {
				nomor_faktur: nomorFaktur,
				id_vendor: vendorId,
				tanggal_faktur: new Date(tanggalFaktur),
				items: items.map(({ nama_barang, ...rest }) => rest),
				pajak: 0,
			}

			const result = await recordPurchaseInvoice(payload)

			if (result.success) {
				toast.success(result.message)
				router.push('/admin/logpembelian')
			} else {
				toast.error(result.message)
			}
		})
	}

	const subtotal = items.reduce((acc, item) => acc + (item.harga_beli * item.jumlah), 0)

	return (
		<div className="p-6 bg-background text-foreground min-h-screen">
			<div className="mb-6 text-sm text-muted-foreground">
				<Link href="/admin/logpembelian" className="hover:underline">Log Pembelian </Link>
				&gt; <span className="text-foreground font-medium">Catat Pembelian Baru</span>
			</div>
			<h1 className="text-3xl font-bold mb-8">Catat Faktur Pembelian</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Kolom Kiri: Info Faktur & Total */}
				<div className="lg:col-span-1 space-y-6">
					<div className="p-6 bg-card rounded-xl shadow-sm border">
						<h2 className="text-lg font-semibold mb-4">Informasi Faktur</h2>
						<div className="space-y-4">
							<div>
								<Label htmlFor="nomorFaktur" className='mb-2'>No. Faktur Vendor</Label>
								<Input
									placeholder='Contoh: FP-20250614-VND003-0012'
									id="nomorFaktur"
									value={nomorFaktur}
									onChange={e => setNomorFaktur(e.target.value)}
									required
								/>
							</div>
							<div>
								<Label htmlFor="vendorId" className='mb-2'>Vendor</Label>
								<Select onValueChange={setVendorId} value={vendorId} required>
									<SelectTrigger>
										<SelectValue placeholder="Pilih Vendor" />
									</SelectTrigger>
									<SelectContent>
										{vendors.map(v => <SelectItem key={v.id} value={v.id}>{v.nama_vendor}</SelectItem>)}
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label htmlFor="tanggalFaktur" className='mb-2'>Tanggal Faktur</Label>
								<Input id="tanggalFaktur" type="date" value={tanggalFaktur} onChange={e => setTanggalFaktur(e.target.value)} required />
							</div>
						</div>
					</div>
					<div className="p-6 bg-card rounded-xl shadow-sm border sticky top-24">
						<h2 className="text-lg font-semibold mb-4">Ringkasan</h2>
						<div className="flex justify-between text-lg font-bold">
							<span>Total</span>
							<span>Rp{subtotal.toLocaleString('id-ID')}</span>
						</div>
						<Button onClick={handleSubmit} disabled={isPending} className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white gap-2">
							{isPending && <Loader2 className="w-4 h-4 animate-spin" />}
							Simpan Faktur Pembelian
						</Button>
					</div>
				</div>

				{/* Kolom Kanan: Detail Item */}
				<div className="lg:col-span-2 space-y-6">
					<div className="p-6 bg-card rounded-xl shadow-sm border">
						<h2 className="text-lg font-semibold mb-4">Detail Barang</h2>
						<div className="relative mb-4">
							<Label htmlFor="searchProduct" className='mb-2'>Cari Produk untuk Ditambahkan</Label>
							<Input
								id="searchProduct"
								placeholder="Ketik nama produk..."
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
							{isSearch ? (
								<div className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
									<div className="p-2 hover:bg-gray-100 cursor-progress animate-pulse">
										Sedang mencari...
									</div>
								</div>
							) : (
								searchedProducts.length > 0 ? (
									<div className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
										{searchedProducts.map(p => (
											<div
												key={p.id}
												onClick={() => handleAddItem(p)}
												className="p-2 hover:bg-gray-100 cursor-pointer"
											>
												{p.nama_barang}
											</div>
										))}
									</div>
								) : (
									searchedProductsNotFound && (
										<div className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
											<div className="p-2 hover:bg-gray-100 cursor-default">
												Produk tidak ditemukan. {" "}
												<Link
													href={'/admin/daftarobat/tambah'}
													className='underline'
												>
													Tambah produk
												</Link>
											</div>
										</div>
									)
								)
							)}
						</div>

						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="min-w-[200px]">Nama Produk</TableHead>
										<TableHead>Jumlah</TableHead>
										<TableHead>Harga Beli/satuan</TableHead>
										<TableHead>Kode Batch</TableHead>
										<TableHead>Kadaluarsa</TableHead>
										<TableHead>Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{items.length > 0 ? items.map((item, index) => (
										<TableRow key={item.id_barang}>
											<TableCell>
												{item.nama_barang}
											</TableCell>
											<TableCell>
												<Input
													type="number"
													min={1}
													value={item.jumlah}
													onChange={e => handleItemChange(index, 'jumlah', e.target.value)}
													className="w-20"
												/>
											</TableCell>
											<TableCell>
												<Input
													type="number"
													min={1000}
													step={1000}
													value={item.harga_beli}
													onChange={e => handleItemChange(index, 'harga_beli', e.target.value)}
													className="w-32"
												/>
											</TableCell>
											<TableCell>
												<Input
													placeholder='CTH001'
													value={item.kode_batch || ''}
													onChange={e => handleItemChange(index, 'kode_batch', e.target.value)}
													className="w-32"
												/>
											</TableCell>
											<TableCell>
												<Input
													type="date"
													value={item.tanggal_kadaluarsa ? new Date(item.tanggal_kadaluarsa).toISOString().split('T')[0] : ''}
													onChange={e => handleItemChange(index, 'tanggal_kadaluarsa', e.target.value)}
													className="w-40"
												/>
											</TableCell>
											<TableCell>
												<Button variant="destructive" size="icon" onClick={() => handleRemoveItem(index)}>
													<Trash2 size={16} />
												</Button>
											</TableCell>
										</TableRow>
									)) : (
										<TableRow>
											<TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Belum ada item ditambahkan</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}