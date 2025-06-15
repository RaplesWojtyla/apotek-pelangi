'use client'

import { SellingInvoice } from "@/action/customer/sellingInvoice.action"
import { failedTransaction } from "@/action/customer/transaction.action"
import FailedInvoideSkeleton from "@/components/skeleton/FailedInvoiceSkeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useUser } from "@clerk/nextjs"
import { AlertCircle, CreditCard } from "lucide-react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function page() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const order_id = searchParams.get("order_id") || ""

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [failedInvoice, setFailedInvoice] = useState<SellingInvoice>(null)
	const { isSignedIn, user, isLoaded } = useUser()

	if (isLoaded && !isSignedIn) {
		return redirect('/unauthorized')
	}

	useEffect(() => {
		if (!isLoaded || !isSignedIn) return

		if (order_id.length === 0) {
			toast.error("Kode Invoice tidak valid!")
			router.push('/customer/cart')
			setIsLoading(false)
			return
		}

		const fetchFailedInvoiceData = async () => {
			setIsLoading(true)
			try {
				const data = await failedTransaction(order_id)

				if (!data.success) {
					setFailedInvoice(null)
					toast.error(data.message || "Invoice tidak ditemukan atau Anda tidak memiliki akses.")
					router.push('/customer/cart')
					return
				}

				if (data.data) {
					setFailedInvoice(data.data)
				} else {
					setFailedInvoice(null)
					toast.error("Data invoice tidak ditemukan.")
					router.push('/customer/cart')
					return
				}
			} catch (error: any) {
				setFailedInvoice(null)
				console.error(`[fetchFailedInvoiceData] Error: ${error.message || error}`);
				toast.error("Terjadi kesalahan saat mengambil data invoice.")
				router.push('/customer')
			} finally {
				setIsLoading(false)
			}
		}

		fetchFailedInvoiceData()
	}, [order_id, isLoaded, isSignedIn, router])

	if (!isLoaded || isLoading) return <FailedInvoideSkeleton />

	if (isLoaded && !failedInvoice) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<p className="text-xl text-gray-700">Data invoice tidak dapat dimuat.</p>
				<Button onClick={() => router.push('/customer/dashboard')} className="mt-4">
					Kembali ke Dashboard
				</Button>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-slate-100 text-slate-800 mt-6">
			<div className="p-4 md:p-8 lg:p-10 max-w-4xl mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 tracking-tight">Invoice</h1>

				<Card className="bg-white p-6 sm:p-8 md:p-10 space-y-4 shadow-xl rounded-xl border border-slate-200">
					<h2 className="text-2xl font-bold text-red-600 mb-2 tracking-tight flex items-center gap-2">
						<AlertCircle className="w-6 h-6 text-red-600" />
						Pesanan Gagal
					</h2>

					<div className="mb-2 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
						<p className="font-medium text-slate-700 text-lg">{user.fullName}</p>
						<p className="text-sm text-slate-600 mt-1">No Telepon: {failedInvoice?.nomor_telepon}</p>
					</div>

					<hr className="border-slate-200" />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm my-2">
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Kode Invoice:</p>
							<HoverCard>
								<HoverCardTrigger>
									<p className="font-medium text-slate-700 text-base truncate">{failedInvoice?.id}</p>
								</HoverCardTrigger>
								<HoverCardContent>
									<p className="font-medium text-slate-700 text-base">{failedInvoice?.id}</p>
								</HoverCardContent>
							</HoverCard>
						</div>
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Tanggal Transaksi:</p>
							<p className="font-medium text-slate-700 text-base">{failedInvoice?.tanggal_faktur?.toLocaleDateString('id-ID')}</p>
						</div>
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Total:</p>
							<p className="font-bold text-orange-600 text-base">Rp {failedInvoice?.total.toLocaleString('ID-id')}</p>
						</div>
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Metode Pembayaran:</p>
							<p className="font-medium text-slate-700 text-base">{failedInvoice?.metode_pembayaran}</p>
						</div>
					</div>

					<hr className="border-slate-200" />

					<div className="grid md:grid-cols-2 gap-x-8 gap-y-6 my-2">
						<div>
							<h3 className="text-lg font-semibold text-slate-700 mb-3">Detail Pesanan</h3>
							<div className="space-y-2.5">
								<div className="flex justify-between text-sm text-slate-600">
									<span>Subtotal</span>
									<span>Rp {failedInvoice?.total.toLocaleString('id-ID')}</span>
								</div>
								<div className="flex justify-between text-sm text-slate-600">
									<span>Diskon</span>
									<span>Rp 0,00</span>
								</div>
								<hr className="border-slate-200 my-3" />
								<div className="flex justify-between font-bold text-orange-600 text-base">
									<span>Total</span>
									<span>Rp {failedInvoice?.total.toLocaleString('id-ID')}</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-slate-700 mb-3">Status Pembayaran</h3>
							<div className="flex items-center gap-2.5 text-sm">
								<CreditCard className="text-primary" size={20} />
								{failedInvoice?.status === 'MENUNGGU_PEMBAYARAN' && (
									<Badge className="bg-amber-100 text-amber-700 px-3 py-1.5 text-sm font-medium border border-amber-200 rounded-md">
										{failedInvoice?.status}
									</Badge>
								)}
								{failedInvoice?.status === 'PEMBAYARAN_BERHASIL' && (
									<Badge className="bg-green-100 text-green-700 px-3 py-1.5 text-sm font-medium border border-cyan-200 rounded-md">
										{failedInvoice?.status}
									</Badge>
								)}
								{failedInvoice?.status === 'PEMBAYARAN_GAGAL' && (
									<Badge className="bg-red-100 text-red-700 px-3 py-1.5 text-sm font-medium border border-red-600 rounded-md">
										{failedInvoice.status.replace('_', ' ')}
									</Badge>
								)}
								{failedInvoice?.status === 'SELESAI' && (
									<Badge className="bg-green-100 text-green-700 px-3 py-1.5 text-sm font-medium border border-cyan-200 rounded-md">
										{failedInvoice?.status}
									</Badge>
								)}
							</div>
						</div>
					</div>

					<div className="pt-6 border-t border-slate-200 mt-4">
						<Button
							variant={'outline'}
							className="w-full bg-cyan-500 text-white cursor-pointer md:w-auto font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 transition-all duration-150 ease-in-out"
							onClick={() => router.push('/customer/history')}
						>
							Histori Transaksi
						</Button>
					</div>
				</Card>
			</div>
		</div>
	)
}
