import { Category } from "@/action/category.action";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeftRight, Layers } from "lucide-react";
import Link from "next/link";

const SidebarContent = ({ categories }: { categories: Category[] }) => {
	return (
		<div className="flex flex-col max-h-full">
			{/* Logo / Header */}
			<div className="mb-6">
				<div className="flex items-center space-x-3">
					<div className="p-2 rounded-md">
						<UserButton />
					</div>
					<div>
						<h1 className="text-lg font-bold text-gray-800 leading-none">
							Nama User
						</h1>
						<p className="text-xs text-gray-500">Kasir</p>
					</div>
				</div>
			</div>

			{/* Scrollable Nav */}
			<div className="flex-1 overflow-y-auto pr-1">
				<p className="text-xs uppercase text-gray-400 mb-2">Kategori</p>

				{categories.map(category => (
					<Accordion key={category.id} type="multiple" className="w-full">
						<AccordionItem value="kategori-obat">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center text-gray-800 hover:text-cyan-600 space-x-2 text-sm">
									<Layers size={16} />
									<span>{category.nama_kategori}</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="ml-6 space-y-1 text-sm">
								{category.jenis_barang.map(jB => (
									<p key={jB.id}>
										{jB.nama_jenis}
									</p>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}

				<hr className="my-4 border-gray-200" />

				<Link
					href="/settings"
					className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-cyan-600 text-sm"
				>
					<ArrowLeftRight size={16} />
					<span>Daftar Transaksi</span>
				</Link>
			</div>
		</div>
	);
}

export default SidebarContent