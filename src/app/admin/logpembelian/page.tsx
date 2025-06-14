import { Suspense } from 'react'
import { getLogPembelian } from '@/action/admin/purchase.action'
import LogPenjualanSkeleton from '@/components/skeleton/LogPenjualanSkeleton'
import LogPembelianClient from '@/components/admin/LogPembelianClient'

export default async function LogPembelianPage({
	searchParams
}: {
	searchParams?: Promise<{
		query?: string
		page?: string
	}>
}) {
	const sParams = await searchParams
	const query = sParams?.query || ""
	const currentPage = Number(sParams?.page) || 1
	const result = await getLogPembelian({ query, page: currentPage })

	return (
		<div className="p-4 max-w-[1240px] mx-auto mb-10">
			<h1 className="text-2xl font-bold mb-4">Log Pembelian</h1>
			<Suspense fallback={<LogPenjualanSkeleton />}>
				<LogPembelianClient
					initialLogs={result.data || []}
					totalPages={result.totalPages || 1}
				/>
			</Suspense>
		</div>
	)
}