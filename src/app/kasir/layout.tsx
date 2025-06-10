import React, { ReactNode } from "react";
import NavbarKasir from "@/components/kasir/NavbarKasir";
import CatalogSidebar from "@/components/kasir/CatalogSidebar";
import { checkRole } from "@/lib/clerk";
import { redirect } from "next/navigation";

export default async function KasirLayout({ children }: { children: ReactNode }) {
  if (!(await checkRole('KASIR'))) {
    redirect('/unauthorized')
  }
  return (
    <>
      <NavbarKasir />
      <div className="flex">
        <CatalogSidebar />
        <div className="flex-1 p-4 bg-gray-100 min-h-screen overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};
