import Navbar from '@/components/Navbar';
import { checkRole } from '@/lib/clerk';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

export default async function KasirLayout({ children }: { children: ReactNode }) {
    if (!await checkRole('ADMIN')) {
        return redirect('/unauthorized')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}