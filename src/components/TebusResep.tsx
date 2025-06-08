'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TebusResep() {
	const router = useRouter()

	return (
		<section className="py-8 px-4">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg overflow-hidden">
				<div className="w-full md:w-1/2">
					<Image
						src="/dokter.jpg"
						alt="Tebus Resep Dokter"
						width={600}
						height={400}
						className="w-full h-auto object-cover rounded-lg"
					/>
				</div>

				<div className="w-full md:w-1/2 text-center md:text-center space-y-4 px-2">
					<h2 className="text-lg font-semibold text-gray-800">
						Tebus Resep Dokter Dengan <br />
						mudah, cepat, dan Tanpa Antri!
					</h2>
					<Button 
						className="bg-cyan-500 w-10xl hover:bg-cyan-600 text-white cursor-pointer"
						onClick={() => router.push('/customer/tebusresep')}
					>
						Tebus Sekarang!
					</Button>
				</div>
			</div>
		</section>
	);
}
