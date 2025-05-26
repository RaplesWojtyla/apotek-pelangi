'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { CartItem } from "@/action/cart.action";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [selectedManualProductIds, setSelectedManualProductIds] = useState<Set<string>>(new Set())
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [activeTab, setActiveTab] = useState<string>("semua")
	const router = useRouter()

	const isCartItems = cartItems && cartItems.length > 0

	useEffect(() => {
		const fetchCart = async () => {
			setIsLoading(true)

			try {
				const res = await fetch('/api/cart')

				if (!res.ok) {
					const err = await res.json().catch(() => ({ message: "Terjadi Kesalahan Pada Server" }))
					console.error(`[fetchCart] ERROR: ${err.message || "Gagal memuat keranjang!"}`);

					setCartItems([])
					toast.error("Gagal memuat keranjang anda!", {
						duration: 3000,
						ariaProps: {
							role: 'status',
							"aria-live": 'polite'
						}
					})
				} else {
					const data: CartItem[] = await res.json()

					setCartItems(data)
				}
			} catch (error) {
				console.error(`[fetchCart] Error: ${error}`);
				setCartItems([])

				toast.error("Gagal memuat keranjang anda!", {
					duration: 3000,
					ariaProps: {
						role: 'status',
						"aria-live": 'polite'
					}
				})
			} finally {
				setIsLoading(false)
			}
		}

		fetchCart()
	}, [])

	const manualProducts: CartItem[] = isCartItems ? cartItems.filter(item => item.sumber === 'MANUAL') : []
	const availableManualProducts: CartItem[] = isCartItems ? manualProducts.filter(item => item.totalStock > 0) : []

	const resepProducts: CartItem[] = isCartItems ? cartItems.filter(item => item.sumber === 'RESEP') : []
	const availableResepProducts: CartItem[] = isCartItems ? resepProducts.filter(item => item.totalStock > 0) : []

	const handleToggleSelectManualProduct = (id: string) => {
		setSelectedManualProductIds(prev => {
			const newSelectedManualProductIds = new Set(prev)

			newSelectedManualProductIds.has(id) ? newSelectedManualProductIds.delete(id) : newSelectedManualProductIds.add(id)

			return newSelectedManualProductIds
		})
	}

	const handleSelectAllManualProducts = (checked: boolean) => {
		if (checked) {
			const allAvailableManualProducts = availableManualProducts.map(item => item.id)

			setSelectedManualProductIds(new Set(allAvailableManualProducts))
		} else {
			setSelectedManualProductIds(new Set())
		}
	}

	const handleAddAmountManualProduct = (id: string) => {
		setCartItems(prev =>
			prev.map(item => item.id === id ? ({
				...item,
				jumlah: item.jumlah + 1
			}) : item)
		)
	}

	const handleSubsAmountManualProduct = (id: string) => {
		setCartItems(prev =>
			prev.map(item => item.id === id ? ({
				...item,
				jumlah: item.jumlah - 1
			}) : item)
		)
	}

	const relevantManualProductsForSelectAll = (activeTab === 'semua' || activeTab === 'obat-satuan') ? availableManualProducts : []

	const isSelectAllChecked = relevantManualProductsForSelectAll.length > 0 &&
		relevantManualProductsForSelectAll.every(item => selectedManualProductIds.has(item.id))

	const isSelectAllDisabled = activeTab === 'obat-resep' || relevantManualProductsForSelectAll.length === 0

	const selectedManualSubTotal: number = Array.from(selectedManualProductIds).reduce((acc, id) => {
		const item = manualProducts.find(p => p.id === id)

		if (item && item.totalStock > 0) {
			return acc + item.jumlah * item.barang.harga_jual
		}

		return acc
	}, 0)

	const resepSubtotal: number = isCartItems
		? availableResepProducts.filter(item => item.totalStock > 0).reduce((acc, item) => acc + item.jumlah * item.barang.harga_jual, 0)
		: 0

	const grandTotal = selectedManualSubTotal + resepSubtotal
	const numOfSelectedManualProducts = selectedManualProductIds.size
	const numOfResepProduct = availableResepProducts.length
	const totalProductsToPay = numOfSelectedManualProducts + numOfResepProduct

	if (isLoading) return <p className="flex min-h-screen justify-center items-center gap-3"><Loader2 className="animate-spin size-5" /> Loading...</p>

	const renderCartItem = (item: CartItem) => (
		<div
			key={item.id}
			className={`relative flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 rounded-2xl border ${item.totalStock < 1
				? "bg-red-200 border-red-300"
				: "bg-white border-gray-300"
				} shadow-sm`}
		>
			{/* Tombol Hapus */}
			<button
				className="absolute top-3 right-3 text-red-500 hover:text-red-700"
			>
				<Trash2 className="w-5 h-5" />
			</button>

			{/* Kiri: Checkbox dan Gambar */}
			<div className="flex items-start sm:items-center flex-1">
				<Checkbox
					className="mr-4 mt-1 sm:mt-0 border-gray-400"
					checked={item.sumber === 'RESEP' ? item.totalStock > 0 : selectedManualProductIds.has(item.id)}
					onCheckedChange={item.sumber === 'MANUAL' ? () => handleToggleSelectManualProduct(item.id) : undefined}
					disabled={item.totalStock < 1 || item.sumber === 'RESEP'}
				/>
				<Image
					src={`/${item.barang.foto_barang}`}
					alt={item.barang.nama_barang}
					width={70}
					height={70}
					className="rounded-lg object-cover cursor-pointer"
					onClick={() => router.push(`/customer/catalog/${item.id_barang}`)}
				/>
				<div className="ml-4 sm:ml-6 cursor-pointer" onClick={() => router.push(`/customer/catalog/${item.id_barang}`)}>
					<h4 className="font-semibold text-base mb-1">{item.barang.nama_barang}</h4>
					<p className="text-sm text-gray-500">{item.barang.jenis_barang.kategori_barang.nama_kategori}</p>
					<span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${item.totalStock > 0 ? "bg-green-100 text-green-800" : "bg-red-700 text-white"}`}>
						{item.totalStock > 0 ? "Stok tersedia" : "Stok tidak tersedia"}
					</span>
				</div>
			</div>

			{/* Jumlah & Harga */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
				<div className="flex justify-between items-center w-full sm:w-auto">
					{/* kontrol jumlah */}
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="w-8 h-8 p-0 text-lg"
							disabled={item.sumber === 'RESEP' || item.totalStock < 1}
						>
							-
						</Button>
						<span className="font-semibold text-base">{item.jumlah}</span>
						<Button
							variant="outline"
							size="sm"
							className="w-8 h-8 p-0 text-lg"
							disabled={item.sumber === 'RESEP' || item.totalStock < 1}
						>
							+
						</Button>
					</div>

					{/* Harga */}
					<div className="text-base font-semibold whitespace-nowrap ml-4 sm:ml-6">
						Rp{(item.jumlah * item.barang.harga_jual).toLocaleString("id-ID")}
					</div>
				</div>
			</div>
		</div>

	)

	return (
		<div className="bg-white min-h-screen pt-12">
			<div className="max-w-7xl mx-auto px-6 py-4">
				<h1 className="text-3xl font-bold mb-6">Keranjang</h1>
				<Tabs defaultValue="semua" className="mb-6" onValueChange={setActiveTab}>
					<TabsList className="flex flex-wrap gap-2 w-full sm:w-[805px]">
						<TabsTrigger value="semua" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
							Semua
						</TabsTrigger>
						<TabsTrigger value="obat-satuan" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
							Obat Satuan
						</TabsTrigger>
						<TabsTrigger value="obat-resep" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
							Obat Resep
						</TabsTrigger>
					</TabsList>
					<div className="flex items-center justify-between mb-2 mt-2 lg:mr-103">
						<div className="flex items-center">
							<Checkbox
								id="select-all"
								checked={isSelectAllChecked}
								onCheckedChange={checked => handleSelectAllManualProducts(Boolean(checked))}
								disabled={isSelectAllDisabled}
							/>
							<label htmlFor="select-all" className="text-sm ml-2 font-medium">
								Pilih Semua
							</label>
						</div>
						<Button variant="ghost" className="text-red-500 text-sm font-medium">
							Hapus Semua
						</Button>
					</div>
					<TabsContent value="semua">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 space-y-4">
								{cartItems && cartItems.length > 0 ? (
									cartItems.map(item => renderCartItem(item))
								) : (
									<div className="h-full flex items-center justify-center">
										<p className="text-2xl">Keranjang anda masih kosong</p>
									</div>
								)}
							</div>

							{/* Subtotal */}
							<div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-4 sm:p-6 h-fit">
								<h4 className="font-semibold text-base">
									Sub Total ({numOfSelectedManualProducts + numOfResepProduct} Produk akan dibayar)
								</h4>
								<hr className="my-4" />
								{numOfSelectedManualProducts > 0 && (
									<div className="flex justify-between text-sm mb-1">
										<span>Obat Satuan ({numOfSelectedManualProducts} item):</span>
										<span className="font-medium">Rp {selectedManualSubTotal.toLocaleString("id-ID")}</span>
									</div>
								)}
								{numOfResepProduct > 0 && (
									<div className="flex justify-between text-sm mb-1">
										<span>Obat Resep ({numOfResepProduct} item):</span>
										<span className="font-medium">Rp {resepSubtotal.toLocaleString("id-ID")}</span>
									</div>
								)}
								<hr className="my-2" />
								<div className="flex justify-between text-base sm:text-lg mb-4">
									<span>Total Harga :</span>
									<span className="font-bold">Rp {grandTotal.toLocaleString("id-ID")}</span>
								</div>
								<Button
									className="w-full bg-black text-white text-sm font-semibold h-10 rounded-full"
									disabled={totalProductsToPay === 0}
								>
									Bayar Sekarang ({totalProductsToPay})
								</Button>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="obat-satuan">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 space-y-4">
								{manualProducts.length > 0 ? (
									manualProducts.map(item => renderCartItem(item))
								) : (
									<div className="h-full flex items-center justify-center">
										<p className="text-2xl">Keranjang anda masih kosong</p>
									</div>
								)}
							</div>

							{/* Subtotal */}
							<div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-4 sm:p-6 h-fit">
								<h4 className="font-semibold text-base">
									Sub Total ({numOfSelectedManualProducts} Produk)
								</h4>
								<hr className="my-4" />
								<div className="flex justify-between text-sm sm:text-base mb-4">
									<span>Total Harga :</span>
									<span className="font-bold">Rp {selectedManualSubTotal.toLocaleString("id-ID")}</span>
								</div>
								<Button className="w-full bg-black text-white text-sm font-semibold h-10 rounded-full">
									Bayar sekarang
								</Button>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="obat-resep">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 space-y-4">
								{resepProducts.length > 0 ? (
									resepProducts.map(item => renderCartItem(item))
								) : (
									<div className="h-full flex items-center justify-center">
										<p className="text-2xl">Keranjang anda masih kosong</p>
									</div>
								)}
							</div>

							{/* Subtotal */}
							<div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-4 sm:p-6 h-fit">
								<h4 className="font-semibold text-base">
									Sub Total ({numOfResepProduct} Produk)
								</h4>
								<hr className="my-4" />
								<div className="flex justify-between text-sm sm:text-base mb-4">
									<span>Total Harga :</span>
									<span className="font-bold">Rp{resepSubtotal.toLocaleString("id-ID")}</span>
								</div>
								<Button className="w-full bg-black text-white text-sm font-semibold h-10 rounded-full">
									Bayar sekarang
								</Button>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}