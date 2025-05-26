import AdminSidebar from '@/components/admin/Sidebar';
import Navbar from '@/components/admin/NavbarAdmin';
import { checkRole } from '@/lib/clerk';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

export default async function KasirLayout({ children }: { children: ReactNode }) {
    if (!await checkRole('ADMIN')) {
        return redirect('/unauthorized')
    }

    return (
        <>
            < Navbar />
            <div className="flex">
                <div className="w-64 min-h-screen border-r">
                    <AdminSidebar />
                </div>

                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </>
    )
}