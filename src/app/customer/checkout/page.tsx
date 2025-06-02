'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartContext } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { DbUser, getUserByClerkId } from "@/action/user.action";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MoveRight } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutPayload, processCheckout } from "@/action/customer/checkout.action";

interface CheckoutFormData {
	namaPenerima: string
	nomorTelepon: string
	alamatPengiriman: string
	metodePembayaran: string | null
	keterangan?: string
}

export default function CheckoutPage() {
	const { checkoutItems, clearCheckoutItemsHandler, fetchAndUpdateCartCount: updateCartBadge } = useCartContext()
	const { user: clerkUser, isSignedIn } = useUser()
	const router = useRouter()
	const pathname = usePathname()

	const [dbUser, setDbUser] = useState<DbUser>(null)
	const [formData, setFormData] = useState<CheckoutFormData>({
		namaPenerima: "",
		nomorTelepon: "",
		alamatPengiriman: "",
		metodePembayaran: null,
		keterangan: ""
	})

	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	useEffect(() => {
		const fetchDbUser = async () => {
			if (isSignedIn && clerkUser) {
				setIsLoadingUser(true)
				try {
					const userFromDb = await getUserByClerkId(clerkUser.id)

					if (userFromDb) {
						setDbUser(userFromDb)

						setFormData(prev => ({
							...prev,
							namaPenerima: userFromDb.nama || clerkUser.fullName || "",
							nomorTelepon: userFromDb.no_hp || clerkUser.phoneNumbers?.[0]?.phoneNumber || "",
							alamatPengiriman: userFromDb.alamat || ""
						}))
					}
				} catch (error) {
					console.error("[fetchDbUser] gagal mengambil data user dari DB: ", error)
					toast.error("Gagal memuat data pengguna")
				} finally {
					setIsLoadingUser(false)
				}
			}
		}

		fetchDbUser()
	}, [isSignedIn, clerkUser])

	useEffect(() => {
		if (!isLoadingUser && checkoutItems.length === 0 && !isSubmitting) {
			toast.error("Tidak ada item untuk checkout. Mengarahkan kembali ke keranjang.", { duration: 3000 })
			router.replace('/customer/cart')
		}
	}, [checkoutItems, isLoadingUser, router])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target

		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handlePaymentMethodChange = (paymentMethod: string) => {
		setFormData(prev => ({
			...prev,
			metodePembayaran: paymentMethod
		}))
	}

	const subTotal = checkoutItems.reduce((acc, item) => acc + (item.hargaJual * item.jumlah), 0)
	const grandTotal = subTotal

	const handleBooking = async () => {
		if (!isSignedIn) {
			toast.error("Anda harus login untuk melanjutkan.");
			return;
		}

		if (checkoutItems.length === 0) {
			toast.error("Keranjang checkout kosong.");
			return;
		}

		if (!formData.namaPenerima.trim()) {
			toast.error("Nama penerima wajib diisi.");
			return;
		}

		const trimmedPhoneNumber = formData.nomorTelepon.trim()

		if (!trimmedPhoneNumber) {
			toast.error("Nomor telepon wajib diisi.");
			return;
		}

		if (!trimmedPhoneNumber.startsWith('08')) {
			toast.error("Nomor telepon harus diawali dengan '08'.");
			return;
		}

		if (trimmedPhoneNumber.length < 9) {
			toast.error("Nomor telepon minimal harus 9 digit.");
			return;
		}

		if (!formData.metodePembayaran) {
			toast.error("Metode pembayaran wajib dipilih.");
			return;
		}

		setIsSubmitting(true)

		const payload: CheckoutPayload = {
			items: checkoutItems.map(item => ({
				id_cart: item.idCart,
				id_barang: item.idBarang,
				jumlah: item.jumlah,
				harga_saat_checkout: item.hargaJual,
				sumber: item.sumber
			})),
			namaPenerima: formData.namaPenerima,
			nomorTelepon: formData.nomorTelepon,
			metodePembayaran: formData.metodePembayaran,
			alamatPengiriman: formData.alamatPengiriman,
			keterangan: formData.keterangan
		}

		try {
			const res = await processCheckout(payload)

			if (res.success && res.fakturId) {
				toast.success(res.message || "Pesanan berhasil dibuat", {
					duration: 4200
				})

				clearCheckoutItemsHandler()
				await updateCartBadge()
				router.push(`/customer/invoice/${res.fakturId}`)
			} else {
				toast.error(res.message || "Gagal membuat pesanan", {
					duration: 4000
				})
			}
		} catch (error: any) {
			console.error(`[handleBooking] Error: ${error}`);

			toast.error(error.message || "Terjadi kesalahan.")
		} finally {
			setIsSubmitting(false)
		}
	}

	if ((isLoadingUser || (isSignedIn && checkoutItems.length === 0 && !pathname.startsWith('/customer/cart'))) && !isSubmitting) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
				<Loader2 className="h-16 w-16 animate-spin text-cyan-500" />
				<p className="text-xl font-semibold text-muted-foreground mt-4">
					Sedang memuat data...
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:p-10">
			<h1 className="text-3xl font-bold mb-6">Pembayaran</h1>

			{checkoutItems.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Form: Info Penerima + Metode Pembayaran */}
					<div className="lg:col-span-2 space-y-6">
						<Card className="p-6 space-y-6">
							<div>
								<h2 className="text-xl font-bold mb-4">Informasi Penerima</h2>
								<div className="space-y-4">
									<div>
										<label htmlFor="namaPenerima" className="font-medium">Nama Penerima</label>
										<Input
											id="namaPenerima"
											name="namaPenerima"
											placeholder="Masukkan nama penerima"
											value={formData.namaPenerima}
											onChange={handleInputChange}
											className="mt-1"
											disabled={isSubmitting}
										/>
									</div>
									<div>
										<label htmlFor="nomorTelepon" className="font-medium">Nomor Telepon</label>
										<Input
											id="nomorTelepon"
											name="nomorTelepon"
											type="number"
											className="mt-1"
											placeholder="Masukkan nomor telepon"
											value={formData.nomorTelepon}
											onChange={handleInputChange}
											disabled={isSubmitting}
										/>
									</div>
									<div>
										<label htmlFor="keterangan" className="font-medium block mb-1">Catatan Tambahan (Opsional)</label>
										<Textarea
											id="keterangan"
											name="keterangan"
											value={formData.keterangan || ""}
											onChange={handleInputChange}
											placeholder="Catatan untuk penjual..."
											className="mt-1"
											disabled={isSubmitting}
										/>
									</div>
								</div>
							</div>

							{/* Metode Pembayaran */}
							<div>
								<h2 className="text-xl font-bold mb-4">Pilih Metode Pembayaran</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{[
										{ method: "DANA", value: "dana"},
										{ method: "GOPAY", value: "gopay"},
										{ method: "QRIS", value: "other_qris"},
										{ method: "BANK TRANSFER", value: "bank_transfer"},
									].map(methodObj => (
										<Button
											key={methodObj.method}
											variant={formData.metodePembayaran === methodObj.value ? "default" : "outline"}
											className="justify-between w-full py-8"
											onClick={() => handlePaymentMethodChange(methodObj.value)}
											disabled={isSubmitting}
										>
											{methodObj.method} <MoveRight />
										</Button>
									))}
								</div>
								{formData.metodePembayaran && (
									<p className="text-sm mt-2">Metode Pembayaran: <strong>{formData.metodePembayaran}</strong></p>
								)}
							</div>
						</Card>
					</div>

					{/* Ringkasan Order */}
					<div className="space-y-4">
						<Card className="p-6">
							<h2 className="text-xl font-bold">Order</h2>
							<div>
								<ScrollArea className="h-72 pr-4">
									{checkoutItems.map(item => (
										<div key={item.idBarang}>
											<div
												className="flex items-center gap-3"
											>
												<Image
													src={`/${item.fotoBarang}`}
													alt={`Img: ${item.namaBarang}`}
													width={40}
													height={40}
													className="rounded object-cover"
												/>
												<div className="flex-grow">
													<p className="text-sm font-medium">{item.namaBarang}</p>
													<p className="text-xs text-gray-600">Rp {item.hargaJual.toLocaleString('id-ID')} x {item.jumlah}</p>
												</div>
												<p className="text-sm font-semibold">Rp {(item.hargaJual * item.jumlah).toLocaleString('id-ID')}</p>
											</div>
											<Separator className="my-3" />
										</div>
									))}
								</ScrollArea>
							</div>
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span className="font-semibold">Rp {grandTotal.toLocaleString('id-ID')}</span>
							</div>
							<div className="flex justify-between">
								<span>Biaya lainnya</span>
								<span className="font-semibold">Rp 0,00</span>
							</div>
							<div className="flex justify-between text-lg font-bold">
								<span>Total</span>
								<span>Rp {grandTotal.toLocaleString('id-ID')}</span>
							</div>
						</Card>

						<Button
							className="w-full text-white font-semibold text-lg py-4 cursor-pointer"
							onClick={handleBooking}
							disabled={isSubmitting || checkoutItems.length === 0}
						>
							{isSubmitting && <Loader2 className="animate-spin mr-2 size-5" />}
							{isSubmitting ? "Memproses..." : "Buat Pesanan & Bayar"}
						</Button>
					</div>
				</div>
			) : (
				!isLoadingUser && !isSubmitting && <p className="text-center text-xl text-gray-600">Tidak ada item untuk di-checkout atau halaman di-refresh. Silakan kembali ke keranjang.</p>
			)}
		</div>
	);
}
