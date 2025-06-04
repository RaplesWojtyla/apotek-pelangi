'use client'

import Footer from '@/components/Footer'
import NavbarCustomer from '@/components/customer/NavbarCustomer'
import { CartProvider } from '@/context/CartContext'
import { ReactNode, useEffect } from 'react'

const CustomerLayout = ({ children }: { children: ReactNode }) => {
	useEffect(() => {
		const snapScript: string = "https://app.sandbox.midtrans.com/snap/snap.js"
		const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY

		const script = document.createElement('script')
		script.src = snapScript
		script.setAttribute('data-client-key', clientKey!)
		script.async = true

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	return (
		<CartProvider>
			<NavbarCustomer />
			<div className='mt-14'>
				{ children }
			</div>
			<Footer />
		</CartProvider>
	)
}

export default CustomerLayout