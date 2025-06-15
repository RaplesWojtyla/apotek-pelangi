'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import SidebarContent from "./SidebarContent";
import { Category, countAllCategories, getCategories } from "@/action/customer/category.action";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const CatalogSidebar = () => {
	const [categories, setCategories] = useState<Category[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const { user } = useUser()

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true)

			try {
				const take = await countAllCategories()
				const data = await getCategories(take)

				setCategories(data)
			} catch (error) {
				console.error(`Error: ${error}`)
				toast.error("Gagal memuat kategori produk")
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return (
		<>
			{/* Mobile (Menu Button) */}
			<div className="lg:hidden fixed top-17 left-2 z-50">
				<Sheet>
					<SheetTrigger className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow">
						☰
					</SheetTrigger>
					<SheetContent side="left" className="p-4 w-64">
						<SheetHeader hidden>
							<SheetTitle>Mobile Sidebar</SheetTitle>
						</SheetHeader>
						<SidebarContent
							categories={categories}
							isLoading={isLoading}
							userName={user?.firstName ?? "GUEST"} />
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Sidebar - below navbar */}
			<div className="hidden lg:block p-4 w-64 lg:flex-shrink-0">
				<Card id="tour-catalog-sidebar" className="w-full overflow-hidden shadow-lg rounded-xl">
					<CardContent className="p-4 h-full overflow-y-auto max-h-[80vh]">
						<SidebarContent
							categories={categories}
							isLoading={isLoading}
							userName={user?.firstName ?? "GUEST"}
						/>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default CatalogSidebar
