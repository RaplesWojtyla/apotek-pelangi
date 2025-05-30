'use client'

import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { Product } from "@/action/product.action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartContext } from "@/context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
	const router = useRouter()
	const { fetchAndUpdateCartCount } = useCartContext()
	const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)

	const handleDetail = (id: string) => {
		router.push(`/customer/catalog/${id}`)
	}

	const handleAddToCart = async () => {
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

		} catch (error) {
			console.log(`[handleAddToCart] Error: ${error}`);
		} finally {
			setIsAddingToCart(false)
		}
	}

	return (
		<div
			className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer"
		>
			{/* Icon hati */}
			<button className="absolute top-3 right-3 text-cyan-500 hover:text-cyan-600">
				<Heart size={18} />
			</button>

			{/* Gambar */}
			<img
				src={`/${product.foto_barang}`}
				alt={product.nama_barang}
				className="w-24 h-24 object-contain mb-4"
				onClick={() => handleDetail(product.id)}
			/>

			{/* Label jenis */}
			<span
				className="text-xs text-gray-500 mb-1"
				onClick={() => handleDetail(product.id)}
			>
				Untuk: {product.jenis_barang.nama_jenis}
			</span>

			{/* Nama */}
			<h3
				className="text-sm font-medium text-center mb-1"
				onClick={() => handleDetail(product.id)}
			>
				{product.nama_barang}
			</h3>

			{/* Harga */}
			<p className="text-sm text-gray-700 mb-3">Rp {product.harga_jual.toLocaleString('id-ID')}</p>

			{/* Tombol beli + keranjang */}
			<div className="flex w-full gap-2">
				<Button
					className="flex-1 bg-cyan-500 text-white text-sm rounded-md hover:bg-cyan-600 cursor-pointer"
					disabled={isAddingToCart}
				>
					Beli Sekarang
				</Button>
				<Button
					className="bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600 cursor-pointer"
					onClick={handleAddToCart}
					disabled={isAddingToCart}
				>
					{isAddingToCart ? (
						<Loader2 className="animate-spin" />
					) : (
						<ShoppingCart size={16} />
					)}
				</Button>
			</div>
		</div>
	);
}
