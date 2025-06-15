'use client'

import { Trash2 } from 'lucide-react'
import { useMemo, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import { prosesTransaksi } from '@/action/kasir/transaction.action'
import { UploadDropzone } from '@/utils/uploadthing'
import Image from 'next/image'
import { CartItem } from '@/app/kasir/page'
import MemberVerification from './MemberVerification'
import { createPortal } from 'react-dom'
import { VerifiedMember } from '@/action/kasir/user.action'

interface Props {
	items: CartItem[]
	onUpdateQty: (id: string, newQty: number) => void
	onRemoveItem: (id: string) => void
	onClearCart: () => void
}

export default function Keranjang({
	items,
	onUpdateQty,
	onRemoveItem,
	onClearCart,
}: Props) {
	const [amountPaid, setAmountPaid] = useState(0)
	const [resepChecked, setResepChecked] = useState<Record<string, boolean>>({})
	const [showConfirm, setShowConfirm] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [resepImage, setResepImage] = useState<string | null>(null)
	const [verifiedMemberId, setVerifiedMemberId] = useState<string | null>(null)

	const formRef = useRef<HTMLFormElement>(null)

	const total = useMemo(
		() => items.reduce((sum, item) => sum + item.harga_jual * item.quantity, 0),
		[items]
	)

	const change = amountPaid - total
	const anyResep = items.some(item => resepChecked[item.id])

	const handleMemberVerification = (member: VerifiedMember | null) => {
		setVerifiedMemberId(member?.id || null)
	} 

	const handleSubmit = async () => {
		if (!formRef.current) return
		const formData = new FormData(formRef.current)

		if (resepImage) {
			formData.append("resepImage", resepImage)
		}

		setIsSubmitting(true)
		try {
			await prosesTransaksi({
				id_customer: verifiedMemberId,
				items,
				bayar: Number(formData.get('amountPaid')),
				paymentMethod: String(formData.get('paymentMethod')),
				resepChecked,
				resepImage: formData.get('resepImage') as string | null,
			})

			toast.success('Transaksi berhasil disimpan')
			onClearCart()
			setAmountPaid(0)
			setResepChecked({})
			setShowConfirm(false)
			window.location.reload()
		} catch (err) {
			console.error('[Keranjang] Gagal simpan transaksi:', err)
			toast.error('Gagal menyimpan transaksi')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form ref={formRef} className="p-4 space-y-4">
			{items.length === 0 && (
				<p className="text-sm text-gray-500">Keranjang masih kosong</p>
			)}

			{items.length > 0 && (
				<div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
					{items.map(item => (
						<div key={item.id} className="border-b pb-3 space-y-1">
							{/* Baris 1: Nama + Checkbox */}
							<div className="flex justify-between items-start">
								<h3 className="font-semibold">{item.nama_barang}</h3>
								<label className="flex items-center space-x-1 text-sm text-gray-700">
									<span>Resep</span>
									<input
										type="checkbox"
										checked={!!resepChecked[item.id]}
										onChange={e =>
											setResepChecked(prev => ({
												...prev,
												[item.id]: e.target.checked,
											}))
										}
										title="Gunakan resep"
										className="h-4 w-4"
									/>
								</label>
							</div>

							{/* Baris 2: Harga satuan + total */}
							<div className="flex justify-between text-sm text-gray-600">
								<p>Rp {item.harga_jual.toLocaleString('id-ID')}</p>
								<p>Rp {(item.harga_jual * item.quantity).toLocaleString('id-ID')}</p>
							</div>

							{/* Baris 3: Kontrol qty + tombol hapus */}
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-2 mt-1">
									<Button
										type="button"
										size="icon"
										variant="outline"
										onClick={() => onUpdateQty(item.id, item.quantity - 1)}
										disabled={item.quantity <= 1}
									>
										−
									</Button>
									<span>{item.quantity}</span>
									<Button
										type="button"
										size="icon"
										variant="outline"
										onClick={() => onUpdateQty(item.id, item.quantity + 1)}
										disabled={item.quantity >= item.stok_barang}
									>
										+
									</Button>
								</div>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									onClick={() => onRemoveItem(item.id)}
									className="text-red-500"
								>
									<Trash2 size={16} />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}

			{anyResep && (
				resepImage ? (
					<div className="p-4 border rounded-lg text-center bg-gray-50">
						<Image
							src={resepImage}
							alt="Preview Resep"
							width={200}
							height={200}
							className="mx-auto rounded-md mb-4"
						/>
						<p className="text-sm text-gray-600 mb-4">Upload berhasil!</p>
						<Button
							variant="destructive"
							size="sm"
							className="gap-2 cursor-pointer"
							onClick={() => setResepImage(null)}
						>
							<Trash2 size={16} /> Hapus & Upload Ulang
						</Button>
					</div>
				) : (
					<div>
						<UploadDropzone
							endpoint={'resepImgKasirUploader'}
							onClientUploadComplete={res => {
								if (res && res.length > 0) {
									setResepImage(res[0].ufsUrl)
									toast.success("Foto resep berhasil diunggah!")
								}
							}}
							onUploadError={(error: Error) => {
								toast.error(error.message || "Gagal mengupload foto resep")
							}}
							config={{
								mode: 'auto'
							}}
						/>
					</div>
				)
			)}

			{items.length > 0 && (
				<>
					<MemberVerification onVerify={handleMemberVerification} />
					<div>
						<Label htmlFor="amountPaid" className="text-sm">Jumlah Bayar</Label>
						<Input
							id="amountPaid"
							name="amountPaid"
							type="number"
							placeholder="Masukkan jumlah bayar"
							value={amountPaid}
							onChange={e => setAmountPaid(Number(e.target.value))}
						/>
					</div>

					<div className="text-sm text-gray-600">
						Total: <strong className="text-orange-500">Rp {total.toLocaleString('id-ID')}</strong><br />
						Kembalian: Rp {change > 0 ? change.toLocaleString('id-ID') : 0}
					</div>

					<div className="flex gap-4">
						<label className="flex items-center space-x-2">
							<input type="radio" name="paymentMethod" value="tunai" defaultChecked />
							<span className="text-sm">Tunai</span>
						</label>
					</div>

					<Button
						type="button"
						onClick={() => setShowConfirm(true)}
						disabled={amountPaid < total || isSubmitting}
						className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
					>
						Simpan Transaksi
					</Button>
				</>
			)}

			{showConfirm &&
				createPortal(
					<div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/50">
						<div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md space-y-4">
							<h2 className="text-lg font-semibold">Konfirmasi Transaksi</h2>
							<p>Apakah Anda yakin ingin menyimpan transaksi ini?</p>
							<div className="flex justify-end gap-2">
								<Button type="button" variant="outline" onClick={() => setShowConfirm(false)}>
									Batal
								</Button>
								<Button
									type="button"
									className="bg-cyan-600 text-white hover:bg-cyan-700"
									onClick={handleSubmit}
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Menyimpan...' : 'Ya, Simpan'}
								</Button>
							</div>
						</div>
					</div>,
					document.body
				)}
		</form>
	)
}
