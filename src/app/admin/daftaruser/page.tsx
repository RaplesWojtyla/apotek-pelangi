import { Suspense } from "react"
import { getUsers, getUserStats } from "@/action/admin/user.action"
import { Skeleton } from "@/components/ui/skeleton"
import DaftarUserClient from "@/components/admin/DaftarUserClient"

export default async function DaftarUserPage({
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
	const itemsPerPage = 10

	const [usersResult, statsResult] = await Promise.all([
		getUsers({ query, page: currentPage, take: itemsPerPage }),
		getUserStats(query, itemsPerPage)
	])

	const users = usersResult.data || []
	const totalUsers = statsResult.total || 0
	const totalPages = statsResult.totalPages || 1

	return (
		<div className="p-4 max-w-[1240px] mx-auto">
			<h1 className="text-2xl font-bold mb-4">Manajemen Pengguna</h1>

			<Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
				<DaftarUserClient
					users={users}
					totalUsers={totalUsers}
					totalPages={totalPages}
				/>
			</Suspense>
		</div>
	)
}