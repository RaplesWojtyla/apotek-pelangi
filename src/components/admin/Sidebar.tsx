"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import SidebarContent from "./SidebarContent"

export default function AdminSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="bg-cyan-600 text-white px-3 py-2 rounded-md shadow flex items-center gap-2">
          <Menu size={20} />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="p-4 w-64 bg-white">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    )
  }

  // Versi desktop (tanpa wrapper <aside>, karena sudah ada di layout)
  return (
    <div className="h-full p-4 overflow-y-auto">
      <SidebarContent />
    </div>
  )
}
