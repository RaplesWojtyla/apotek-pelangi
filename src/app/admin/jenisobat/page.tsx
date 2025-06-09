import { getCategoriesWithJenis } from "@/action/admin/category.action";
import JenisObatClient from "@/components/admin/JenisObatClient";


export default async function JenisObatPage() {
	const result = await getCategoriesWithJenis();

	if (!result.success || !result.data) {
		return <div className="p-6">Error: {result.message}</div>;
	}

	return <JenisObatClient initialCategories={result.data} />;
}