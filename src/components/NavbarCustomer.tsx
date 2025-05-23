import { UserButton } from '@clerk/nextjs';
import { ShoppingCart, Bell } from 'lucide-react';
import Link from 'next/link';

export const NavbarCustomer = () => {
	return (
		<>
			{/* Navbar Fixed */}
			<header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow">
				<div className="flex items-center space-x-6">
					<Link href="/customer">
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
					<Link href="/customer/cart" aria-label="Keranjang">
						<ShoppingCart className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
					</Link>
					<button aria-label="Notifikasi">
						<Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
					</button>
					<UserButton />

					<nav className="hidden md:flex space-x-4 text-sm text-gray-600">
						<Link href="/customer/catalog" className="hover:text-cyan-500">
							Katalog Produk
						</Link>
					</nav>
				</div>
			</header>
			<div className="pt-15">
			</div>
		</>
	);
};

export default NavbarCustomer