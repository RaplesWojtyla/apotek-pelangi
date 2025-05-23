import Footer from '@/components/Footer'
import Navbar from '@/components/NavbarCustomer'
import React, { ReactNode } from 'react'

const CustomerLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			{ children }
			<Footer />
		</>
	)
}

export default CustomerLayout