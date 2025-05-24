import { UserButton } from '@clerk/nextjs';
import { Separator } from '@radix-ui/react-separator';
import { ShoppingCart, Bell, MapPinned } from 'lucide-react';
import Link from 'next/link';

export const NavbarCustomer = () => {
	const cartItemCount = 3;
	return (
		<>
			<header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow">
				<div className="flex items-center space-x-6">
					<Link href="/">
						<div className="flex items-center space-x-2">
							<img
								src="/logo.png"
								alt="Logo"
								className="h-8 w-8"
							/>
							<span className="text-xl font-bold text-orange-500">
								Apotek<span className="text-cyan-500">Pelangi</span>
							</span>
						</div>
					</Link>
				</div>

				<div className="flex items-center space-x-4">
					<nav className="hidden md:flex space-x-4 text-sm text-gray-600">
						<div className="flex h-5 items-center space-x-4 text-sm">
							<Link href="/customer" className="hover:text-cyan-500">
								Dashboard
							</Link>
							<Separator orientation="vertical" className="w-px h-5 bg-gray-300 mr-4" />
							<Link href="/customer/catalog" className="hover:text-cyan-500">
								Katalog
							</Link>
							<Separator orientation="vertical" className="w-px h-5 bg-gray-300 mr-4" />
							<Link href="/customer/catalog" className="hover:text-cyan-500">
								Riwayat Transaksi
							</Link>
							<Separator orientation="vertical" className="w-px h-5 bg-gray-300 mr-4" />
						</div>
					</nav>
					<Link href="">
						<MapPinned className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
					</Link>
					<div className="relative">
						<Link href="/customer/cart" aria-label="Keranjang">
							<ShoppingCart className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
						</Link>
						{cartItemCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
								{cartItemCount}
							</span>
						)}
					</div>
					<button aria-label="Notifikasi">
						<Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
					</button>
					<UserButton />
				</div>
			</header>
			<div className="pt-2">
			</div>
		</>
	);
};

export default NavbarCustomer