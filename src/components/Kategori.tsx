import { Category, countAllCategories, getCategories } from "@/action/customer/category.action";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export const Kategori = async () => {
	const categoriesCount = await countAllCategories()
	const categories: Category[] = await getCategories(categoriesCount)

	return (
		<section className="py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-semibold">Kategori</h2>
					<Link href={'/customer/catalog'} className="text-sm text-cyan-700 hover:underline">
						Lihat Semua
					</Link>
				</div>
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
					{categories.map(category => (
						<Link key={category.id} href={'/customer/catalog'}>
							<Card
								className="h-32 flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-md transition"
							>
								<CardContent className="flex flex-col items-center justify-center gap-2 p-0">
									<img
										src={category.foto_kategori}
										alt={category.nama_kategori}
										className="w-12 h-12 object-cover rounded-full"
									/>
									<span className="text-xs text-gray-700 text-center font-semibold">
										{category.nama_kategori}
									</span>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

export default Kategori
