import Banner from "@/components/Banner";
import Kategori from "@/components/Kategori";
import ProductCard from "@/components/ProductCard";
import TebusResep from "@/components/TebusResep";

export const page = () => {
	const products = [
		{
			name: "Rhinus SR 60 Kapsul",
			price: "Rp21.000/strip",
			image: "/logo.png",
		},
		{
			name: "Rhinofed 4.5mg/60ml",
			price: "Rp21.500/botol",
			image: "/images/product2.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/images/product3.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/images/product3.png",
		},
		{
			name: "Rhinus SR 60 Kapsul",
			price: "Rp21.000/strip",
			image: "/images/product1.png",
		},
		{
			name: "Rhinofed 4.5mg/60ml",
			price: "Rp21.500/botol",
			image: "/images/product2.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/images/product3.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/images/product3.png",
		},
	];

	return (
		<div className="flex flex-col">
			<Banner />
			<Kategori />
			<section className="py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{products.map((product, i) => (
							<ProductCard key={i} product={product} />
						))}
					</div>
				</div>
			</section>
			<TebusResep />
		</div>
	);
}

export default page
