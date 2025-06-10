import { getFakturPenjualan, getPenjualanStats, getPenjualanTotalPages } from "@/action/admin/transaction.action";
import LogPenjualanClient from "@/components/admin/LogPenjualanClient";
import LogPenjualanSkeleton from "@/components/skeleton/LogPenjualanSkeleton";
import { Suspense } from "react";

export default async function LogPenjualanPage({ searchParams }: {
	searchParams?: Promise<{
		page?: string
		search?: string
	}>
}) {
	const sParams = await searchParams
	const currPage = Number(sParams?.page) || 1
	const search = sParams?.search || ""
	const itemsPerPage = 10;

	const [fakturResult, statsResult, totalPagesResult] = await Promise.all([
		getFakturPenjualan({ page: currPage, take: itemsPerPage, matcher: search }),
		getPenjualanStats(),
		getPenjualanTotalPages({ take: itemsPerPage })
	]);

	return (
		<Suspense fallback={<LogPenjualanSkeleton />}>
			<LogPenjualanClient
				initialFaktur={fakturResult.data || []}
				stats={statsResult.data}
				totalPages={totalPagesResult.data || 1}
			/>
		</Suspense>
	);
}