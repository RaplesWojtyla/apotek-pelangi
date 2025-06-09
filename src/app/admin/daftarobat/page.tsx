
import { getProducts, getProductsTotalPages, getTotalProducts } from "@/action/admin/product.action";
import DaftarObatClient from "@/components/admin/DaftarObatClient";


export default async function DaftarObatPage({ searchParams }: {
	searchParams: Promise<{
		page?: string
		search?: string
	}>
}) {
	const sParams = await searchParams
	const currPage = Number(sParams.page || 1)
	const search = sParams.search || ""

	const [products, totalPages, totalProducts] = await Promise.all([
		getProducts(currPage, search),
		getProductsTotalPages(search),
		getTotalProducts()
	])

	return <DaftarObatClient 
		products={products} 
		totalPages={totalPages}
		totalProducts={totalProducts} 
	/>;
}