import AdminSidebar from '@/components/admin/Sidebar';
import Navbar from '@/components/admin/NavbarAdmin';
import React, { ReactNode } from 'react'

export default function KasirLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
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