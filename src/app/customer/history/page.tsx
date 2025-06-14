"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import TransaksiDetailDialog from "@/components/TransactionDetail"
import { DetailSellingInvoices, getDetailSellingInvoices } from "@/action/customer/sellingInvoice.action"
import toast from "react-hot-toast"
import clsx from "clsx"
import SkeletonHistory from "@/components/skeleton/SkeletonHistory"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function RiwayatTransaksiPage() {
	const [historyTransactions, setHistoryTransactions] = useState<DetailSellingInvoices[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [filter, setFilter] = useState<string>("Semua")

	const { isLoaded, isSignedIn } = useUser()

	const statusTabs = [
		{ label: "Semua", value: "Semua" },
		{ label: "Menunggu Pembayaran", value: "MENUNGGU_PEMBAYARAN" },
		{ label: "Pembayaran Berhasil", value: "PEMBAYARAN_BERHASIL" },
		{ label: "Pembayaran Gagal", value: "PEMBAYARAN_GAGAL" },
		{ label: "Menunggu Pengambilan", value: "MENUNGGU_PENGAMBILAN" },
		{ label: "Dibatalkan", value: "DIBATALKAN" },
		{ label: "Selesai", value: "SELESAI" }
	]

	useEffect(() => {
		const fetchHistoryTransactions = async () => {
			if (!isLoaded || (isLoaded && !isSignedIn)) {
				setIsLoading(false)
				return
			}

			setIsLoading(true)
			try {
				const res = await getDetailSellingInvoices()

				if (res.success) {
					setHistoryTransactions(res.data)
				} else {
					setHistoryTransactions([])
					toast.error(res.message, {
						duration: 4500
					})
				}
			} catch (error: any) {
				setHistoryTransactions([])
				toast.error(error.message || "Gagal mengambil riwayat transaksi anda")
			} finally {
				setIsLoading(false)
			}
		}

		fetchHistoryTransactions()
	}, [])

	const filtered = historyTransactions.filter(t =>
		filter === "Semua" ? true : t.status === filter
	)

	return (
		<div className="max-w-5xl min-h-screen mx-auto px-4 py-6 pt-18">
			<h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>

			{/* Tabs */}
			<div className="flex space-x-2 overflow-x-auto mb-6">
				{statusTabs.map(tab => (
					<button
						key={tab.value}
						onClick={() => setFilter(tab.value)}
						className={`
							px-4 py-2 rounded-md font-semibold cursor-pointer
							${filter === tab.value ? "bg-cyan-500 text-white" : "bg-cyan-100 text-cyan-700"}
						`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Kartu transaksi */}
			{isLoading ? (
				<SkeletonHistory />
			) : (
				<div className="space-y-4">
					{isLoaded && !isSignedIn ? (
						<div className="w-full min-h-[300px] flex flex-col justify-center items-center text-center py-10">
							<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-x text-gray-400 mb-4">
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<line x1="17" x2="22" y1="8" y2="13" />
								<line x1="22" x2="17" y1="8" y2="13" />
							</svg>
							<p className="text-xl font-semibold text-gray-700">
								Anda Belum Masuk
							</p>
							<p className="text-gray-500 mt-1">
								Silakan masuk untuk melihat riwayat transaksi Anda.
							</p>
							<Button
								className="mt-6 px-6 py-2 font-semibold rounded-lg shadow-md cursor-pointer"
								asChild
							>
								<SignInButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
									Masuk Sekarang
								</SignInButton>
							</Button>
						</div>
					) : (
						filtered.length === 0 ? (
							<div className="w-full min-h-[300px] flex flex-col justify-center items-center text-center py-10">
								<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-gray-400 mb-4">
									<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
									<polyline points="14 2 14 8 20 8" />
									<line x1="16" x2="8" y1="13" y2="13" />
									<line x1="16" x2="8" y1="17" y2="17" />
									<line x1="10" x2="8" y1="9" y2="9" />
								</svg>
								<p className="text-xl font-semibold text-gray-700">
									{filter === "Semua" ? "Anda belum memiliki riwayat transaksi" : "Tidak ada transaksi yang sesuai dengan filter ini"}
								</p>
								<p className="text-gray-500 mt-1">
									{filter === "Semua" ? "Silakan lakukan transaksi terlebih dahulu." : "Coba ubah filter atau periksa kembali nanti."}
								</p>
							</div>
						) : (
							filtered.map(trx => (
								<div
									key={trx.id}
									className="border rounded-lg p-4 flex flex-col gap-4 shadow-sm bg-white"
								>
									<div className="text-sm text-gray-600 font-medium">Kode Invoice : {trx.id}</div>
									<div className="flex items-start gap-4">
										<Image
											src={trx.detail_faktur_penjualan[0].barang.foto_barang.includes('https') ? trx.detail_faktur_penjualan[0].barang.foto_barang : `/${trx.detail_faktur_penjualan[0].barang.foto_barang}`}
											alt={trx.detail_faktur_penjualan[0].barang.nama_barang}
											width={100}
											height={100}
											className="object-contain rounded"
										/>
										<div className="flex-1">
											<p className="font-semibold">{trx.detail_faktur_penjualan[0].barang.nama_barang}</p>
											<p className="text-sm text-gray-600">
												{trx.detail_faktur_penjualan[0].jumlah} x Rp{trx.detail_faktur_penjualan[0].barang.harga_jual.toLocaleString('id-ID')}
											</p>
											<TransaksiDetailDialog transaction={trx} />
										</div>
										<div className="text-right">
											<p className="font-semibold text-lg">Rp{trx.total.toLocaleString()}</p>
											<span
												className={`inline-block mt-2 px-3 py-1 text-xs rounded ${clsx({
													'bg-yellow-500 text-white': trx.status === 'MENUNGGU_PEMBAYARAN',
													'bg-green-500 text-white': trx.status === 'PEMBAYARAN_BERHASIL',
													'bg-red-500 text-white': trx.status === 'PEMBAYARAN_GAGAL',
													'bg-blue-500 text-white': trx.status === 'MENUNGGU_PENGAMBILAN',
													'bg-green-600 text-white': trx.status === 'SELESAI',
													'bg-red-700 text-white': trx.status === 'DIBATALKAN',
												})
													}`}
											>
												{trx.status.replace('_', " ")}
											</span>
										</div>
									</div>
								</div>
							))
						)
					)}
				</div>
			)}
		</div>
	)
}
