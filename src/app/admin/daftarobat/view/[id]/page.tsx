import { getAllJenisBarang, getProductForEdit } from "@/action/admin/product.action";
import ViewObatClient from "@/components/admin/ViewObatClient";
import { notFound } from "next/navigation";

export default async function EditObatPage({ params }: { params: { id: string } }) {
	const [product, jenisBarangList] = await Promise.all([
		getProductForEdit(params.id),
		getAllJenisBarang()
	]);

	if (!product) {
		notFound();
	}

	return <ViewObatClient product={product} jenisBarangList={jenisBarangList} />;
}