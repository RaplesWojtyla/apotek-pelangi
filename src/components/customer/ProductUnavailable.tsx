import { PackageX, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductUnavailable() {
	return (
		<div className="md:col-span-2 flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md h-full min-h-[400px] border border-gray-200 dark:border-gray-700">
			<PackageX className="w-24 h-24 text-red-500 mb-6" />
			<div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
				<AlertCircle className="w-5 h-5" />
				<span className="font-medium">Pemberitahuan</span>
			</div>
			<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
				Produk Tidak Tersedia
			</h2>
			<p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
				Maaf, produk yang Anda cari saat ini tidak dapat ditampilkan. Kemungkinan stok telah habis atau produk sudah tidak dijual lagi.
			</p>
			<Link
				href="/customer/catalog"
				className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-150"
			>
				<ArrowLeft className="w-5 h-5" />
				Kembali ke Katalog Produk
			</Link>
		</div>
	)
}
