'use client'

import { getProducts, Product } from "@/action/product.action";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonCard from "@/components/skeleton/SkeletonCard";

const CatalogProducts = ({ 
	search, currPage, take 
}: { 
	search: string, currPage: number, take: number 
}) => {
	const [products, setProducts] = useState<Product[]>([])
	const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true)
	//const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)

	useEffect(() => {
		const fetchProducts = async () => {
			setIsFetchingProducts(true)

			try {
				const data = await getProducts({ matcher: search, page: currPage, take: take })

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
				setIsFetchingProducts(false)
			}
		}

		fetchProducts()
	}, [search, currPage])

	if (isFetchingProducts) return <SkeletonCard />

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
};

export default CatalogProducts;
