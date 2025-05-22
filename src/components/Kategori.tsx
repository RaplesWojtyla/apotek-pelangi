import { Category, getCategories } from "@/action/category.action";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// const categories = [
// 	{ name: "Alergi", image: "/icons/alergi.png" },
// 	{ name: "Demam", image: "/icons/demam.png" },
// 	{ name: "Diabetes", image: "/icons/diabetes.png" },
// 	{ name: "Mulut & THT", image: "/icons/mulut.png" },
// 	{ name: "Vitamin & Suplemen", image: "/icons/vitamin.png" },
// 	{ name: "Hipertensi", image: "/icons/hipertensi.png" },
// 	{ name: "Kesehatan Ibu/Anak", image: "/icons/ibu-anak.png" },
// ];

export const Kategori = async () => {
	const categories: Category[] = await getCategories(2)

	return (
		<section className="py-8 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">Kategori</h2>
					<Link href={'/customer/catalog'} className="text-sm text-cyan-700 hover:underline">
						Lihat Semua
					</Link>
				</div>
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
					{categories.map(category => (
						<Card
							key={category.id}
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
					))}
				</div>
			</div>
		</section>
	);
}

export default Kategori
