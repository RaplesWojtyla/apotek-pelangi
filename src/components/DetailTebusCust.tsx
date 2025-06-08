"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Rescription } from "@/action/customer/resep.action";
import Link from "next/link";
import { getCartBySource, SimpleCartItem } from "@/action/customer/cart.action";
import toast from "react-hot-toast";


const rejectedStatus = [
	{ label: "Diajukan", value: "MENGAJUKAN" },
	{ label: "Menunggu Konfirmasi", value: "MENGAJUKAN" },
	{ label: "Ditolak", value: "DITOLAK" },
]

const idealStatus = [
	{ label: "Diajukan", value: "MENGAJUKAN" },
	{ label: "Menunggu Konfirmasi", value: "MENGAJUKAN" },
	{ label: "Selesai", value: "DITERIMA" },
]

export default function DetailTebusResepDialogCustomer({ rescription }: { rescription: Rescription }) {
	const [open, setOpen] = useState(false);
	const [cart, setCart] = useState<SimpleCartItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchCart = async () => {
			setIsLoading(true)

			try {
				const res = await getCartBySource("RESEP")

				if (res.success) {
					setCart(res.data)
				} else {
					toast.error(res.message || "Gagal mengambil data pesanan!")
					setCart([])
				}
			} catch (error) {
				console.error(`[fetchCart] Error: ${error}`);

				toast.error("Server sedang mengalami gangguan. Harap coba beberapa saat lagi!")
			} finally {
				setIsLoading(false)
			}
		}

		fetchCart()
	}, [rescription])

	const status = rescription.status === 'DITOLAK' ? rejectedStatus : idealStatus

	const currentStepIndex = rescription.status === 'MENGAJUKAN' ? 1 : 2

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button className="cursor-pointer" variant="outline" size="sm">
					Lihat Status Penebusan
				</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[90vh]">
					<Dialog.Title className="text-lg font-bold mb-4 text-cyan-700">
						Status Penebusan Resep
					</Dialog.Title>

					<div className="mb-6 flex justify-center">
						<img
							src={rescription.foto_resep}
							alt="Foto Resep"
							className="max-h-52 object-contain rounded-md shadow-md"
						/>
					</div>

					{/* Stepper */}
					<div className="flex flex-col relative ml-4 mb-8">
						{status.map((s, idx) => {
							const isActive = idx <= currentStepIndex;

							return (
								<div className="flex items-start gap-3 relative" key={s.label}>
									<div className="flex flex-col items-center">
										<div
											className={`w-4 h-4 rounded-full 
												${rescription.status === 'DITOLAK'
													? "bg-red-600"
													: isActive
														? "bg-green-500"
														: "bg-gray-300"
												}`}
										/>
										{idx < status.length - 1 && (
											<div
												className={`w-[2px] h-8 ${rescription.status === 'DITOLAK'
													? "bg-red-600"
													: idx < currentStepIndex
														? "bg-green-500"
														: "bg-gray-300"
													}`}
											/>
										)}
									</div>
									<span
										className={`text-sm 
											${rescription.status === 'DITOLAK'
												? "text-red-600 font-semibold"
												: isActive
													? "text-black font-semibold"
													: "text-gray-400"
											}`}
									>
										{s.label}
									</span>
								</div>
							);
						})}
					</div>

					{/* Info resep */}
					<div className="border rounded-md p-4 mb-6">
						<p>
							<span className="font-semibold">Nama File:{" "}</span>
							<Link
								href={rescription.foto_resep}
								target="_blank"
								className="underline text-blue-600 hover:text-blue-400"
							>
								Foto Resep
							</Link>
						</p>
						<p>
							<span className="font-semibold">Tanggal Upload: </span>
							{rescription.tanggal_pengajuan.toLocaleDateString()}
						</p>
						<p>
							<span className="font-semibold">Status: </span>
							{rescription.status === 'MENGAJUKAN'
								? "Menunggu Konfirmasi"
								: rescription.status === 'DITERIMA'
									? "Selesai"
									: "Ditolak"
							}
						</p>
						<p>
							<span className="font-semibold">Catatan:</span>{" "}
							{rescription.status === "DITOLAK"
								? "Resep ditolak."
								: rescription.catatan
									? rescription.catatan
									: "Tidak ada catatan."
							}
						</p>
					</div>

					{/* Keranjang customer */}
					<div className="mb-4">
						<h4 className="font-semibold mb-2">Daftar Barang Pesanan</h4>
						{isLoading ? (
							<p className="text-sm text-gray-500 animate-pulse">Memuat pesanan...</p>
						) : (
							cart.length === 0 ? (
								<p className="text-sm text-gray-500">Belum ada barang yang dipilih.</p>
							) : (
								<ul className="list-disc ml-5 text-sm">
									{cart.map(item => (
										<li key={item.id}>
											{item.barang.nama_barang} (x{item.jumlah})
										</li>
									))}
								</ul>
							)
						)}
					</div>

					<Dialog.Close asChild>
						<Button variant="outline" className="mt-6 w-full cursor-pointer">
							Tutup
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
