'use client'

import { getProducts, Product } from "@/action/product.action";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonCard from "../SkeletonCard";

const CatalogProducts = ({ search, currPage }: { search: string, currPage: number }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getProducts({matcher: search, page: currPage})

				setProducts(data)
			} catch (error) {
				console.error(`Error: ${error}`)

				toast.error("Gagal mengambil data product", {
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

		fetchProducts()
	}, [])

	if (isLoading) return <SkeletonCard />

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
};

export default CatalogProducts;
