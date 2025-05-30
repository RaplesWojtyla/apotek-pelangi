"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import SidebarContent from "./SidebarContent";

export default function AdminSidebar({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar Mobile Trigger */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="bg-cyan-600 text-white px-3 py-2 rounded-md shadow flex items-center gap-2">
            <Menu size={20} />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-64 bg-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block fixed pt-10 inset-y-0 left-0 w-64 bg-white border-r shadow-sm z-40">
          <div className="h-full p-4 overflow-y-auto">
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content */}
        {/* <div className="flex-1 w-full lg:ml-64 p-4">
          {children}
        </div> */}
      </div>
    </>
  );
}
