'use client'

import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import TabelTebusResep from '@/components/kasir/TabelTebusResep'
import TabelTransaksiBiasa from '@/components/kasir/TabelTransaksiBiasa'
import Pagination from '@/components/Pagination'

import { getFakturCustomerPaginated, getFakturTotalPages } from '@/action/kasir/faktur.action'
import { getPendingPrescriptions, getPengajuanResepTotalPages } from '@/action/kasir/tebusResep.action'
import DaftarTransaksiSkeleton from '@/components/skeleton/SkeletonDaftarTransaksi'

type PengajuanResep = {
	id: string
	id_user: string
	tanggal_pengajuan: Date
	status: string
	catatan: string | null
	foto_resep: string
	user: { 
		id: string 
		nama: string | null 
	} | null
}


export default function DaftarTransaksiPage() {
	const [kategori, setKategori] = useState<'resep' | 'biasa'>('resep')
	const [fakturList, setFakturList] = useState<any[]>([])
	const [resepList, setResepList] = useState<PengajuanResep[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)
	const [totalResepPages, setTotalResepPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchResepData = useCallback(async () => {
		setIsLoading(true)

		const [pendingPrescriptions, totalPages] = await Promise.all([
			getPendingPrescriptions(),
			getPengajuanResepTotalPages()
		])

		if (pendingPrescriptions.success) {
			setResepList(pendingPrescriptions.data as PengajuanResep[])
			setTotalResepPages(totalPages)
		} else {
			toast.error(pendingPrescriptions.message || 'Gagal memuat daftar resep.')
		}
		setIsLoading(false)
	}, [])

	const fetchFakturData = useCallback(async () => {
		setIsLoading(true)
		try {
			const [faktur, total] = await Promise.all([
				getFakturCustomerPaginated(1, 10),
				getFakturTotalPages(10),
			])
			setFakturList(faktur)
			setTotalPages(total)
		} catch (error) {
			console.error('[FakturPagination] Error:', error)
			toast.error('Gagal memuat data transaksi')
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		if (kategori === 'resep') {
			fetchResepData()
		} else {
			fetchFakturData()
		}
	}, [kategori, fetchResepData, fetchFakturData])

	return (
		<div className="bg-gray-100 min-h-screen p-6 max-w-5xl mx-auto space-y-8">
			<h1 className="text-3xl font-bold">Daftar Transaksi</h1>

			<div className="flex gap-4">
				<Button
					variant={kategori === 'resep' ? 'default' : 'outline'}
					onClick={() => setKategori('resep')}
				>
					Tebus Resep
				</Button>
				<Button
					variant={kategori === 'biasa' ? 'default' : 'outline'}
					onClick={() => setKategori('biasa')}
				>
					Transaksi Online
				</Button>
			</div>

			{isLoading ? (
				<DaftarTransaksiSkeleton />
			) : kategori === 'resep' ? (
				<>
					<TabelTebusResep resepList={resepList} refreshData={fetchResepData} />
					<div className="flex justify-center mt-6">
						<Pagination totalPages={totalResepPages} />
					</div>
				</>
			) : (
				<>
					<TabelTransaksiBiasa fakturList={fakturList} refreshData={fetchFakturData} />
					<div className="flex justify-center mt-6">
						<Pagination totalPages={totalPages} />
					</div>
				</>
			)}
		</div>
	)
}