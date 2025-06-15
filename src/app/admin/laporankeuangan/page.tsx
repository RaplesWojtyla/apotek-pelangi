'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getFinancialReport } from '@/action/admin/financial.action'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

type ReportData = {
	totalPemasukan: number
	totalPengeluaran: number
	labaKotor: number
	startDate: Date
	endDate: Date
} | null

export default function LaporanKeuanganPage() {
	const [isPending, startTransition] = useTransition()
	const [reportData, setReportData] = useState<ReportData>(null)

	const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0])
	const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

	const handleGenerateReport = () => {
		startTransition(async () => {
			const result = await getFinancialReport(new Date(startDate), new Date(endDate))
			if (result.success && result.data) {
				setReportData(result.data)
				toast.success("Laporan berhasil dibuat!")
			} else {
				toast.error(result.message || "Gagal membuat laporan.")
			}
		})
	}

	const handleExportCSV = () => {
		if (!reportData) return
		const dataForCSV = [
			{ Laporan: 'Total Pemasukan', Jumlah: reportData.totalPemasukan },
			{ Laporan: 'Total Pengeluaran', Jumlah: reportData.totalPengeluaran },
			{ Laporan: 'Laba Kotor', Jumlah: reportData.labaKotor },
		]
		const headers = Object.keys(dataForCSV[0])
		const csvContent = [
			headers.join(','),
			...dataForCSV.map(row => headers.map(header => JSON.stringify(row[header as keyof typeof row])).join(','))
		].join('\n')

		const blob = new Blob([csvContent], { type: 'text/csvcharset=utf-8' })
		const link = document.createElement('a')
		const url = URL.createObjectURL(blob)
		link.setAttribute('href', url)
		link.setAttribute('download', `laporan_keuangan_${startDate}_${endDate}.csv`)
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className="p-6 max-w-4xl mx-auto space-y-6">
			<h1 className="text-3xl font-bold">Laporan Laba Rugi</h1>

			<Card>
				<CardHeader>
					<CardTitle>Pilih Periode Laporan</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col sm:flex-row gap-4 items-end">
					<div className="grid gap-2 w-full">
						<Label htmlFor="start-date">Tanggal Mulai</Label>
						<Input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
					</div>
					<div className="grid gap-2 w-full">
						<Label htmlFor="end-date">Tanggal Selesai</Label>
						<Input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
					</div>
					<Button onClick={handleGenerateReport} disabled={isPending} className="w-full sm:w-auto">
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Buat Laporan
					</Button>
				</CardContent>
			</Card>

			{reportData && (
				<Card>
					<CardHeader>
						<CardTitle>Hasil Laporan Periode {new Date(startDate).toLocaleDateString('id-ID')} - {new Date(endDate).toLocaleDateString('id-ID')}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex justify-between items-center p-4 bg-green-50 border-l-4 border-green-500 rounded">
							<p className="font-medium text-green-800">Total Pemasukan</p>
							<p className="text-xl font-bold text-green-800">Rp{reportData.totalPemasukan.toLocaleString('id-ID')}</p>
						</div>
						<div className="flex justify-between items-center p-4 bg-red-50 border-l-4 border-red-500 rounded">
							<p className="font-medium text-red-800">Total Pengeluaran</p>
							<p className="text-xl font-bold text-red-800">Rp{reportData.totalPengeluaran.toLocaleString('id-ID')}</p>
						</div>
						<div className="flex justify-between items-center p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
							<p className="font-medium text-blue-800">Laba Kotor</p>
							<p className="text-xl font-bold text-blue-800">Rp{reportData.labaKotor.toLocaleString('id-ID')}</p>
						</div>
						<Button onClick={handleExportCSV} variant="outline" className="mt-4 w-full">
							Ekspor ke CSV
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	)
}