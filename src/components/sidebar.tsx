"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  Layers,
  Book,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="bg-cyan-600 text-white px-3 py-2 rounded-md">
            ☰ Menu
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col w-64 h-screen bg-white fixed text-white p-4">
      <SidebarContent />
      </div>
    </>
  );
}

function SidebarContent() {
  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      {/* Header (tidak scroll) */}
      <div className="mb-6 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-md">
            <Home size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-black leading-none">
              Acme Inc
            </h1>
            <p className="text-xs text-gray-700">Enterprise</p>
          </div>
        </div>
      </div>

      {/* Konten scrollable */}
      <div className="flex-1 overflow-y-auto pr-2">
        <p className="text-xs uppercase text-gray-400 mb-2">Platform</p>

        <Accordion type="multiple" className="w-full">
            <AccordionItem value="kategori-obat">
              <AccordionTrigger className="text-sm hover:text-cyan-400">
                <div className="flex items-center text-gray-800 hover:text-cyan-600 space-x-2">
                  <Layers size={16} />
                  <span>Kategori Obat</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-6 space-y-1 text-sm">
                <Link
                  href="/kategori/semua"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Semua Kategori
                </Link>
                <Link
                  href="/kategori/alergi"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Alergi
                </Link>
                <Link
                  href="/kategori/antibiotik"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Antibiotik & Anti jamur
                </Link>
                <Link
                  href="/kategori/asma"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Asma
                </Link>
                <Link
                  href="/kategori/batuk-flu"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Batuk & Flu
                </Link>
                <Link
                  href="/kategori/demam"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Demam
                </Link>
                <Link
                  href="/kategori/diabetes"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Diabetes
                </Link>
                <Link
                  href="/kategori/herbal"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Herbal
                </Link>
                <Link
                  href="/kategori/hipertensi"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Hipertensi
                </Link>
                <Link
                  href="/kategori/jantung"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Jantung
                </Link>
                <Link
                  href="/kategori/hormon"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Kontrasepsi & Hormon
                </Link>
                <Link
                  href="/kategori/kulit"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Kulit
                </Link>
                <Link
                  href="/kategori/mata"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Mata
                </Link>
                <Link
                  href="/kategori/mulut-tht"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Mulut & THT
                </Link>
                <Link
                  href="/kategori/otot-tulang"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Otot, Tulang & Sendi
                </Link>
                <Link
                  href="/kategori/pencernaan"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Saluran Pencernaan
                </Link>
                <Link
                  href="/kategori/vitamin"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Vitamin & Suplemen
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="models">
              <AccordionTrigger className="text-sm hover:text-cyan-400">
                <div className="flex items-center text-gray-800 hover:text-cyan-600 space-x-2">
                  <Book size={16} />
                  <span>Models</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-6 space-y-1 text-sm">
                <Link
                  href="/model-a"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Model A
                </Link>
                <Link
                  href="/model-b"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Model B
                </Link>
                <Link
                  href="/model-b"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Model B
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="docs">
              <AccordionTrigger className="text-sm hover:text-cyan-400">
                <div className="flex text-gray-800 hover:text-cyan-600 items-center space-x-2">
                  <Book size={16} />
                  <span>Documentation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-6 space-y-1 text-sm">
                <Link
                  href="/getting-started"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  Getting Started
                </Link>
                <Link
                  href="/api"
                  className="block text-gray-800 hover:text-cyan-600"
                >
                  API
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        <div className="mt-4">
          <Link
            href="/settings"
            className="flex items-center space-x-2 text-gray-800 hover:text-cyan-600 text-sm"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
