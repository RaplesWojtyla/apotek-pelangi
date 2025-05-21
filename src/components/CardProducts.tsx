import ProductCard from "./ProductCard";
import { getProducts, Product } from "@/action/product.action";

const CardProducts = async () => {
	const products: Product[] = await getProducts({take: 8})
	// await new Promise(resolve => setTimeout(resolve, 2000)) // tes

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{products.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
};

export default CardProducts;
