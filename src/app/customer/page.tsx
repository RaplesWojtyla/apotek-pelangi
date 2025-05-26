import Banner from "@/components/Banner";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import SkeletonKategori from "@/components/skeleton/SkeletonKategori";
import TebusResep from "@/components/TebusResep";
import { Suspense } from "react";
import CardProducts from "@/components/CardProducts";
import Kategori from "@/components/Kategori";

export default function CustomerPage() {
	return (
		<div className="flex flex-col">
			<Banner />
			<Suspense fallback={ <SkeletonKategori /> }>
				<Kategori />
			</Suspense>
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<Suspense fallback={ <SkeletonCard /> }>
						<CardProducts />
					</Suspense>
				</div>
			</section>
			<TebusResep />
		</div>
	);
}

