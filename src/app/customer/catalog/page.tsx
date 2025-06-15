'use client'

import SearchBar from "@/components/SearchBar";
import CatalogSidebar from "@/components/customer/CatalogSidebar";
import CatalogProducts from "@/components/customer/CatalogProduct";
import { useSearchParams } from "next/navigation";
import CatalogPagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { getCatalogTotalPages } from "@/action/customer/product.action";
import toast from "react-hot-toast";
import Link from "next/link";
import CustomerCatalogTour from "@/components/customer/CustomerCatalogTour";

export default function page() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [totalPages, setTotalPages] = useState<number>(1)
	const searchParams = useSearchParams()

	const search = String(searchParams.get('matcher') ?? '')
	const page = Number(searchParams.get('page') ?? 1)
	const jenisId = searchParams.get("jenisId") ?? ""
	const jenisNama = searchParams.get("jenisNama") ?? ""
	const kategoriNama = searchParams.get("kategoriNama") ?? ""
	const take: number = 8

	useEffect(() => {
		try {
			setIsLoading(true)
			const fetchTotalPages = async () => {
				const data = await getCatalogTotalPages(search, take, jenisId)
				setTotalPages(data)
			}

			fetchTotalPages()
		} catch (error) {
			console.error(`[fetchTotalPages] Error: ${error}`);

			toast.error("Gagal memuat halaman katalog produk!")
		} finally {
			setIsLoading(false)
		}
	}, [search, page, jenisId])

	return (
		<div className="flex bg-gray-100 min-h-screen">
			<CustomerCatalogTour />
			<CatalogSidebar />
			<div className="p-4 flex-1">
				<SearchBar />
				{jenisId && jenisNama ? (
					<h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
						<Link
							href={'/customer/catalog'}
							className="text-gray-500 hover:underline"
						>
							Semua Kategori
						</Link>
						<span className="mx-2 text-gray-400">&gt;</span>
						<span className="text-gray-500">{kategoriNama}</span>
						<span className="mx-2 text-gray-400">&gt;</span>
						<span className="text-primary">{jenisNama}</span>
					</h1>
				) : (
					<h1 className="text-2xl font-bold mb-6 text-gray-800">Semua Kategori</h1>
				)}
				<CatalogProducts
					search={search}
					currPage={page}
					take={take}
					jenisId={jenisId}
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
