'use client'

import SearchBar from "@/components/SearchBar";
import CatalogSidebar from "@/components/customer/CatalogSidebar";
import CatalogProducts from "@/components/customer/CatalogProduct";
import { useSearchParams } from "next/navigation";
import CatalogPagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { getCatalogTotalPages } from "@/action/product.action";
import toast from "react-hot-toast";

export default function page() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [totalPages, setTotalPages] = useState<number>(1)
	const searchParams = useSearchParams()
	const search = String(searchParams.get('matcher') ?? '')
	const page = Number(searchParams.get('page') ?? 1)
	const take: number = 8

	useEffect(() => {
		try {
			setIsLoading(true)
			const fetchTotalPages = async () => {
				const data = await getCatalogTotalPages(search, take)
				setTotalPages(data)
			}

			fetchTotalPages()
		} catch (error) {
			console.error(`[fetchTotalPages] Error: ${error}`);

			toast.error("Gagal memuat halaman katalog produk!")
		} finally {
			setIsLoading(false)
		}
	}, [search, page])

	return (
		<div className="flex bg-gray-100 min-h-screen">
			<CatalogSidebar />
			<div className="p-4 flex-1">
				<SearchBar />
				<h1 className="text-2xl font-bold mb-6">Semua Kategori</h1>
				<CatalogProducts
					search={search}
					currPage={page}
					take={take}
				/>
				<div className="flex justify-center my-6">
					{isLoading ? (
						<p className="animate-pulse">Loading...</p>
					) : (
						<CatalogPagination totalPages={totalPages} />
					)}
				</div>
			</div>
		</div>
	)
}
