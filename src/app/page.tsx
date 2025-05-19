import Image from "next/image";

export default function Home() {
	return (
		<>
			<section className="flex-grow">
				<div className="bg-cyan-600 text-white px-6 md:px-12 py-16">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Tentang Apotek Pelangi</h1>
					<p className="text-lg font-semibold mb-4">
						Apotek Pelangi adalah solusi terlengkap untuk kebutuhan Kesehatan harian Anda
					</p>
					<p className="max-w-2xl text-sm md:text-base leading-relaxed">
						Dapatkan semua kebutuhan Kesehatan Anda dengan mudah melalui ekosistem kami.
						Kami bermitra dengan 7.000+ Mitra Apotek Pelangi yang menyediakan 50.000+ produk
						dan menjangkau 480+ kota di seluruh Indonesia.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 mt-10 text-center">
						<div className="rounded-xl py-4">
							<p className="text-2xl font-bold">7,000+</p>
							<p className="text-sm mb-4">Mitra Apotek Pelangi</p>
							<button className="text-yellow-400 font-semibold border border-yellow-400 rounded-full px-4 py-2 hover:bg-yellow-400 hover:text-[#002A5C] transition">
								Belanja Produk
							</button>
						</div>
						<div className="rounded-xl py-4">
							<p className="text-2xl font-bold">50,000+</p>
							<p className="text-sm mb-4">Produk Tersedia</p>
							<button className="text-yellow-400 font-semibold border border-yellow-400 rounded-full px-4 py-2 hover:bg-yellow-400 hover:text-[#002A5C] transition">
								Menjadi Mitra Apotik
							</button>
						</div>
						<div className="rounded-xl py-4">
							<p className="text-2xl font-bold">480+</p>
							<p className="text-sm mb-4">Jangkauan Kota</p>
							<button className="text-yellow-400 font-semibold border border-yellow-400 rounded-full px-4 py-2 hover:bg-yellow-400 hover:text-[#002A5C] transition">
								Layanan untuk Brand
							</button>
						</div>
					</div>
				</div>
			</section>

			<section className="px-6 md:px-12 py-16 bg-white">
				<div className="flex flex-col md:flex-row gap-10 items-start">
					<div className="md:w-1/2">
						<h2 className="text-xl font-semibold mb-2">Belanja Produk</h2>
						<h3 className="text-2xl md:text-3xl font-bold italic mb-6">
							<span className="not-italic font-bold">Marketplace </span>
							Khusus Untuk Produk Kesehatan
						</h3>
						<p className="text-sm md:text-base leading-relaxed">
							Unduh aplikasi gapotik dan temukan kemudahan akses ke lebih dari 50.000 produk kesehatan,
							mulai dari obat-obatan, vitamin, suplemen, hingga peralatan medis. Nikmati fitur-fitur
							unggulan seperti konsultasi online dengan apoteker, konsultasi dengan dokter, dan layanan
							antar cepat langsung ke rumah Anda.
						</p>
					</div>

					<div className="md:w-1/2 flex justify-center">
						<div className="w-full h-full rounded-xl flex justify-center">
							<Image src="/img/gambarobat.png" alt="Kategori Produk" width={400} height={400} />
						</div>
					</div>
				</div>
			</section>

			<section className="px-6 md:px-12 py-16 bg-white">
				<h2 className="text-xl font-semibold mb-2">Kategori Produk</h2>
				<h3 className="text-2xl md:text-3xl font-bold italic mb-10">
					<span className="not-italic font-bold">Temukan </span>
					Produk Sesuai Kebutuhan Anda
				</h3>

				<div className="flex flex-col md:flex-row gap-10">
					<div className="md:w-1/2 flex justify-center">
						<div className="w-full rounded-xl flex items-center justify-center">
							<Image src="/img/gambarobat.png" alt="Kategori Produk" width={400} height={400} />
						</div>
					</div>

					{/* Grid Kategori */}
					<div className="md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-6">
						{[
							"Obat Bebas",
							"Obat Resep",
							"Suplemen",
							"Vitamin",
							"Alat Kesehatan",
							"Ibu & Anak",
						].map((label, index) => (
							<div
								key={index}
								className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center text-center"
							>
								<div className="w-12 h-12 bg-[#002A5C] rounded-full flex items-center justify-center mb-3">
									<span className="text-white text-xl">💊</span>
								</div>
								<span className="text-sm font-medium">{label}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white py-16 px-6 md:px-12">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
					Tersedia produk berdasarkan <span className="bg-yellow-400 px-2">kondisi kesehatanmu</span>
				</h2>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8 justify-items-center">
					{[
						{ label: 'Batuk & Flu', icon: '/img/logosementara.png' },
						{ label: 'Diabetes', icon: '/img/logosementara.png' },
						{ label: 'Antibiotik', icon: '/img/logosementara.png' },
						{ label: 'Anti Nyeri', icon: '/img/logosementara.png' },
						{ label: 'Jantung', icon: '/img/logosementara.png' },
						{ label: 'Demam', icon: '/img/logosementara.png' },
						{ label: 'Diare', icon: '/img/logosementara.png' },
						{ label: 'Hipertensi', icon: '/img/logosementara.png' },
						{ label: 'Antiseptik', icon: '/img/logosementara.png' },
						{ label: 'Lambung', icon: '/img/logosementara.png' },
						{ label: 'Vertigo', icon: '/img/logosementara.png' },
						{ label: 'Diet', icon: '/img/logosementara.png' },
						{ label: 'Consumer Goods', icon: '/img/logosementara.png' },
						{ label: 'Asma', icon: '/img/logosementara.png' },
					].map((item, i) => (
						<div key={i} className="flex flex-col items-center text-center space-y-2">
							<div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
								<img src={item.icon} alt={item.label} className="w-8 h-8" />
							</div>
							<span className="text-sm font-medium">{item.label}</span>
						</div>
					))}
				</div>

				<div className="flex justify-center mt-10">
					<button className="bg-[#0050B3] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#003f8c] transition">
						Lihat Katalog Produk
					</button>
				</div>
			</section>

		</>
	);
}
