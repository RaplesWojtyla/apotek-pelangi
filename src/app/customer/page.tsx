'use client'

import Banner from "@/components/Banner";
import SkeletonCard from "@/components/SkeletonCard";
import SkeletonKategori from "@/components/SkeletonKategori";
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
			<SkeletonKategori />
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<SkeletonCard />
				</div>
			</section>
			<TebusResep />
		</div>
	);
}

