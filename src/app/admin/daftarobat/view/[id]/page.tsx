import { getAllJenisBarang, getProductForEdit } from "@/action/admin/product.action";
import ViewObatClient from "@/components/admin/ViewObatClient";
import { notFound } from "next/navigation";


export default async function ViewObatPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const [product, jenisBarangList] = await Promise.all([
		getProductForEdit(id),
		getAllJenisBarang()
	]);

	if (!product) {
		notFound();
	}

	return <ViewObatClient product={product} jenisBarangList={jenisBarangList} />;
}