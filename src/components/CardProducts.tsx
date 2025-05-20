'use client'

import React from "react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ProductDetail } from "@/action/product.action";

const CardProducts = () => {
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
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
};

export default CardProducts;
