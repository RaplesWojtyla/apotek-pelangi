'use client'

import { Loader2, Package, ShoppingCart } from "lucide-react";
import { Product } from "@/action/customer/product.action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ItemForCheckout, useCartContext } from "@/context/CartContext";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ProductCard({ product, isFirst }: { product: Product; isFirst?: boolean }) {
	const router = useRouter()
	const { isSignedIn, isLoaded } = useUser()
	const { fetchAndUpdateCartCount, setCheckoutItemsHandler } = useCartContext()

	const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)
	const [isBuyingNow, setIsBuyingNow] = useState<boolean>(false)

	const handleDetail = (id: string) => {
		router.push(`/customer/catalog/${id}`)
	}

	const handleAddToCart = async () => {
		if (!isLoaded || (isLoaded && !isSignedIn)) {
			toast.error("Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.")
			return
		}

		setIsAddingToCart(true)

		try {
			const res = fetch('/api/customer/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idBarang: product.id,
					amount: 1,
					sumber: 'MANUAL'
				})
			}).then(async (res) => {
				if (!res.ok) {
					const err: any = await res.json().catch()

					throw new Error(err.error || 'Gagal menambahkan data ke dalam keranjang!')
				}

				await fetchAndUpdateCartCount(false)
				return res.json()
			})

			await toast.promise(res, {
				loading: "Menambahkan ke keranjang...",
				success: () => {
					router.refresh()

					return "Berhasil ditambahkan ke keranjang!"
				},
				error: (err: any) => err.message || "Gagal menambahkan ke keranjang!"
			}, {
				style: {
					minWidth: '250px'
				},
				success: {
					duration: 3000,
					icon: '🛒'
				},
				error: {
					duration: 4000,
					icon: '❌'
				}
			})

		} catch (error: any) {
			console.log(`[handleAddToCart] Error: ${error}`);
		} finally {
			setIsAddingToCart(false)
		}
	}

	const handleBuyNow = () => {
		if (!isLoaded || (isLoaded && !isSignedIn)) {
			toast.error("Anda harus login untuk membeli produk ini.")
			return
		}

		if (product.totalStock < 1) {
			toast.error("Stok produk telah habis.")
			return
		}

		setIsBuyingNow(true)

		const itemToCheckout: ItemForCheckout = {
			idCart: product.id,
			idBarang: product.id,
			namaBarang: product.nama_barang,
			fotoBarang: product.foto_barang,
			sumber: 'MANUAL',
			jumlah: 1,
			hargaJual: product.harga_jual,
			idResep: null,
			totalStock: product.totalStock,
		}

		setCheckoutItemsHandler([itemToCheckout])
		router.push('/customer/checkout')
	}

	const isDisabled = isAddingToCart || isBuyingNow || product.totalStock < 1 || !isLoaded

	return (
		<div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-between cursor-pointer hover:shadow-lg transition-all w-full min-h-[320px] relative group">
			{product.totalStock < 1 && (
				<div className="absolute top-0 left-0 w-full h-35 bg-black/60 flex items-center justify-center rounded-t-2xl z-10">
					<span className="text-white font-bold text-sm uppercase tracking-wide">
						Stok Habis
					</span>
				</div>
			)}

			<Image
				src={product.foto_barang.includes('https') ? product.foto_barang : `/${product.foto_barang}`}
				alt={product.nama_barang}
				className="object-contain mb-4 transition-transform group-hover:scale-105"
				onClick={() => handleDetail(product.id)}
				width={112}
				height={112}
			/>

			{/* Info Produk */}
			<div className="w-full text-center mb-4">
				<span
					className="text-[0.7rem] text-gray-400 uppercase tracking-wide mb-1 block"
					onClick={() => handleDetail(product.id)}
				>
					Untuk: {product.jenis_barang.nama_jenis}
				</span>

				<h3
					className="text-base font-semibold text-gray-800 dark:text-white leading-tight mb-1 truncate"
					onClick={() => handleDetail(product.id)}
					title={product.nama_barang}
				>
					{product.nama_barang}
				</h3>

				<p className="text-sm text-orange-600 font-medium mb-1">
					Rp {product.harga_jual.toLocaleString("id-ID")}
				</p>

				{/* Stok */}
				<div className="flex items-center justify-center gap-1 text-xs text-gray-500">
					<Package size={14} />
					<span>Stok: {product.totalStock.toLocaleString()}</span>
				</div>
			</div>

			{/* Tombol Aksi */}
			<div className="flex w-full gap-2">
				{/* Tombol Beli Sekarang */}
				<Button
					id={isFirst ? "tour-buy-now-button" : undefined}
					className="flex-1 bg-cyan-500 text-white text-xs md:text-sm rounded-lg hover:bg-cyan-600 transition-all disabled:opacity-50 px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
					onClick={handleBuyNow}
					disabled={isDisabled}
					title="Beli Sekarang"
				>
					{isBuyingNow ? (
						<>
							<Loader2 className="size-4 animate-spin" />
							Sedang proses...
						</>
					) : (
						<span className="block truncate">Beli Sekarang</span>
					)}
				</Button>

				{/* Tombol Keranjang */}
				<Button
					id={isFirst ? "tour-add-to-cart-button" : undefined}
					className="w-10 h-10 bg-white border border-cyan-500 rounded-lg hover:bg-cyan-50 text-cyan-600 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
					onClick={handleAddToCart}
					disabled={isDisabled}
				>
					{isAddingToCart ? (
						<Loader2 className="animate-spin w-4 h-4" />
					) : (
						<ShoppingCart size={16} />
					)}
				</Button>
			</div>
		</div>
	);
}
