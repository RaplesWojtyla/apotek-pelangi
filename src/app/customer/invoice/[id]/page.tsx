'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CreditCard, OctagonAlertIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoiceSkeleton } from "@/components/skeleton/InvoiceSkeleton";
import { getSellingInvoiceById, SellingInvoice } from "@/action/customer/sellingInvoice.action";
import toast from "react-hot-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";


export default function PembayaranPage() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [invoice, setInvoice] = useState<SellingInvoice>()
	const { isSignedIn, user, isLoaded } = useUser()
	const router = useRouter()
	const params = useParams()
	const { id } = params

	if (isLoaded && !isSignedIn) {
		return redirect('/unauthorized')
	}

	useEffect(() => {
		if (!isLoaded || !isSignedIn) return

		if (!id) {
			toast.error("Kode Invoice tidak valid!")
			router.push('/customer/cart')
			setIsLoading(false)
			return
		}

		const fetchInvoiceData = async () => {
			setIsLoading(true)
			try {
				const data = await getSellingInvoiceById(id.toString())

				if (!data.success) {
					toast.error(data.message || "Invoice tidak ditemukan atau Anda tidak memiliki akses.")
					router.push('/customer/cart')
					return
				}

				if (data.data) {
					setInvoice(data.data)
				} else {
					toast.error("Data invoice tidak ditemukan.")
					router.push('/customer/cart')
					return
				}
			} catch (error: any) {
				console.error(`[fetchInvoiceData] Error: ${error.message || error}`)
				toast.error("Terjadi kesalahan saat mengambil data invoice.")
				router.push('/customer')
			} finally {
				setIsLoading(false)
			}
		}

		fetchInvoiceData()
	}, [id, isLoaded, isSignedIn, router])

	if (!isLoaded || isLoading) return <InvoiceSkeleton />

	if (isLoaded && !invoice) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<p className="text-xl text-gray-700">Data invoice tidak dapat dimuat.</p>
				<Button onClick={() => router.push('/customer/dashboard')} className="mt-4">
					Kembali ke Dashboard
				</Button>
			</div>
		)
	}

	const handlePayment = (snap_token: string) => {
		window.snap.pay(snap_token, {
			onSuccess: (res) => {
				router.push(`/customer/invoice/success/${res.order_id}`)
			},
			onPending: () => {
				toast.error("Harap segera melakukan pembayaran", {
					duration: 4500,
					style: {
						border: '1px solid #CB8802',
						paddingTop: '16px',
						color: '#B47902',
						background: '#FFE2A6'
					},
					iconTheme: {
						primary: '#713200',
						secondary: '#FFFAEE',
					},
					icon: <OctagonAlertIcon size={30} />,
				})
			},
			onError: (res) => {
				redirect(`/customer/invoice/failed?order_id=${invoice?.id}`)
			},
			onClose: () => {

			},
		})
	}

	return (
		<div className="min-h-screen bg-slate-100 text-slate-800 mt-6">
			<div className="p-4 md:p-8 lg:p-10 max-w-4xl mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 tracking-tight">Invoice</h1>

				<Card className="bg-white p-6 sm:p-8 md:p-10 space-y-8 shadow-xl rounded-xl border border-slate-200">
					<h2 className="text-2xl font-bold text-cyan-700">
						Pesanan anda telah diterima. Silahkan lakukan pembayaran
					</h2>


					<div className="mb-2 bg-indigo-50 p-4 rounded-lg border border-indigo-100">

						<p className="font-medium text-slate-700 text-lg">{user.fullName}</p>
						<p className="text-sm text-slate-600 mt-1">No Telepon: {invoice?.nomor_telepon}</p>
					</div>

					<hr className="border-slate-200" />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm my-2">
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

					<div className="grid md:grid-cols-2 gap-x-8 gap-y-6 my-2">
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
								{invoice?.status === 'SELESAI' && (
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
							onClick={() => handlePayment(invoice?.snap_token!)}
						>
							Bayar Sekarang
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
