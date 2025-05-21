import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

export default function KasirLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            { children }
        </>
    )
}