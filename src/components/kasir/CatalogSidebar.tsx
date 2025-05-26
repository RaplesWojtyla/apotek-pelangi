import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import SidebarContent from "./SidebarContent";
import {
	Category,
	countAllCategories,
	getCategories,
} from "@/action/category.action";
import { currentUser } from "@clerk/nextjs/server";

export const CatalogSidebar = async () => {
	const take: number = await countAllCategories();
	const categories: Category[] = await getCategories(take);
	const user = await currentUser()

	const userName = user?.firstName

	return (
		<>
			{/* Mobile Button */}
			<div className="lg:hidden p-4">
				<Sheet>
					<SheetTrigger className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow">
						☰
					</SheetTrigger>
					<SheetContent side="left" className="p-4 w-64">
						<SheetHeader hidden>
							<SheetTitle>Mobile Sidebar</SheetTitle>
						</SheetHeader>
						<SidebarContent categories={categories} userName={userName ?? "GUEST"} />
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden lg:block p-4 w-64 flex-shrink-0">
				<aside className="hidden lg:block fixed pt-15 inset-y-0 left-0 w-64 bg-white border-r shadow-sm z-40">
					<div className="h-full p-4 overflow-y-auto">
						<SidebarContent categories={categories} userName={userName ?? "GUEST"} />
					</div>
				</aside>
			</div>
		</>
	);
};

export default CatalogSidebar;