import Footer from '@/components/Footer'
import NavbarCustomer from '@/components/customer/NavbarCustomer'
import { CartProvider } from '@/context/CartContext'
import React, { ReactNode } from 'react'

const CustomerLayout = ({ children }: { children: ReactNode }) => {
	return (
		<CartProvider>
			<NavbarCustomer />
			{ children }
			<Footer />
		</CartProvider>
	)
}

export default CustomerLayout