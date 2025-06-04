'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Bell, LayoutDashboard, Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import NotificationDropdown from './Notification'

export const Navbar = () => {
	const { isSignedIn } = useUser()
	const [isOpen, setIsOpen] = useState(false)

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

				<div className="flex items-center space-x-4">
					{isSignedIn ? (
						<>
							<nav className="hidden md:flex space-x-4 text-sm text-gray-600">
								<div className="flex h-5 items-center space-x-4 text-sm">
									<Link href="/sign-in/callback" className="hover:text-cyan-500">
										Dashboard
									</Link>
									<Separator orientation="vertical" className="w-px h-5 bg-gray-300 mr-4" />
								</div>
							</nav>
							<NotificationDropdown />
							<UserButton />
						</>
					) : (
						<>
							<Button
								className="hidden md:flex text-sm text-cyan-500 font-medium mr-0 cursor-pointer"
								variant="link"
								asChild
							>
								<SignInButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
									Masuk
								</SignInButton>
							</Button>

							<Button className="hidden md:flex text-sm bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition cursor-pointer">
								<SignUpButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
									<span>Daftar</span>
								</SignUpButton>
							</Button>
						</>
					)}

					{/* Mobile Menu */}
					<div className="md:hidden flex items-center space-x-1">
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
											<Link
												href="/sign-in/callback"
												onClick={() => setIsOpen(false)}
												className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600"
											>
												<LayoutDashboard size={18} />
												<span>Dashboard</span>
											</Link>
										</div>
										<Separator />
										<UserButton />
									</div>
								) : (
									<div className="space-y-4">
										<Button variant="link" className="text-cyan-500 w-full justify-start">
											<SignInButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
												Masuk
											</SignInButton>
										</Button>
										<Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
											<SignUpButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
												Daftar
											</SignUpButton>
										</Button>
									</div>
								)}
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>

			<div className="pt-10" />
		</>
	)
}

export default Navbar
