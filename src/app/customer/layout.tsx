import NavbarCustomer from '@/components/NavbarCustomer'
import React, { ReactNode } from 'react'

const CustomerLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<NavbarCustomer />
			{ children }
		</>
	)
}

export default CustomerLayout