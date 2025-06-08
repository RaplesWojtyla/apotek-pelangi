'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import SidebarContent from './SidebarContent'
// make sure to import from your kasir folder:
import { Category, countAllCategories, getCategories } from '@/action/kasir/category.action'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function CatalogSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()
  const userName = user?.firstName ?? 'GUEST'

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const total = await countAllCategories()
        setCategories(await getCategories(total))
      } catch (err) {
        console.error('Failed to fetch categories', err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <>
      {/* mobile drawer trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow">
            ☰
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-64">
            <SheetHeader hidden>
              <SheetTitle>Menu Kategori</SheetTitle>
            </SheetHeader>
            <SidebarContent
              categories={categories}
              userName={userName}
              isLoading={isLoading}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop fixed sidebar */}
      <aside className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-white lg:border-r lg:shadow-sm z-40">
        <div className="h-full p-4 overflow-y-auto pt-20">
          <SidebarContent
            categories={categories}
            userName={userName}
            isLoading={isLoading}
          />
        </div>
      </aside>
    </>
  )
}
