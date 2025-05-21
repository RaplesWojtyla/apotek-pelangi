'use client'

import ProductPagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import CatalogSidebar from "@/components/customer/CatalogSidebar";
import CatalogProducts from "@/components/customer/CatalogProduct";
import { useSearchParams } from "next/navigation";

export default function page() {
	const searchParams = useSearchParams()
	const search = String(searchParams.get('search') ?? '')
	const page = Number(searchParams.get('page') ?? 1)

	return (
		<div className="flex bg-gray-100 min-h-screen">
			<CatalogSidebar />
			<div className="p-4 flex-1">
				<SearchBar />
				<h1 className="text-2xl font-bold mb-6">Semua Kategori</h1>
				<CatalogProducts search={search} currPage={page} />
				<ProductPagination />
			</div>
		</div>
	);
}
