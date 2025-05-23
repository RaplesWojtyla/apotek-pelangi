'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { ShoppingCart, Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export const Navbar = () => {
	const { isSignedIn } = useUser()

	return (
		<>
			{/* Navbar Fixed */}
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
					{isSignedIn ? (
						<>
							<Link href="/CustDashboard" aria-label="Keranjang">
								<ShoppingCart className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
							</Link>
							<Button aria-label="Notifikasi">
								<Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
							</Button>
							<UserButton />
							<nav className="hidden md:flex space-x-4 text-sm text-gray-600">
								<Link href={'/sign-in/callback'} className="hover:text-cyan-500">
									Dashboard
								</Link>
							</nav>
						</>
					) : (
						<>

							<Button
								className='text-sm text-cyan-500 font-medium mr-0 cursor-pointer'
								variant={'link'}
								asChild
							>
								<SignInButton mode='modal' fallbackRedirectUrl={'/sign-in/callback'}>
									Masuk
								</SignInButton>
							</Button>

							<Button
								className='text-sm bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition cursor-pointer'
							>
								<SignUpButton mode='modal' fallbackRedirectUrl={'/sign-in/callback'}>
									<span>Daftar</span>
								</SignUpButton>
							</Button>
						</>
					)}
				</div>
			</header>
			<div className="pt-15">
			</div>
		</>
	);
};

export default Navbar