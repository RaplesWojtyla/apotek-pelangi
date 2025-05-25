'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart, Bell, MapPinned, LayoutDashboard, PackageSearch, History, Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export const Navbar = () => {
	const { isSignedIn } = useUser()
	const [isOpen, setIsOpen] = useState(false)
	const cartItemCount = 3

	return (
		<>
			<header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow">
				{/* Logo */}
				<Link href="/" className="flex items-center space-x-2">
					<img src="/logo.png" alt="Logo" className="h-8 w-8" />
					<span className="text-xl font-bold text-orange-500">
						Apotek<span className="text-cyan-500">Pelangi</span>
					</span>
				</Link>

				{/* Desktop Navigation */}
				{isSignedIn ? (
					<div className="hidden md:flex items-center space-x-4">
						<nav className="flex h-5 items-center space-x-4 text-sm text-gray-600">
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
						<Button variant="ghost" size="icon" aria-label="Notifikasi">
							<Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
						</Button>
						<UserButton />
					</div>
				) : (
					<div className="hidden md:flex items-center space-x-4">
						<Button variant="link" className="text-sm text-cyan-500 font-medium">
							<SignInButton mode="modal" fallbackRedirectUrl={'/sign-in/callback'}>
								Masuk
							</SignInButton>
						</Button>
						<Button className="text-sm bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition">
							<SignUpButton mode="modal" fallbackRedirectUrl={'/sign-in/callback'}>
								<span>Daftar</span>
							</SignUpButton>
						</Button>
					</div>
				)}

				{/* Mobile Menu */}
				<div className="md:hidden flex items-center space-x-1">
					<Button variant="ghost" size="icon" asChild aria-label="Lokasi">
						<Link href="">
							<MapPinned className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
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

							{isSignedIn ? (
								<div className="space-y-6">
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
									</div>
									<Separator />
									<UserButton />
								</div>
							) : (
								<div className="space-y-4">
									<Button variant="link" className="text-cyan-500 w-full justify-start">
										<SignInButton mode="modal" fallbackRedirectUrl={'/sign-in/callback'}>
											Masuk
										</SignInButton>
									</Button>
									<Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
										<SignUpButton mode="modal" fallbackRedirectUrl={'/sign-in/callback'}>
											Daftar
										</SignUpButton>
									</Button>
								</div>
							)}
						</SheetContent>
					</Sheet>
				</div>
			</header>
			<div className="pt-10" />
		</>
	)
}

export default Navbar
