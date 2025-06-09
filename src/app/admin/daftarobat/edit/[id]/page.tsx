import { getAllJenisBarang, getProductForEdit } from "@/action/admin/product.action";
import EditObatClient from "@/components/admin/EditObatClient";
import { notFound } from "next/navigation";


export default async function EditObatPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

    const [product, jenisBarangList] = await Promise.all([
        getProductForEdit(id),
        getAllJenisBarang()
    ]);

    if (!product) {
        notFound();
    }

    return <EditObatClient product={product} jenisBarangList={jenisBarangList} />;
}