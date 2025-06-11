'use client'

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import clsx from "clsx";
import { FakturPenjualan } from "@/action/admin/transaction.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode; }) {
	return (
		<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border w-full sm:w-[280px]">
			<div className="p-4 rounded-full bg-blue-100 text-blue-600">{icon}</div>
			<div>
				<p className="text-sm text-muted-foreground">{title}</p>
				<h3 className="text-2xl font-bold">{value}</h3>
			</div>
		</div>
	);
}

export default function LogPenjualanClient({ initialFaktur, stats, totalPages }: {
	initialFaktur: FakturPenjualan[],
	stats: { totalFaktur: number; totalOmzet: number; totalSelesai: number; },
	totalPages: number
}) {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback(search => {
		const params = new URLSearchParams(searchParams)
		params.set("page", "1")

		search ? params.set("search", search) : params.delete("search")

		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<div className="p-4 max-w-[1240px] mx-auto mb-10">
			<h1 className="text-2xl font-bold mb-4">Log Penjualan</h1>

			<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
				<StatCard title="Total Faktur Penjualan" value={stats.totalFaktur} icon={<ShoppingCart className="w-6 h-6" />} />
				<StatCard title="Total Omzet" value={`Rp${stats.totalOmzet.toLocaleString('id-ID')}`} icon={<ShoppingCart className="w-6 h-6" />} />
				<StatCard title="Transaksi Selesai" value={stats.totalSelesai} icon={<ShoppingCart className="w-6 h-6" />} />
			</div>

			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Input 
						placeholder="Cari Kode Faktur..." 
						className="w-full md:w-64"
						defaultValue={searchParams.get("search")?.toString()}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<Button variant="outline" size="icon"><Search className="w-4 h-4" /></Button>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg shadow">
				<table className="min-w-full bg-white text-xs sm:text-sm text-left">
					<thead className="bg-gray-100 text-gray-600">
						<tr>
							<th className="px-3 py-2 min-w-[40px]">No</th>
							<th className="px-3 py-2 min-w-[100px]">Kode Faktur</th>
							<th className="px-3 py-2 min-w-[100px]">Kasir</th>
							<th className="px-3 py-2 min-w-[120px]">Tanggal</th>
							<th className="px-3 py-2 min-w-[100px]">Total</th>
							<th className="px-3 py-2 min-w-[80px]">Status</th>
							<th className="px-3 py-2 min-w-[130px]">Detail Transaksi</th>
						</tr>
					</thead>
					<tbody>
						{initialFaktur.length === 0 ? (
							<tr>
								<td colSpan={7} className="text-center py-10">
									<p className="text-gray-500 font-semibold">Belum ada data transaksi</p>
								</td>
							</tr>
						) : (
							initialFaktur.map((faktur, index) => (
								<tr key={faktur.id} className="border-t hover:bg-gray-50">
									<td className="px-3 py-2">{index + 1}</td>
									<td className="px-3 py-2">{faktur.id}</td>
									<td className="px-3 py-2">{faktur.kasir?.nama || 'N/A'}</td>
									<td className="px-3 py-2">{new Date(faktur.tanggal_faktur).toLocaleDateString()}</td>
									<td className="px-3 py-2">Rp{faktur.total.toLocaleString()}</td>
									<td className="px-3 py-2">
										<span
											className={`
											px-2 py-1 rounded text-[10px] sm:text-xs font-medium 
											${clsx({
												'bg-green-100 text-green-700': faktur.status === 'PEMBAYARAN_BERHASIL' || faktur.status === 'SELESAI',
												'bg-red-100 text-red-700': faktur.status === 'PEMBAYARAN_GAGAL' || faktur.status === 'DIBATALKAN',
												'bg-yellow-100 text-yellow-700': faktur.status === 'MENUNGGU_PEMBAYARAN',
												'bg-blue-100 text-blue-700': faktur.status === 'MENUNGGU_PENGAMBILAN'
											})}
										`}
										>
											{faktur.status.replace('_', ' ')}
										</span>
									</td>
									<td className="px-3 py-2">
										<Dialog>
											<DialogTrigger asChild>
												<Button variant="outline" size="sm" className="text-xs sm:text-sm">Lihat Detail</Button>
											</DialogTrigger>
											<DialogContent className="w-[95vw] sm:max-w-lg max-h-[90vh]">
												<DialogHeader>
													<DialogTitle className="text-base sm:text-lg">Detail Transaksi - {faktur.id}</DialogTitle>
													<DialogDescription>
														Dilayani oleh <strong>{faktur.kasir?.nama || 'N/A'}</strong> pada <strong>{new Date(faktur.tanggal_faktur).toLocaleString('id-ID')}</strong>
													</DialogDescription>
												</DialogHeader>
												<ScrollArea className="mt-4 h-[400px] pr-2 text-xs sm:text-sm">
													<div className="space-y-2">
														<div><strong>Nama Penerima:</strong> {faktur.nama_penerima}</div>
														<div><strong>Nomor Telepon Penerima:</strong> {faktur.nomor_telepon}</div>
														<div><strong>Metode Pembayaran:</strong> {faktur.metode_pembayaran.toUpperCase()}</div>
														<div><strong>Status:</strong> {faktur.status.replace("_", " ")}</div>
														<div><strong>Keterangan:</strong> {faktur.keterangan || "-"}</div>
														<div><strong>Total:</strong> Rp{faktur.total.toLocaleString('id-ID')}</div>
														<div className="mt-3">
															<strong>Barang Dibeli:</strong>
															<ul className="list-disc ml-5 mt-2 space-y-1">
																{faktur.detail_faktur_penjualan.map(item => (
																	<li key={item.id}>
																		{item.barang.nama_barang} (x{item.jumlah}) <span className="font-bold">-</span> <span className="font-semibold"> Rp{(item.barang.harga_jual * item.jumlah).toLocaleString('id-ID')}</span>
																		<br />
																		<span className="text-[10px] text-gray-500">
																			Harga satuan: Rp{item.barang.harga_jual.toLocaleString('id-ID')}
																		</span>
																	</li>
																))}
															</ul>
														</div>
													</div>
												</ScrollArea>
											</DialogContent>
										</Dialog>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<div className="mt-6 flex justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}