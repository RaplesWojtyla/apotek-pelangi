'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type JenisBarang } from "@prisma/client"
import { ProductForEdit } from "@/action/admin/product.action"

export default function ViewObatClient({ product, jenisBarangList }: { product: ProductForEdit, jenisBarangList: JenisBarang[] }) {
	return (
		<div className="min-h-screen px-4 py-6 md:px-6 lg:px-8 bg-background text-foreground">
			<div className="mb-6 text-sm text-muted-foreground">
				<Link href="/admin/daftarobat" className="hover:underline">Daftar Produk</Link>
				&gt; <span className="text-foreground font-medium">Informasi Produk: {product.nama_barang}</span>
			</div>
			<h1 className="text-3xl font-bold mb-8">Informasi Produk</h1>

			<section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
				<h2 className="text-lg font-semibold mb-4">Informasi Utama Produk</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label>Nama Produk<span className="text-red-500">*</span></Label>
						<Input name="nama_barang" defaultValue={product.nama_barang} placeholder="Contoh: Paracetamol 500 mg tablet" required disabled />
					</div>
					<div className="space-y-2">
						<Label>Jenis Produk<span className="text-red-500">*</span></Label>
						<Select name="id_jenis_barang" defaultValue={product.id_jenis_barang} required disabled >
							<SelectTrigger className="w-full h-12 text-sm md:text-base">
								<SelectValue placeholder="Pilih jenis" />
							</SelectTrigger>
							<SelectContent>
								{jenisBarangList.map(jenis => (
									<SelectItem key={jenis.id} value={jenis.id}>{jenis.nama_jenis}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Golongan<span className="text-red-500">*</span></Label>
						<Select name="golongan" defaultValue={product.detail_barang?.golongan!} required disabled >
							<SelectTrigger className="w-full h-12 text-sm md:text-base">
								<SelectValue placeholder="Pilih golongan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Obat Bebas">Obat Bebas</SelectItem>
								<SelectItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</SelectItem>
								<SelectItem value="Obat Keras">Obat Keras</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Kemasan<span className="text-red-500">*</span></Label>
						<Select name="kemasan" defaultValue={product.detail_barang?.kemasan!} required disabled >
							<SelectTrigger className="w-full h-12 text-sm md:text-base">
								<SelectValue placeholder="Pilih jenis kemasan" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Strip 10 tablet">Strip</SelectItem>
								<SelectItem value="Box isi 10 strip">Box</SelectItem>
								<SelectItem value="Botol 60 ml">Botol</SelectItem>
								<SelectItem value="Tube 5 gram">Tube</SelectItem>
								<SelectItem value="Sachet 5 gram">Sachet</SelectItem>
								<SelectItem value="Kaplet dalam blister">Blister</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2 md:col-span-2">
						<Label>Harga Jual (Rp)<span className="text-red-500">*</span></Label>
						<Input name="harga_jual" type="number" min={1000} step={1000} defaultValue={product.harga_jual} placeholder="Contoh: 5000" required disabled />
					</div>
				</div>
			</section>

			<section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
				<h2 className="text-lg font-semibold mb-4">Detail Tambahan (Informasi Obat)</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label>Deskripsi</Label>
						<Textarea name="deskripsi" defaultValue={product.detail_barang?.deskripsi!} placeholder="Deskripsi singkat mengenai produk, kegunaan utama, dan keunggulannya." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Indikasi Umum</Label>
						<Textarea name="indikasi_umum" defaultValue={product.detail_barang?.indikasi_umum!} placeholder="Digunakan untuk menurunkan demam dan meredakan nyeri ringan hingga sedang." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Komposisi</Label>
						<Textarea name="komposisi" defaultValue={product.detail_barang?.komposisi!} placeholder="Tiap tablet mengandung Paracetamol 500 mg" rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Dosis</Label>
						<Textarea name="dosis" defaultValue={product.detail_barang?.dosis!} placeholder="Dewasa: 1 tablet setiap 4-6 jam, maksimal 8 tablet per hari." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Aturan Pakai</Label>
						<Textarea name="aturan_pakai" defaultValue={product.detail_barang?.aturan_pakai!} placeholder="Dikonsumsi setelah makan dengan air putih." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Perhatian</Label>
						<Textarea name="perhatian" defaultValue={product.detail_barang?.perhatian!} placeholder="Tidak dianjurkan untuk penggunaan jangka panjang tanpa pengawasan medis." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Kontra Indikasi</Label>
						<Textarea name="kontra_indikasi" defaultValue={product.detail_barang?.kontra_indikasi!} placeholder="Hipersensitif terhadap paracetamol atau komponen lain dalam obat ini." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Efek Samping</Label>
						<Textarea name="efek_samping" defaultValue={product.detail_barang?.efek_samping!} placeholder="Mual, ruam kulit, reaksi alergi." rows={3} disabled />
					</div>
					<div className="space-y-2">
						<Label>Manufaktur</Label>
						<Input name="manufaktur" defaultValue={product.detail_barang?.manufaktur!} placeholder="Contoh: PT Kimia Farma Tbk" disabled />
					</div>
					<div className="space-y-2">
						<Label>No BPOM</Label>
						<Input name="no_bpom" defaultValue={product.detail_barang?.no_bpom!} placeholder="Contoh: DTL1234567890A1" disabled />
					</div>
				</div>

				<div className="mt-6 md:col-span-2">
					<p className="text-sm text-gray-600">Total Stok Saat Ini: <span className="font-bold underline">{product.totalStock}</span></p>
				</div>
			</section>

			<section className="bg-card p-6 rounded-xl shadow-sm border mb-8">
				<h2 className="text-lg font-semibold mb-6">Batch Produk</h2>
				<h3 className="text-md font-semibold mb-4">Daftar Batch Tersedia</h3>
				<div className="rounded-md border overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Kode Batch</TableHead>
								<TableHead>Tanggal Masuk</TableHead>
								<TableHead>Tgl Kadaluarsa</TableHead>
								<TableHead>Jumlah</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{product.stok_barang.length > 0 ? product.stok_barang.map(batch => (
								<TableRow key={batch.id}>
									<TableCell>{batch.kode_batch || "-"}</TableCell>
									<TableCell>{new Date(batch.tanggal_masuk).toLocaleDateString('id-ID')}</TableCell>
									<TableCell>{batch.tanggal_kadaluarsa ? new Date(batch.tanggal_kadaluarsa).toLocaleDateString('id-ID') : 'N/A'}</TableCell>
									<TableCell>{batch.jumlah}</TableCell>
								</TableRow>
							)) : (
								<TableRow>
									<TableCell colSpan={4} className="text-center text-muted-foreground">Belum ada batch stok.</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</section>
		</div>
	)
}