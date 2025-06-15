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
        <Suspense fallback={<LogPenjualanSkeleton />}>
            <LogPembelianClient
                initialLogs={result.data || []}
                totalLogs={result.total || 0}
                totalPages={result.totalPages || 1}
            />
        </Suspense>
    )
}