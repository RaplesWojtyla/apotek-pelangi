'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "./SidebarContent";
import { Category, countAllCategories, getCategories } from "@/action/category.action";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const CatalogSidebar = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useUser();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const total = await countAllCategories();
				const data = await getCategories(total);
				setCategories(data);
			} catch (error) {
				console.error("Failed to fetch categories", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const userName = user?.firstName ?? "GUEST";

	return (
		<>
			{/* Mobile Button */}
			<div className="lg:hidden p-4 fixed top-17 left-2">
				<Sheet>
					<SheetTrigger className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow">
						☰
					</SheetTrigger>
					<SheetContent side="left" className="p-4 w-64">
						<SheetHeader hidden>
							<SheetTitle>Mobile Sidebar</SheetTitle>
						</SheetHeader>
						<SidebarContent categories={categories} userName={userName} isLoading={isLoading} />
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden lg:block p-4 w-64 flex-shrink-0">
				<aside className="hidden lg:block fixed pt-15 inset-y-0 left-0 w-64 bg-white border-r shadow-sm z-40">
					<div className="h-full p-4 overflow-y-auto">
						<SidebarContent categories={categories} userName={userName} isLoading={isLoading} />
					</div>
				</aside>
			</div>
		</>
	);
};

export default CatalogSidebar;
