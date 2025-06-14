'use client'

import { Product } from "@/action/customer/product.action";
import ProductCard from "./ProductCard";


export default function LatestTransactionProductCards({ products }: { products: Product[] }) {
	return (
		<div id="tour-latest-product" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{products.length > 0 ? (
				products.map(product => (
					<ProductCard key={product.id} product={product} />
				))
			) : (
				<div className="col-span-full text-center py-10 text-gray-500">
					<p>Tidak ada produk untuk ditampilkan saat ini.</p>
				</div>
			)}
		</div>
	)
}
