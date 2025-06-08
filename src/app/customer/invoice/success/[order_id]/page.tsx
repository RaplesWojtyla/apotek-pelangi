'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CreditCard, OctagonAlertIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoiceSkeleton } from "@/components/skeleton/InvoiceSkeleton";
import { SellingInvoice } from "@/action/customer/sellingInvoice.action";
import toast from "react-hot-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { transactionSuccess } from "@/action/customer/transaction.action";


export default function SuccessPage() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [invoice, setInvoice] = useState<SellingInvoice>()
	const [isPaymentVerified, setIsPaymentVerified] = useState<boolean>(false)
	const [verificationMessage, setVerificationMessage] = useState<string>()

	const { isSignedIn, user, isLoaded } = useUser()
	const router = useRouter()
	const params = useParams()
	const { order_id } = params

	if (isLoaded && !isSignedIn) {
		return redirect('/unauthorized')
	}

	useEffect(() => {
		if (!isLoaded) return

		if (!isSignedIn) {
			return redirect('/unauthorized')
		}

		if (!order_id) {
			toast.error("Kode Invoice tidak valid!")
			router.push('/customer/cart')
			setIsLoading(false)
			return
		}

		const verifyAndFetchInvoice = async () => {
			setIsLoading(true)
			try {
				const verificationResult = await transactionSuccess(order_id.toString())

				if (verificationResult.success && verificationResult.data) {
					setInvoice(verificationResult.data)
					setIsPaymentVerified(true)
					setVerificationMessage(verificationResult.message)
				} else {
					setIsPaymentVerified(false)
					setVerificationMessage(verificationResult.message || "Gagal memverifiksi pembayaran")
					setInvoice(verificationResult.data)

					if (verificationResult.isPending) {
						toast("Anda belum melakukan pembayaran!", {
							duration: 5000,
							style: {
								border: '1px solid #CB8802',
								padding: '16px',
								color: '#B47902',
								background: '#FFE2A6'
							},
							iconTheme: {
								primary: '#713200',
								secondary: '#FFFAEE',
							},
							icon: <OctagonAlertIcon size={30} />,
						})
						router.replace(`/customer/invoice/${order_id}`)
					} else if (verificationResult.status === '404') {
						toast.error(verificationResult.message || "Transaksi tidak ditemukan.", {
							duration: 5000,
							style: {
								border: '1px solid #ED0505',
								padding: '16px',
								color: '#A20000',
								background: '#FFAAAA'
							},
							iconTheme: {
								primary: '#ED0505',
								secondary: '#FFFAEE',
							},
						})
						router.replace(`/customer/invoice/${order_id}`)
					} else {
						toast.error(verificationResult.message || "Pembayaran tidak berhasil dikonfirmasi", {
							duration: 5000,
							style: {
								border: '1px solid #ED0505',
								padding: '16px',
								color: '#A20000',
								background: '#FFAAAA'
							},
							iconTheme: {
								primary: '#ED0505',
								secondary: '#FFFAEE',
							},
						})
						router.replace(`/customer/invoice/${order_id}`)
					}
				}
			} catch (error: any) {
				console.error(`[verifyAndFetchInvoice] Error: ${error.message || error}`);
				toast.error("Terjadi kesalahan saat memverifikasi invoice.")
				setIsPaymentVerified(false)
				setVerificationMessage("Terjadi kesalahan pada server")
				router.push('/customer')
			} finally {
				setIsLoading(false)
			}
		}

		verifyAndFetchInvoice()
	}, [order_id, isLoaded, isSignedIn, router])

	if (!isLoaded || isLoading) return <InvoiceSkeleton />

	if (!isPaymentVerified || !invoice) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
				<h2 className="text-2xl font-semibold text-red-600 mb-4">Verifikasi Pembayaran Tidak Berhasil</h2>
				<p className="text-gray-700 mb-6 max-w-md">
					{verificationMessage || "Status pembayaran tidak dapat dikonfirmasi sebagai berhasil. Mohon periksa kembali status transaksi Anda."}
				</p>
				{order_id && (
					<Button onClick={() => router.push(`/customer/invoice/${order_id}`)} className="mb-2 cursor-pointer">
						Cek Status Invoice
					</Button>
				)}
				<Button onClick={() => router.push('/customer/history')} variant="outline" className="cursor-pointer">
					Lihat Riwayat Transaksi
				</Button>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-slate-100 text-slate-800 mt-12">
			<div className="p-4 md:p-8 lg:p-10 max-w-4xl mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 tracking-tight">Invoice</h1>


				<Card className="bg-white p-6 sm:p-8 md:p-10 space-y-8 shadow-xl rounded-xl border border-slate-200">
					<h2 className="text-2xl font-semibold text-cyan-700">
						Pembayaran Berhasil! Pesanan anda akan segera dikemas!
					</h2>


					<div className="mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">

						<p className="font-medium text-slate-700 text-lg">{user.fullName}</p>
						<p className="text-sm text-slate-600 mt-1">No Telepon: {invoice?.nomor_telepon}</p>
					</div>

					<hr className="border-slate-200" />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm my-4">
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Kode Invoice:</p>
							<HoverCard>
								<HoverCardTrigger>
									<p className="font-medium text-slate-700 text-base truncate">{invoice?.id}</p>
								</HoverCardTrigger>
								<HoverCardContent>
									<p className="font-medium text-slate-700 text-base">{invoice?.id}</p>
								</HoverCardContent>
							</HoverCard>
						</div>
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Tanggal Transaksi:</p>
							<p className="font-medium text-slate-700 text-base">{invoice?.tanggal_faktur?.toLocaleDateString('id-ID')}</p>
						</div>
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Total:</p>
							<p className="font-bold text-orange-600 text-base">Rp {invoice?.total.toLocaleString('ID-id')}</p>
						</div>
						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Metode Pembayaran:</p>
							<p className="font-medium text-slate-700 text-base">{invoice?.metode_pembayaran}</p>
						</div>
					</div>

					<hr className="border-slate-200" />

					<div className="grid md:grid-cols-2 gap-x-8 gap-y-6 my-4">
						<div>
							<h3 className="text-lg font-semibold text-slate-700 mb-3">Detail Pesanan</h3>
							<div className="space-y-2.5">
								<div className="flex justify-between text-sm text-slate-600">
									<span>Subtotal</span>
									<span>Rp {invoice?.total.toLocaleString('id-ID')}</span>
								</div>
								<div className="flex justify-between text-sm text-slate-600">
									<span>Diskon</span>
									<span>Rp 0,00</span>
								</div>
								<hr className="border-slate-200 my-3" />
								<div className="flex justify-between font-bold text-orange-600 text-base">
									<span>Total</span>
									<span>Rp {invoice?.total.toLocaleString('id-ID')}</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-slate-700 mb-3">Status Pembayaran</h3>
							<div className="flex items-center gap-2.5 text-sm">
								<CreditCard className="text-primary" size={20} />
								{invoice?.status === 'MENUNGGU_PEMBAYARAN' && (
									<Badge className="bg-amber-100 text-amber-700 px-3 py-1.5 text-sm font-medium border border-amber-200 rounded-md">
										{invoice?.status}
									</Badge>
								)}
								{invoice?.status === 'PEMBAYARAN_BERHASIL' && (
									<Badge className="bg-green-100 text-green-700 px-3 py-1.5 text-sm font-medium border border-cyan-200 rounded-md">
										{invoice?.status}
									</Badge>
								)}
							</div>
						</div>
					</div>

					<div className="pt-6 border-t border-slate-200 mt-4">
						<Button
							className="w-full cursor-pointer md:w-auto text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 ease-in-out"
							onClick={() => router.push('/customer')}
						>
							Kembali ke Dashboard
						</Button>
					</div>
				</Card>
			</div>
		</div>

	);
}
