'use client'

import AppSidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import ProductPagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { ProductDetail } from "@/action/product.action";

export default function Catalog() {
	const [page, setPage] = useState<number>(1)
	const [search, setSearch] = useState<string>("")
	const [products, setProducts] = useState<ProductDetail[]>([])

	useEffect(() => {
		const load = async () => {
			const res = await fetch(`/api/product?page=${page}&search=${encodeURIComponent(search)}`)

			if (!res.ok) throw new Error("Gagal mengambil data produk.")

			const data: ProductDetail[] = await res.json()

			setProducts(data)
		}

		load()
	}, [page, search])


	return (
		<div className="bg-gray-100 min-h-screen">
			{/* Sidebar Fixed Desktop */}
			<AppSidebar />

			{/* Content Wrapper */}
			<div className="lg:ml-64">
				{/* Main Content */}
				<main className="p-4">
					<h1 className="text-2xl font-bold mb-6">Semua Kategori</h1>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{products.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
					<ProductPagination />
				</main>
			</div>
		</div>
	);
}
