import AdminSidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/NavbarAdmin'
import { checkRole } from '@/lib/clerk'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function KasirLayout({ children }: { children: ReactNode }) {
  if (!(await checkRole('ADMIN'))) {
    return redirect('/unauthorized')
  }

  return (
    <>
      <Navbar />
      
      {/* Mobile sidebar (Sheet Trigger) */}
      <div className="lg:hidden fixed top-20 -left-7 z-50">
        <AdminSidebar isMobile />
      </div>

      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r shadow-sm z-40 top-12">
          <AdminSidebar />
        </aside>

        {/* Konten utama */}
        <main className="flex-1 p-4 ml-0 lg:ml-64">
          {children}
        </main>
      </div>
    </>
  )
}
