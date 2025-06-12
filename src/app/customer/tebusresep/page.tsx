import UploadResepForm from "@/components/customer/UploadResepForm";
import TutorTebus from "@/components/TutorTebus";
import Link from "next/link";

export default function TebusResep() {

	return (
		<div className="min-h-screen bg-white p-4 md:p-8 max-w-3xl mx-auto">
			<div className="pt-10" />
			<h1 className="text-2xl font-bold mb-2 text-cyan-700">Tebus Resep</h1>

			<p className="text-sm text-gray-600 mb-6">
				Unggah foto resep dari dokter untuk kami proses. Setelah disetujui, obat akan masuk ke keranjang dan bisa dibayar melalui halaman checkout.
			</p>

			<UploadResepForm />

			{/* Directions / Next steps */}
			<div className="mb-6 text-center text-sm text-gray-700">
				<p>
					Setelah mengupload resep, kamu bisa cek status penebusan di halaman{" "}
					<Link
						href="/customer/tebusresep/list"
						className="text-cyan-600 font-semibold underline"
					>
						Daftar Penebusan Resep
					</Link>
					.
				</p>
			</div>

			<TutorTebus />
		</div>
	);
}
