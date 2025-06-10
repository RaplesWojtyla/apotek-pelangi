'use client'

import { getProducts, Product } from "@/action/customer/product.action";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SkeletonCard from "@/components/skeleton/SkeletonCard";

const CatalogProducts = ({
	search, currPage, take, jenisId
}: {
	search: string, currPage: number, take: number, jenisId: string
}) => {
	const [products, setProducts] = useState<Product[]>([])
	const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true)

	useEffect(() => {
		const fetchProducts = async () => {
			setIsFetchingProducts(true)

			try {
				const data = await getProducts({ matcher: search, page: currPage, take: take, id_jenis_barang: jenisId })

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
	}, [search, currPage, jenisId])

	if (isFetchingProducts) return <SkeletonCard />

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{products.length > 0 ?
				products.map(product => (
					<ProductCard key={product.id} product={product} />
				)) : (
					<div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
						<svg
							className="w-16 h-16 text-gray-400 mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
							></path>
						</svg>

						<h3 className="text-lg font-semibold text-gray-700 mb-1">
							Oops! Produk Tidak Ditemukan!
						</h3>
						<p className="text-sm text-gray-500">
							Sepertinya tidak ada data untuk ditampilkan saat ini.
						</p>
					</div>
				)
			}
		</div>
	)
};

export default CatalogProducts;
