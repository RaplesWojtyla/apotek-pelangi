import React, { ReactNode } from 'react'
import NavbarKasir from '@/components/NavbarKasir'

const KasirLayout = ( { children}: { children: ReactNode }) => {
    return (
        <>
            <NavbarKasir />
            {children}
        </>)
}

export default KasirLayout