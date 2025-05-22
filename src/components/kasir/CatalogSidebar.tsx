import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import SidebarContent from "./SidebarContent";
import { Category, countAllCategories, getCategories } from "@/action/category.action";

export const CatalogSidebar = async () => {
	const take: number = await countAllCategories()
	const categories: Category[] = await getCategories(take)

	return (
		<>
			{/* Mobile (Menu Button) */}
			<div className="lg:hidden p-4">
				<Sheet>
					<SheetTrigger className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow">
						☰
					</SheetTrigger>
					<SheetContent side="left" className="p-4 w-64">
						<SheetHeader hidden>
							<SheetTitle>Mobile Sidebar</SheetTitle>
						</SheetHeader>
						<SidebarContent categories={categories} />
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Sidebar - below navbar */}
			<div className="hidden lg:block p-4 w-64 lg:flex-shrink-0">
				<Card className="w-full overflow-hidden shadow-lg rounded-xl">
					<CardContent className="p-4 h-full overflow-y-auto max-h-[80vh]">
						<SidebarContent categories={categories} />
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default CatalogSidebar
