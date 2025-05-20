import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";


const CartPage = () => {
	const cartItems = [
		{
			id: 1,
			name: "Resep Tn.Budi",
			price: 12000,
			type: "Obat Dengan Resep",
			status: "normal",
			image: "/logo.png",
		},
		{
			id: 2,
			name: "Resep Tn.Budi",
			price: 0,
			type: "Obat Dengan Resep",
			status: "rejected",
			image: "/resep2.png",
			date: "23 November 2022",
		},
		{
			id: 3,
			name: "FG Troches 30 Tablet",
			price: 12000,
			type: "Obat Dengan Resep",
			status: "normal",
			image: "/obat1.png",
		},
		{
			id: 4,
			name: "FG Troches 30 Tablet",
			price: 0,
			type: "Obat Dengan Resep",
			status: "out_of_stock",
			image: "/obat2.png",
		},
	];

	const subtotal = cartItems
		.filter((i) => i.status === "normal")
		.reduce((sum, item) => sum + item.price, 0);

	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />

			<div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:items-start">
				{/* Left section (main content) */}
				<div className="md:col-span-2 space-y-4">
					<h2 className="text-xl font-bold text-gray-800">Keranjang</h2>

					<Tabs defaultValue="semua" className="w-full">
						<TabsList className="bg-white p-1 rounded-md shadow-sm w-full justify-start gap-2 overflow-auto">
							<TabsTrigger
								value="semua"
								className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100 px-4 py-2 rounded-md text-sm transition"
							>
								Semua
							</TabsTrigger>
							<TabsTrigger
								value="obat-solusi"
								className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100 px-4 py-2 rounded-md text-sm transition"
							>
								Obat Solusi
							</TabsTrigger>
							<TabsTrigger
								value="obat-resep"
								className="data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100 px-4 py-2 rounded-md text-sm transition"
							>
								Obat Resep
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className="flex items-center justify-between">
						<label className="flex items-center space-x-2">
							<Checkbox />
							<span>Pilih Semua</span>
						</label>
						<span className="text-sm text-red-500 cursor-pointer">Hapus Semua</span>
					</div>

					<ScrollArea className="h-[500px] pr-2">
						{cartItems.map((item) => (
							<Card
								key={item.id}
								className={`flex items-center gap-4 p-4 mb-4 ${item.status !== "normal" ? "bg-red-100" : ""
									}`}
							>
								<div className="flex items-center gap-4 w-full">
									<Checkbox
										className="mt-1"
										disabled={item.status !== "normal"}
									/>
									<Image
										src={item.image}
										alt={item.name}
										width={80}
										height={80}
									/>
									<div className="flex justify-between items-start w-full">
										<div>
											<h4 className="font-semibold text-sm">{item.name}</h4>
											{item.status === "rejected" && (
												<>
													<p className="text-xs text-gray-500">{item.date}</p>
													<Badge variant="destructive">Resep Ditolak</Badge>
												</>
											)}
											{item.status === "out_of_stock" && (
												<Badge variant="destructive">Obat Habis</Badge>
											)}
											{item.status === "normal" && (
												<>
													<p className="text-sm">
														Rp{item.price.toLocaleString()}
													</p>
													<p className="text-xs text-gray-500">{item.type}</p>
												</>
											)}
										</div>
										<span className="text-xs text-blue-600 cursor-pointer whitespace-nowrap">
											Lihat Detail
										</span>
									</div>
								</div>
							</Card>
						))}
					</ScrollArea>
				</div>

				{/* Right section (subtotal) */}
				<div className="bg-white p-4 rounded-lg shadow-md h-fit mt-6 md:mt-34 order-first md:order-none">
					<h4 className="font-semibold mb-2">Sub Total (1 produk)</h4>
					<Separator className="mb-2" />
					<div className="flex justify-between mb-4">
						<span>Total Harga</span>
						<span className="font-bold">Rp{subtotal.toLocaleString()}</span>
					</div>
					<Button className="w-full">Bayar Sekarang</Button>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
