import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

const KasirLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            { children }
        </>
    )
}

export default KasirLayout