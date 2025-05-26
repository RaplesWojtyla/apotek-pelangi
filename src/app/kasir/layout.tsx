import React, { ReactNode } from "react";
import NavbarKasir from "@/components/kasir/NavbarKasir";
import CatalogSidebar from "@/components/kasir/CatalogSidebar";

const KasirLayout = ({ children }: { children: ReactNode }) => {
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

export default KasirLayout;