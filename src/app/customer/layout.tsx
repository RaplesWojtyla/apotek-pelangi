import Footer from '@/components/Footer'
import NavbarCustomer from '@/components/customer/NavbarCustomer'
import React, { ReactNode } from 'react'

const CustomerLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<NavbarCustomer />
			{ children }
			<Footer />
		</>
	)
}

export default CustomerLayout