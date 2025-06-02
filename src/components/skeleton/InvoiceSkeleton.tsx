import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard } from "lucide-react";
import { Button } from "../ui/button";


export function InvoiceSkeleton() {
	return (
		<div className="min-h-screen bg-slate-100 text-slate-800">
			<div className="p-4 md:p-8 lg:p-10 max-w-4xl mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 tracking-tight">Invoice</h1>

				<div className="bg-white p-6 sm:p-8 md:p-10 space-y-8 shadow-xl rounded-xl border border-slate-200">
					<Skeleton className="bg-gray-200/80 w-[85%] h-10" />

					<div className="mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-1">

						<Skeleton className="bg-gray-200/80 h-7 w-3/5 sm:w-1/2 rounded-md" />

						<div className="flex items-center">
							<p className="text-sm text-slate-600 mt-1 mr-1">No Telepon:</p>
							<Skeleton className="bg-gray-200/80 h-5 w-2/5 sm:w-1/3 mt-1 rounded-md" />
						</div>
					</div>

					<hr className="border-slate-200" />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm my-4">

						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Kode Invoice:</p>
							<Skeleton className="bg-gray-200/80 h-6 w-32 rounded-md" />
						</div>

						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Tanggal Transaksi:</p>
							<Skeleton className="bg-gray-200/80 h-6 w-28 rounded-md" />
						</div>

						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Total:</p>
							<Skeleton className="bg-gray-200/80 h-6 w-20 rounded-md" />
						</div>

						<div className="mb-3 sm:mb-0">
							<p className="text-slate-500 mb-0.5">Metode Pembayaran:</p>
							<Skeleton className="bg-gray-200/80 h-6 w-16 rounded-md" />
						</div>
					</div>

					<hr className="border-slate-200" />

					<div className="grid md:grid-cols-2 gap-x-8 gap-y-6 my-4">
						<div>
							<h3 className="text-lg font-semibold text-slate-700 mb-3">Detail Pesanan</h3>
							<div className="space-y-2.5">

								<div className="flex justify-between text-sm text-slate-600">
									<span>Subtotal</span>
									<Skeleton className="bg-gray-200/80 h-5 w-20 rounded-md" />
								</div>

								<div className="flex justify-between text-sm text-slate-600">
									<span>Diskon</span>
									<Skeleton className="bg-gray-200/80 h-5 w-12 rounded-md" />
								</div>
								<hr className="border-slate-200 my-3" />

								<div className="flex justify-between font-bold text-slate-800 text-base">
									<span>Total</span>
									<Skeleton className="bg-gray-200/80 h-6 w-24 rounded-md" />
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-slate-700 mb-3">Status Pembayaran</h3>
							<div className="flex items-center gap-2.5 text-sm">
								<CreditCard className="text-primary" size={20} />

								<Skeleton className="bg-gray-200/80 h-8 w-40 rounded-md" />
							</div>
						</div>
					</div>


					<div className="pt-6 border-t border-slate-200 mt-4">
						<Button
							className="w-full animate-pulse md:w-auto text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 ease-in-out opacity-70 cursor-not-allowed"

						>
							Bayar Sekarang
						</Button>


					</div>
				</div>
			</div>

		</div>
	);
}