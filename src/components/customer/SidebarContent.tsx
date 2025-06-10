'use client'

import { Category } from "@/action/customer/category.action";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Layers} from "lucide-react";
import { Separator } from "../ui/separator";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const SidebarContent = ({ categories, isLoading, userName }: { categories: Category[], isLoading: boolean, userName: string }) => {
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
							{userName}
						</h1>
						<p className="text-xs text-gray-500">Customer</p>
					</div>
				</div>
			</div>

			{/* Scrollable Nav */}
			<div className="flex-1 overflow-y-auto pr-1">
				<p className="text-xs uppercase text-gray-400 mb-2">Kategori</p>

				{isLoading ? (
					<p className="text-sm">Loading...</p>
				) : categories.map(category => (
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
									<div key={jB.id}>
										<Link
											href={`/customer/catalog?jenisId=${jB.id}&kategoriNama=${encodeURIComponent(category.nama_kategori)}&jenisNama=${encodeURIComponent(jB.nama_jenis)}`}
											className="block text-gray-700 hover:text-cyan-600 transition cursor-pointer mb-1"
										>
											{jB.nama_jenis}
										</Link>
										<Separator />
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	);
}

export default SidebarContent