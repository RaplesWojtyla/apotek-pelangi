import Banner from "@/components/Banner";
import SkeletonCard from "@/components/SkeletonCard";
import SkeletonKategori from "@/components/SkeletonKategori";
import TebusResep from "@/components/TebusResep";

export default function CustomerPage() {

	return (
		<div className="flex flex-col">
			<Banner />
			<SkeletonKategori />
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<SkeletonCard />
				</div>
			</section>
			<TebusResep />
		</div>
	);
}

