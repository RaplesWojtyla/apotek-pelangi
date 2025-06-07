import Banner from "@/components/Banner";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import SkeletonKategori from "@/components/skeleton/SkeletonKategori";
import TebusResep from "@/components/TebusResep";
import { Suspense } from "react";
import CardProducts from "@/components/CardProducts";
import Kategori from "@/components/Kategori";
import Link from "next/link";

export default function CustomerPage() {
	return (
		<div className="flex flex-col">
			<Banner />
			<Suspense fallback={<SkeletonKategori />}>
				<Kategori />
			</Suspense>
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold">Produk Terbaru</h2>
						<Link href={'/customer/catalog'} className="text-sm text-cyan-700 hover:underline">
							Lihat Semua
						</Link>
					</div>					<Suspense fallback={<SkeletonCard />}>
						<CardProducts />
					</Suspense>
				</div>
			</section>

			<TebusResep />
		</div>
	);
}

