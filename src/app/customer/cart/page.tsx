'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { CartItem } from "@/action/customer/cart.action";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ItemForCheckout, useCartContext } from "@/context/CartContext";
import { SkeletonCart } from "@/components/skeleton/SkeletonCart";
import { SumberCart } from "@prisma/client";

export default function CartPage() {
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [selectedManualProductIds, setSelectedManualProductIds] = useState<Set<string>>(new Set())
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isUpdating, setIsUpdating] = useState<string | null>(null)
	const [activeTab, setActiveTab] = useState<string>("semua")
	const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false)
	const { fetchAndUpdateCartCount, setCheckoutItemsHandler } = useCartContext()
	const router = useRouter()

	const isCartItems = cartItems && cartItems.length > 0

	const fetchCart = useCallback(async (showLoadingIndicator = true) => {
		if (showLoadingIndicator) setIsLoading(true)

		try {
			const res = await fetch('/api/customer/cart')

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
			if (showLoadingIndicator) setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCart()
	}, [fetchCart])

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

	const handleUpdateQty = async (cartItemId: string, newQty: number) => {
		if (newQty < 0) return
		setIsUpdating(cartItemId)

		const oriItem = cartItems.find(item => item.id === cartItemId)

		if (!oriItem) return;

		const oriQty = oriItem.jumlah

		if (newQty > 0) {
			setCartItems(prevItems =>
				prevItems.map(item => item.id === cartItemId ? {
					...item,
					jumlah: newQty
				} : item)
			)
		} else {
			setCartItems(prevItems =>
				prevItems.filter(item => item.id !== cartItemId)
			)
		}

		try {
			const res = await fetch(`/api/customer/cart?id=${cartItemId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ newQuantity: newQty })
			})

			if (!res.ok) {
				const err = await res.json().catch(() => ({
					message: "Gagal mengubah kuantitas"
				}))

				if (newQty > 0) {
					setCartItems(prevItems =>
						prevItems.map(item => item.id === cartItemId ? {
							...item,
							jumlah: oriQty
						} : item)
					)
				} else {
					if (oriItem) {
						setCartItems(prevItems => [
							...prevItems,
							oriItem
						].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
					}
				}

				toast.error(err.message || "Gagal mengubah kuantitas produk")
			} else {
				if (newQty === 0) {
					toast.success("Item berasil dihapus.")

					fetchCart(false)
				} else {
					toast.success("Kuantitas berhasil diubah")

					const updatedItem = await res.json()
					setCartItems(prevItems =>
						prevItems.map(item => item.id === cartItemId ? {
							...item,
							...updatedItem,
							totalStock: oriItem.totalStock
						} : item)
					)
				}
			}
		} catch (error) {
			console.error("[handleUpdateQuantity] Error:", error)
			toast.error("Terjadi kesalahan saat mengubah kuantitas.")

			if (newQty > 0) {
				setCartItems(prevItems =>
					prevItems.map(item => item.id === cartItemId ? {
						...item,
						jumlah: oriQty
					} : item)
				)
			} else {
				if (oriItem) setCartItems(prevItems => [
					...prevItems,
					oriItem
				].sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
			}
		} finally {
			setIsUpdating(null)
		}
	}

	const handleDeleteItem = async (cartItemId: string) => {
		setIsUpdating(cartItemId)
		const oriCartItems = [...cartItems]

		setCartItems(prevItems =>
			prevItems.filter(item => item.id !== cartItemId)
		)

		setSelectedManualProductIds(prevSelected => {
			const newSelected = new Set(prevSelected)
			newSelected.delete(cartItemId)

			return newSelected
		})

		try {
			const res = await fetch(`/api/customer/cart?id=${cartItemId}`, { method: 'DELETE' })

			if (!res.ok) {
				const err = await res.json().catch((e) => (
					{ message: 'Gagal menghapus item' }
				))

				toast.error(err.message || "Gagal menghapus item.")
				setCartItems(oriCartItems)
			} else {
				fetchAndUpdateCartCount()
				fetchCart(false)
				toast.success("Item berhasil dihapus!")
			}
		} catch (error: any) {
			console.error(`[handleDeleteItem] Error: ${error}`)
			toast.error(error.error || "Terjadi kesalahan saat menghapus item.")
			setCartItems(oriCartItems)
		} finally {
			setIsUpdating(null)
		}
	}

	const handleDeleteSelectedItems = async () => {
		if (selectedManualProductIds.size === 0) {
			toast.error("Tidak ada produk untuk yang dipilih untuk dihapus")
			return
		}

		setIsLoading(true)
		const deleteProductIds = Array.from(selectedManualProductIds)
		const oriCartItems = [...cartItems]
		const oriSelectedProducts: Set<string> = new Set(selectedManualProductIds)

		setCartItems(prevItems => prevItems.filter(item => !deleteProductIds.includes(item.id)))
		setSelectedManualProductIds(new Set())

		try {
			const res = await fetch('/api/customer/cart', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ids: deleteProductIds })
			})

			if (!res.ok) {
				const err = await res.json().catch()

				toast.error(err.error || "Gagal menghapus item terpilih.")
				setCartItems(oriCartItems)
				setSelectedManualProductIds(oriSelectedProducts)
			} else {
				fetchAndUpdateCartCount()
				fetchCart(false)
				toast.success(`${deleteProductIds.length} item berhasil dihapus.`)
			}
		} catch (error: any) {
			console.error(`[handleDeleteSelectedItems] Error: ${error}`)
			toast.error(error.message || "Terjadi kesalahan saat menghapus item terpilih")

			setCartItems(oriCartItems)
			setSelectedManualProductIds(oriSelectedProducts)
		} finally {
			setIsLoading(false)
		}
	}

	const handleProceedToChecout = () => {
		setIsCheckoutLoading(true)
		let checkoutItemsContext: ItemForCheckout[] = []

		let sumber: SumberCart
		if (activeTab === 'semua' || activeTab === 'obat-satuan') sumber = 'MANUAL'
		else sumber = 'RESEP'

		const transformToCheckoutItem = ((item: CartItem): ItemForCheckout => ({
			idCart: item.id,
			idBarang: item.id_barang,
			namaBarang: item.barang.nama_barang,
			jumlah: item.jumlah,
			hargaJual: item.barang.harga_jual,
			fotoBarang: item.barang.foto_barang,
			sumber: sumber,
			idResep: item.id_resep,
			totalStock: item.totalStock
		}))

		if (activeTab === 'semua') {
			const manualItems = availableManualProducts.filter(
				item => selectedManualProductIds.has(item.id)
			).map(transformToCheckoutItem)

			const resepItems = availableResepProducts.map(transformToCheckoutItem)

			checkoutItemsContext = [...manualItems, ...resepItems]
		} else if (activeTab === 'obat resep') {
			checkoutItemsContext = availableManualProducts.filter(
				item => selectedManualProductIds.has(item.id)
			).map(transformToCheckoutItem)
		} else if (activeTab === 'obat-resep') {
			checkoutItemsContext = availableResepProducts.map(transformToCheckoutItem)
		}

		if (checkoutItemsContext.length === 0) {
			toast.error("Tidak ada produk yang dipilih untuk di-checkout.");
			setIsCheckoutLoading(false)
			return
		}

		setCheckoutItemsHandler(checkoutItemsContext)

		router.push('/customer/checkout')
		setIsCheckoutLoading(false)
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

	let productsToPayCount = 0
	let currGrandTotal = 0

	if (activeTab === 'semua') {
		productsToPayCount = selectedManualProductIds.size + availableResepProducts.length
		currGrandTotal = selectedManualSubTotal + resepSubtotal
	} else if (activeTab === 'obat-satuan') {
		productsToPayCount = selectedManualProductIds.size
		currGrandTotal = selectedManualSubTotal
	} else if (activeTab === 'obat-resep') {
		productsToPayCount = availableResepProducts.length
		currGrandTotal = resepSubtotal
	}

	// if (isLoading) return <p className="flex min-h-screen justify-center items-center gap-3"><Loader2 className="animate-spin size-5" /> Loading...</p>

	const renderCartItem = (item: CartItem) => (
		<div
			key={item.id}
			className={`
				relative flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 rounded-2xl border shadow-sm 
				${item.totalStock < 1 ? "bg-red-200 border-red-300" : "bg-white border-gray-300"}
				${isUpdating === item.id ? "opacity-50" : ''}
			`}
		>
			{/* Tombol Hapus */}
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant={'link'}
						className="absolute top-1 right-1 text-red-500 hover:text-red-700 cursor-pointer"
					>
						<Trash2 className="size-5" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Yakin ingin menghapus produk berikut?</AlertDialogTitle>
						<AlertDialogDescription>Aksi ini tidak dapat dihentikan dan produk akan langsung hilang dari keranjang anda.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
						<Button
							variant={'destructive'}
							className="hover:bg-red-700 cursor-pointer"
							onClick={() => handleDeleteItem(item.id)}
							asChild
						>
							<AlertDialogAction>Hapus</AlertDialogAction>
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Kiri: Checkbox dan Gambar */}
			<div className="flex items-start sm:items-center flex-1">
				<Checkbox
					className="mr-4 mt-1 sm:mt-0 border-gray-400 cursor-pointer"
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
							className="w-8 h-8 p-0 text-lg text-center cursor-pointer"
							onClick={() => handleUpdateQty(item.id, item.jumlah - 1)}
							disabled={item.sumber === 'RESEP' || item.totalStock < 1 || item.jumlah < 2 || isUpdating === item.id}
						>
							-
						</Button>
						<span className="font-semibold text-base">{item.jumlah}</span>
						<Button
							variant="outline"
							size="sm"
							className="w-8 h-8 p-0 text-lg text-center cursor-pointer"
							onClick={() => handleUpdateQty(item.id, item.jumlah + 1)}
							disabled={item.sumber === 'RESEP' || item.totalStock < 1 || item.jumlah + 1 > item.totalStock || isUpdating === item.id}
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
						<TabsTrigger value="semua" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer">
							Semua
						</TabsTrigger>
						<TabsTrigger value="obat-satuan" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer">
							Obat Satuan
						</TabsTrigger>
						<TabsTrigger value="obat-resep" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-white cursor-pointer">
							Obat Resep
						</TabsTrigger>
					</TabsList>
					<div className="flex items-center justify-between mb-2 mt-2 lg:mr-103">
						<div className="flex items-center">
							<Checkbox
								id="select-all"
								className="cursor-pointer"
								checked={isSelectAllChecked}
								onCheckedChange={checked => handleSelectAllManualProducts(Boolean(checked))}
								disabled={isSelectAllDisabled || isLoading}
							/>
							<label htmlFor="select-all" className="text-sm ml-2 font-medium cursor-pointer">
								{activeTab === "obat-resep"
									? "Obat Resep Wajib Dipilih Semua"
									: `Pilih Semua Obat Satuan ${availableManualProducts.length > 0
										? `(${selectedManualProductIds.size}/${availableManualProducts.length})`
										: '(Tidak Ada)'}`
								}
							</label>
						</div>
						{selectedManualProductIds.size > 0 && (activeTab === 'semua' || activeTab === 'obat-satuan') && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant={"ghost"}
										className="text-red-500 under hover:text-red-700 hover:bg-red-300 text-sm font-medium transition ease-linear duration-300 cursor-pointer"
										disabled={isLoading}
									>
										Hapus ({selectedManualProductIds.size}) item terpilih
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Konfirmasi</AlertDialogTitle>
										<AlertDialogDescription>Apakah anda yakin menghapus {selectedManualProductIds.size} item tersebut dari keranjang anda?</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Batal</AlertDialogCancel>
										<Button
											variant={"destructive"}
											className="hover:bg-red-700 transition duration-300"
											onClick={handleDeleteSelectedItems}
											disabled={isLoading}
											asChild
										>
											<AlertDialogAction>Hapus</AlertDialogAction>
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>

					{isLoading ? (
						<SkeletonCart />
					) : (
						<>
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
											Sub Total ({productsToPayCount} Produk akan dibayar)
										</h4>
										<hr className="my-4" />
										{selectedManualProductIds.size > 0 && (
											<div className="flex justify-between text-sm mb-1">
												<span>Obat Satuan ({selectedManualProductIds.size} item):</span>
												<span className="font-medium">Rp {selectedManualSubTotal.toLocaleString("id-ID")}</span>
											</div>
										)}
										{resepProducts.length > 0 && (
											<div className="flex justify-between text-sm mb-1">
												<span>Obat Resep ({resepProducts.length} item):</span>
												<span className="font-medium">Rp {resepSubtotal.toLocaleString("id-ID")}</span>
											</div>
										)}
										<hr className="my-2" />
										<div className="flex justify-between text-base sm:text-lg mb-4">
											<span>Total Harga :</span>
											<span className="font-bold">Rp {currGrandTotal.toLocaleString("id-ID")}</span>
										</div>
										<Button
											className="w-full text-white text-sm font-semibold h-10 rounded-full cursor-pointer"
											onClick={handleProceedToChecout}
											disabled={currGrandTotal === 0 || isCheckoutLoading}
										>
											{isCheckoutLoading && <Loader2 className="size-4 animate-spin" />} Bayar Sekarang
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
											Sub Total ({selectedManualProductIds.size} Produk)
										</h4>
										<hr className="my-4" />
										<div className="flex justify-between text-sm sm:text-base mb-4">
											<span>Total Harga :</span>
											<span className="font-bold">Rp {selectedManualSubTotal.toLocaleString("id-ID")}</span>
										</div>
										<Button
											variant={'default'}
											className="w-full text-white text-sm font-semibold h-10 rounded-full"
											onClick={() => router.push('/customer/checkout')}
											disabled={selectedManualProductIds.size === 0 || selectedManualSubTotal === 0 || isCheckoutLoading}
										>
											{isCheckoutLoading && <Loader2 className="size-4 animate-spin" />} Bayar sekarang
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
											Sub Total ({availableResepProducts.length} Produk)
										</h4>
										<hr className="my-4" />
										<div className="flex justify-between text-sm sm:text-base mb-4">
											<span>Total Harga :</span>
											<span className="font-bold">Rp{resepSubtotal.toLocaleString("id-ID")}</span>
										</div>
										<Button
											className="w-full text-white text-sm font-semibold h-10 rounded-full"
											onClick={() => router.push('/customer/checkout')}
											disabled={availableResepProducts.length === 0 || isCheckoutLoading}
										>
											{isCheckoutLoading && <Loader2 className="size-4 animate-spin" />} Bayar sekarang
										</Button>
									</div>
								</div>
							</TabsContent>
						</>
					)}
				</Tabs>
			</div>
		</div>
	);
}