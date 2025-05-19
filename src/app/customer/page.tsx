'use client'

import Banner from "@/components/Banner";
import Kategori from "@/components/Kategori";
import ProductCard from "@/components/ProductCard";
import TebusResep from "@/components/TebusResep";
import { ProductDetail } from "@/action/product.action";
import { useEffect, useState } from "react";

export default function CustomerPage() {
	const [products, setProducts] = useState<ProductDetail[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/product')

			if (!res.ok) throw new Error("Gagal mengambil data obat")

			const data: ProductDetail[] = await res.json()

			setProducts(data)
		}

		fetchData()
	}, [])

	return (
		<div className="flex flex-col">
			<Banner />
			<Kategori />
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{products.map((product, i) => (
							<ProductCard key={i} product={product} />
						))}
					</div>
				</div>
			</section>
			<TebusResep />
		</div>
	);
}

