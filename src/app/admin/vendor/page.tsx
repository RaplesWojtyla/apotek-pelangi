'use server'
import { Suspense } from "react"
import { getVendors, getVendorStats } from "@/action/admin/vendor.action"
import { Skeleton } from "@/components/ui/skeleton"
import VendorClientPage from "@/components/admin/VendorClientPage"

export default async function VendorPage({
	searchParams
}: {
	searchParams?: Promise<{
		query?: string
		page?: string
	}>
}) {
	const params = await searchParams
	const query = params?.query || ""
	const currentPage = Number(params?.page) || 1
	const itemsPerPage = 10

	const [vendorsResult, statsResult] = await Promise.all([
		getVendors({ query, page: currentPage, take: itemsPerPage }),
		getVendorStats(query)
	])

	const vendors = vendorsResult.data || []
	const totalVendors = statsResult.total || 0
	const totalPages = Math.ceil(totalVendors / itemsPerPage)

	return (
		<div className="p-6 space-y-6 max-w-[1240px] mx-auto">
			<div className="text-sm text-muted-foreground">
				<span className="text-foreground font-medium">Manajemen Vendor</span>
			</div>
			<h1 className="text-3xl font-bold">Daftar Vendor</h1>

			<Suspense fallback={<Skeleton className="w-full h-96" />}>
				<VendorClientPage
					vendors={vendors}
					totalVendors={totalVendors}
					totalPages={totalPages}
				/>
			</Suspense>
		</div>
	)
}