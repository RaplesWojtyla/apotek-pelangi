'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { getAllJenisBarang, createProduct } from "@/action/admin/product.action"
import { type JenisBarang } from "@prisma/client"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"
// --- Import Tambahan ---
import { UploadDropzone } from "@/utils/uploadthing"
import Image from "next/image"

export default function TambahObatPage() {
	const [jenisBarangList, setJenisBarangList] = useState<JenisBarang[]>([]);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	// --- State baru untuk URL gambar ---
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		const fetchJenisBarang = async () => {
			const data = await getAllJenisBarang();
			setJenisBarangList(data);
		};

		fetchJenisBarang();
	}, []);

	const handleSubmit = async (formData: FormData) => {
		if (imageUrl) {
			formData.append('foto_barang', imageUrl);
		}

		startTransition(async () => {
			const result = await createProduct(formData);
			if (result.success && result.data?.id) {
				toast.success(result.message + " Mengarahkan ke halaman edit...");
				router.push(`/admin/daftarobat/edit/${result.data.id}`);
			} else {
				toast.error(result.message || "Terjadi kesalahan.");
			}
		});
	};

	return (
		<form action={handleSubmit} className="min-h-screen px-4 py-6 md:px-6 lg:px-8 bg-background text-foreground">
			{/* Breadcrumb & Heading */}
			<div className="mb-6 text-sm text-muted-foreground">
				<Link href="/admin/daftarobat" className="hover:underline">Daftar Produk</Link>
				&gt; <span className="text-foreground font-medium">Tambah Produk</span>
			</div>
			<h1 className="text-3xl font-bold mb-8">Tambah Produk Baru</h1>

			{/* Informasi Produk */}
			<section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
				<h2 className="text-lg font-semibold mb-4">Informasi Utama Produk</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label>Nama Produk<span className="text-red-500">*</span></Label>
						<Input name="nama_barang" placeholder="Contoh: Paracetamol 500 mg tablet" required />
					</div>
					<div className="space-y-2">
						<Label>Jenis Produk<span className="text-red-500">*</span></Label>
						<Select name="id_jenis_barang" required>
							<SelectTrigger className="w-full h-12 text-sm md:text-base">
								<SelectValue placeholder="Pilih jenis" />
							</SelectTrigger>
							<SelectContent>
								{jenisBarangList.length === 0 ? (
									<SelectItem className="animate-pulse" value="memuat..." disabled>Memuat jenis produk...</SelectItem>
								) : (
									jenisBarangList.map(jenis => (
										<SelectItem key={jenis.id} value={jenis.id}>{jenis.nama_jenis}</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Golongan<span className="text-red-500">*</span></Label>
						<Select name="golongan" required>
							<SelectTrigger className="w-full h-12 text-sm md:text-base">
								<SelectValue placeholder="Pilih golongan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Obat bebas">Obat Bebas</SelectItem>
								<SelectItem value="Obat bebas terbatas">Obat Bebas Terbatas</SelectItem>
								<SelectItem value="Obat keras">Obat Keras</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Kemasan<span className="text-red-500">*</span></Label>
						<Select name="kemasan" required>
							<SelectTrigger className="w-full h-12 text-sm md:text-base">
								<SelectValue placeholder="Pilih jenis kemasan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Strip">Strip</SelectItem>
								<SelectItem value="Box">Box</SelectItem>
								<SelectItem value="Botol">Botol</SelectItem>
								<SelectItem value="Tube">Tube</SelectItem>
								<SelectItem value="Sachet">Sachet</SelectItem>
								<SelectItem value="Blister">Blister</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Harga Jual (Rp)<span className="text-red-500">*</span></Label>
						<Input name="harga_jual" type="number" placeholder="Contoh: 5000" required />
					</div>

					{/* --- BAGIAN INPUT FOTO --- */}
					<div className="space-y-2">
						<Label>Foto Produk</Label>
						{imageUrl ? (
							<div className="relative w-fit">
								<Image
									src={imageUrl}
									alt="Preview Foto Produk"
									width={150}
									height={150}
									className="rounded-md object-cover"
								/>
								<Button
									type="button"
									variant="destructive"
									size="icon"
									onClick={() => setImageUrl(null)}
									className="absolute top-1 right-1 h-7 w-7"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						) : (
							<UploadDropzone
								endpoint={'productImgUploader'}
								onClientUploadComplete={res => {
									if (res && res.length > 0) {
										setImageUrl(res[0].ufsUrl)
										toast.success("Berhasil mengunggah foto produk!")
									}
								}}
								onUploadError={(error: Error) => {
									toast.error(`Gagal upload: ${error.message}`);
								}}
								config={{ mode: 'auto' }}
								className="p-4 ut-label:text-sm ut-allowed-content:hidden"
							/>
						)}
						<p className="text-xs text-muted-foreground">
							Jika tidak diunggah, gambar default akan digunakan.
						</p>
					</div>
				</div>
			</section>

			{/* Detail Obat */}
			<section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
				<h2 className="text-lg font-semibold mb-4">Detail Tambahan (Informasi Obat)</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label>Deskripsi</Label>
						<Textarea name="deskripsi" placeholder="Deskripsi singkat mengenai produk, kegunaan utama, dan keunggulannya." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Indikasi Umum</Label>
						<Textarea name="indikasi_umum" placeholder="Digunakan untuk menurunkan demam dan meredakan nyeri ringan hingga sedang." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Komposisi</Label>
						<Textarea name="komposisi" placeholder="Tiap tablet mengandung Paracetamol 500 mg" rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Dosis</Label>
						<Textarea name="dosis" placeholder="Dewasa: 1 tablet setiap 4-6 jam, maksimal 8 tablet per hari." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Aturan Pakai</Label>
						<Textarea name="aturan_pakai" placeholder="Dikonsumsi setelah makan dengan air putih." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Perhatian</Label>
						<Textarea name="perhatian" placeholder="Tidak dianjurkan untuk penggunaan jangka panjang tanpa pengawasan medis." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Kontra Indikasi</Label>
						<Textarea name="kontra_indikasi" placeholder="Hipersensitif terhadap paracetamol atau komponen lain dalam obat ini." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Efek Samping</Label>
						<Textarea name="efek_samping" placeholder="Mual, ruam kulit, reaksi alergi." rows={3} />
					</div>
					<div className="space-y-2">
						<Label>Manufaktur</Label>
						<Input name="manufaktur" placeholder="Contoh: PT Kimia Farma Tbk" />
					</div>
					<div className="space-y-2">
						<Label>No BPOM</Label>
						<Input name="no_bpom" placeholder="Contoh: DTL1234567890A1" />
					</div>
				</div>
			</section>

			{/* Tombol Simpan */}
			<div className="flex justify-end">
				<Button
					className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base rounded-lg mb-8 gap-2"
					type="submit"
					disabled={isPending}
				>
					{isPending && <Loader2 className="w-4 h-4 animate-spin" />}
					Simpan & Lanjut Edit
				</Button>
			</div>
		</form>
	)
}