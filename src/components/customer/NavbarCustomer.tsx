'use client'

import { UserButton, useUser } from '@clerk/nextjs';
import { Separator } from '../ui/separator';
import { Sheet } from '../ui/sheet';
import { ShoppingCart, Bell, MapPinned, LayoutDashboard, PackageSearch, Menu, History } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SheetContent, SheetTrigger } from '../ui/sheet';
import { useCartContext } from '@/context/CartContext';
import { useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export const NavbarCustomer = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { cartItemsCount, isLoadingCartCount } = useCartContext()
	const { isSignedIn, isLoaded } = useUser()

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
							<Link href="/customer/history" className="hover:text-cyan-500">
								Riwayat Transaksi
							</Link>
							<Separator orientation="vertical" className="w-px h-5 bg-gray-300 mr-4" />
						</div>
					</nav>
					<nav className="hidden md:flex space-x-4">
						<div className="relative">
							<Link href="/customer/cart" aria-label="Keranjang">
								<ShoppingCart className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
							</Link>
							{!isLoadingCartCount && isSignedIn && cartItemsCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
									{cartItemsCount}
								</span>
							)}
							{isLoadingCartCount && isSignedIn && (
								<span className="absolute -top-2 -right-2 bg-gray-300 text-transparent rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
									0
								</span>
							)}
						</div>
						<button aria-label="Notifikasi">
							<Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
						</button>
						{isLoaded ? (
							<UserButton />
						) : (
							<Skeleton className='size-10 rounded-full' />
						)}
					</nav>
				</div>
				<div className="md:hidden">
					<Button variant="ghost" size="icon" asChild aria-label="Lokasi">
						<Link href="/customer/cart" aria-label="Keranjang">
							<ShoppingCart className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
						</Link>
					</Button>

					<Button variant="ghost" size="icon" aria-label="Notifikasi">
						<Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
					</Button>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" aria-label="Menu">
								<Menu className="w-6 h-6 text-cyan-600" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-72 bg-white p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-lg font-semibold text-cyan-600">Menu</h2>
							</div>

							<div className="space-y-6">
								{/* Menu Utama */}
								<div className="space-y-4">
									<div className="space-y-2">
										<Link href="/customer" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600">
											<LayoutDashboard size={18} />
											<span>Dashboard</span>
										</Link>
										<Link href="/customer/catalog" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600">
											<PackageSearch size={18} />
											<span>Katalog</span>
										</Link>
										<Link href="/customer/history" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600">
											<History size={18} />
											<span>Riwayat Transaksi</span>
										</Link>
										<Link href="/customer/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600">
											<ShoppingCart size={18} />
											<span>Keranjang</span>
										</Link>
										<Link href="/customer/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600">
											{/* <MapPinned size={18} /> */}
											<span>Alamat</span>
										</Link>
									</div>
									<Separator />
									<UserButton />
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</header>
		</>
	);
};

export default NavbarCustomer
