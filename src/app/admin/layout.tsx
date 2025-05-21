import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react'

export default function KasirLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            { children }
        </>
    )
}