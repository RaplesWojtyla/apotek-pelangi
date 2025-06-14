'use client'

import { Category } from "@/action/customer/category.action";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeftRight, BookImage, Layers, FileClock, LogOut } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const SidebarContent = ({
	categories,
	isLoading,
	userName,
}: {
	categories: Category[];
	isLoading: boolean;
	userName: string;
}) => {
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
						<p className="text-xs text-gray-500">Kasir</p>
					</div>
				</div>
			</div>

			{/* Scrollable Nav */}
			<div className="flex-1 overflow-y-auto max-h-screen pr-1">
				<p className="text-xs uppercase text-gray-400 mb-2">Kategori</p>
				<Link
					href="/kasir"
					className="flex items-center space-x-2 text-gray-800 font-semibold mb-1 hover:text-cyan-600 text-sm"
				>
					<BookImage size={16} />
					<span>Semua Produk</span>
				</Link>

				{isLoading ? (
					<p className="text-sm text-gray-500">Memuat kategori...</p>
				) : categories.map((category) => (
					<Accordion key={category.id} type="multiple" className="w-full">
						<AccordionItem value={`kategori-${category.id}`}>
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center text-gray-800 hover:text-cyan-600 space-x-2 text-sm">
									<Layers size={16} />
									<span>{category.nama_kategori}</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="ml-6 space-y-1 text-sm">
								{category.jenis_barang.map((jB) => (
									<div key={jB.id}>
										<p className="block text-gray-700 hover:text-cyan-600 transition cursor-pointer mb-1">
											{jB.nama_jenis}
										</p>
										<Separator />
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}

				<hr className="my-4 border-gray-200" />

				<Link
					href="/kasir/daftar_transaksi"
					className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-cyan-600 text-sm mb-4"
				>
					<ArrowLeftRight size={16} />
					<span>Daftar Transaksi</span>
				</Link>
				<Link
					href="/kasir/history_transaksi"
					className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-cyan-600 text-sm mb-4"
				>
					<FileClock size={16} />
					<span>History Transaksi</span>
				</Link>
				<Link
					href="/logout"
					className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-red-600 text-sm"
				>
					<LogOut size={16} />
					<span>Keluar</span>
				</Link>
			</div>
		</div>
	);
};

export default SidebarContent;
