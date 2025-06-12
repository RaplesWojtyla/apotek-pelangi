"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Rescription } from "@/action/customer/resep.action"
import { getCartBySource, RescriptionCartItem } from "@/action/customer/cart.action"
import toast from "react-hot-toast"
import { ScrollArea } from "./ui/scroll-area"
import { Loader2, PackageOpen } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogPortal, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ItemForCheckout, useCartContext } from "@/context/CartContext"
import { useRouter } from "next/navigation"


const rejectedStatus = [
	{ label: "Diajukan", value: "MENGAJUKAN" },
	{ label: "Menunggu Konfirmasi", value: "MENGAJUKAN" },
	{ label: "Resep Obat Ditolak", value: "DITOLAK" },
]

const idealStatus = [
	{ label: "Diajukan", value: "MENGAJUKAN" },
	{ label: "Menunggu Konfirmasi", value: "MENGAJUKAN" },
	{ label: "Resep Obat Diterima", value: "DITERIMA" },
]

export default function DetailTebusResepDialogCustomer({ rescription }: { rescription: Rescription }) {
	const [open, setOpen] = useState(false)
	const [carts, setCarts] = useState<RescriptionCartItem[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isCheckout, setIsCheckout] = useState<boolean>(false)
	const { setCheckoutItemsHandler } = useCartContext()
	const router = useRouter()

	useEffect(() => {
		const fetchCart = async () => {
			setIsLoading(true)

			try {
				const res = await getCartBySource(rescription.id, "RESEP")

				if (res.success) {
					setCarts(res.data)
				} else {
					toast.error(res.message || "Gagal mengambil data pesanan!")
					setCarts([])
				}
			} catch (error) {
				console.error(`[fetchCart] Error: ${error}`)

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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="cursor-pointer" variant="outline" size="sm">
					Lihat Status Penebusan
				</Button>
			</DialogTrigger>

			<DialogPortal>
				<DialogContent className="fixed top-1/2 left-1/2 max-w-md w-full bg-white p-6 rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[90vh]">
					<DialogTitle className="text-lg font-bold mb-4 text-cyan-700">
						Status Penebusan Resep
					</DialogTitle>

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
							const isActive = idx <= currentStepIndex
							const isRejected = rescription.status === 'DITOLAK' && idx === status.length - 1

							return (
								<div className="flex items-start gap-3 relative" key={s.label}>
									<div className="flex flex-col items-center">
										<div
											className={`w-4 h-4 rounded-full 
												${isRejected
													? "bg-red-600"
													: isActive
														? "bg-green-500"
														: "bg-gray-300"
												}`}
										/>
										{idx < status.length - 1 && (
											<div
												className={`w-[2px] h-8 ${rescription.status === 'DITOLAK' && idx === status.length - 2
													? " bg-gradient-to-b from-green-500 to-red-500"
													: isActive
														? "bg-green-500"
														: "bg-gray-300"
													}`}
											/>
										)}
									</div>
									<span
										className={`text-sm 
											${isRejected
												? "text-red-600 font-semibold"
												: isActive
													? "text-black font-semibold"
													: "text-gray-400"
											}`}
									>
										{s.label}
									</span>
								</div>
							)
						})}
					</div>

					{/* Info resep */}
					<div className="border rounded-md p-4 mb-6">
						<p>
							<span className="font-semibold">Kode Tebus Resep:{" "}</span>
							{rescription.id}
						</p>
						<p>
							<span className="font-semibold">Tanggal Upload: </span>
							{rescription.tanggal_pengajuan.toLocaleDateString('id-ID')}
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
							{rescription.catatan || '-'}
						</p>
						<p className="text-primary">
							<span className="font-bold">Catatan Toko:</span>{" "}
							{rescription.catatan_toko || '-'}
						</p>
					</div>

					{/* Keranjang customer */}
					<div className="mb-4">
						<h4 className="font-semibold mb-2">Daftar Barang Tebus Resep</h4>
						{isLoading ? (
							<p className="text-sm text-gray-500 animate-pulse">Memuat pesanan...</p>
						) : (
							<ScrollArea className="border rounded-md p-2 h-48">
								{carts.length > 0 ? (
									carts.map(item => {
										const imgUrl = item.barang.foto_barang

										return (
											<div key={item.id_barang} className="flex items-center gap-4 hover:bg-gray-50">
												<Image
													src={imgUrl.includes('https') ? imgUrl : `/${imgUrl}`}
													alt={`Gambar ${item.barang.nama_barang}`}
													width={100}
													height={100}
													className="object-contain rounded-md"
												/>
												<div>
													<p className="font-semibold">{item.barang.nama_barang}</p>
													<p className="text-sm text-gray-600">
														Rp {item.barang.harga_jual.toLocaleString("id-ID")} x {item.jumlah}
													</p>
													<p className="font-bold mt-1 text-gray-800">
														Rp {(item.barang.harga_jual * item.jumlah).toLocaleString('id-ID')}
													</p>
												</div>
											</div>
										)
									})
								) : (
									<div className="flex flex-col items-center justify-center h-full text-gray-500">
										<PackageOpen size={32} className="mb-2" />
										<p className="text-sm text-center">Belum ada barang</p>
									</div>
								)}
							</ScrollArea>
						)}
					</div>

					<DialogFooter className="items-center pt-4 border-t sticky bottom-0 bg-background pb-2 -mb-2">
						<DialogClose asChild>
							<Button 
								variant="outline" 
								className="cursor-pointer"
							>
								Tutup
							</Button>
						</DialogClose>

						<Button
							className="cursor-pointer"
							onClick={() => router.push("/customer/cart")}
							disabled={isLoading || rescription.status !== 'DITERIMA'}
						>
							Lihat Keranjang
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}
