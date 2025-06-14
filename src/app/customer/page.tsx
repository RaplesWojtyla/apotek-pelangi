import Banner from "@/components/Banner";
import SkeletonCard from "@/components/skeleton/SkeletonCard";
import SkeletonKategori from "@/components/skeleton/SkeletonKategori";
import TebusResep from "@/components/TebusResep";
import { Suspense } from "react";
import Kategori from "@/components/Kategori";
import Link from "next/link";
import { getProducts, getRecentlyPurchasedProducts } from "@/action/customer/product.action";
import { getDbUserId } from "@/action/user.action";
import LatestTransactionProductCards from "@/components/customer/LatestTransactionProductCards";
import CustomerTour from "@/components/customer/CustomerHomepageTour";


export default async function CustomerPage() {

	const userId = await getDbUserId();
	let productsToShow;
	let pageTitle = "Produk Tersedia";

	if (userId) {
		const purchasedProducts = await getRecentlyPurchasedProducts();
		if (purchasedProducts.length > 0) {
			productsToShow = purchasedProducts;
			pageTitle = "Baru Saja Dibeli";
		}
	}

	if (!productsToShow) {
		productsToShow = await getProducts({ take: 8 });
	}

	return (
		<div className="flex flex-col">
			<CustomerTour />
			<Banner />
			<Suspense fallback={<SkeletonKategori />}>
				<Kategori />
			</Suspense>
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold">{pageTitle}</h2>
						<Link id="tour-all-product" href={'/customer/catalog'} className="text-sm text-cyan-700 hover:underline">
							Lihat Semua
						</Link>
					</div>
					<Suspense fallback={<SkeletonCard />}>
						<LatestTransactionProductCards products={productsToShow} />
					</Suspense>
				</div>
			</section>

			<TebusResep />
		</div>
	);
}