"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium
        ${isActive ? "bg-cyan-100 text-cyan-700" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
