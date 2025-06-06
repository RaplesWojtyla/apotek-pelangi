'use client'

import { ShoppingCart } from "lucide-react";
import { Product } from "@/action/product.action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: (product: Product) => void }) {
	const router = useRouter()

	const handleDetail = (id: string) => {
		router.push(`/customer/catalog/${id}`)
	}


	function handleAddToCartClick() {
		onAddToCart(product);
		toast.success("Berhasil ditambahkan ke keranjang!", {
			duration: 3000,
			icon: '🛒'
		});

	}

	return (
		<div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition h-72 w-full">

			{/* Gambar */}
			<img
				src={`/${product.foto_barang}`}
				alt={product.nama_barang}
				className="w-24 h-24 object-contain mb-2"
				onClick={() => handleDetail(product.id)}
			/>

			{/* Label jenis */}
			<span
				className="text-xs text-gray-500 mb-1 text-center"
				onClick={() => handleDetail(product.id)}
			>
				Untuk: {product.jenis_barang.nama_jenis}
			</span>

			{/* Nama */}
			<h3
				className="text-sm font-medium text-center mb-1 text-black text-ellipsis overflow-hidden whitespace-nowrap w-full"
				onClick={() => handleDetail(product.id)}
			>
				{product.nama_barang}
			</h3>

			{/* Harga */}
			<p className="text-sm text-gray-700 mb-3 text-center">Rp {product.harga_jual.toLocaleString('id-ID')}</p>

			{/* Tombol beli + keranjang */}
			<div className="w-full mt-auto">
				<Button
					className="w-full flex items-center justify-center gap-2 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
					onClick={handleAddToCartClick}
				>
					<ShoppingCart size={16} />
				</Button>
			</div>
		</div>
	);
}