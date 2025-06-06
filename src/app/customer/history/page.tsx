"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TransaksiDetailDialog from "@/components/TransactionDetail";
import { DetailSellingInvoices, getDetailSellingInvoices } from "@/action/customer/sellingInvoice.action";
import toast from "react-hot-toast";
import { LoaderPinwheel } from "lucide-react";
import clsx from "clsx";
import SkeletonHistory from "@/components/skeleton/SkeletonHistory";

export default function RiwayatTransaksiPage() {
	const [historyTransactions, setHistoryTransactions] = useState<DetailSellingInvoices[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [filter, setFilter] = useState<string>("Semua");

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
	);

	if (isLoading) return (
		<div className="w-full h-screen flex justify-center items-center gap-3">
			<LoaderPinwheel className="animate-spin size-5" />
			<p className="animate-pulse text-lg">Memuat riwayat transaksi...</p>
		</div>
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
			<div className="space-y-4">
				{filtered.map(trx => (
					<div
						key={trx.id}
						className="border rounded-lg p-4 flex flex-col gap-4 shadow-sm bg-white"
					>
						<div className="text-sm text-gray-600 font-medium">Kode Invoice : {trx.id}</div>
						<div className="flex items-start gap-4">
							<Image
								src={`/${trx.detail_faktur_penjualan[0].barang.foto_barang}`}
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
				))}
			</div>
			<SkeletonHistory />
		</div>
	);
}
