"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Layers, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SidebarKasir() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile (Menu Button) */}
      <div className="lg:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow">
            ☰
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - below navbar */}
      <div className="hidden lg:block p-4 w-64 lg:flex-shrink-0">
        <Card className="w-full overflow-hidden shadow-lg rounded-xl">
          <CardContent className="p-4 h-full overflow-y-auto max-h-[80vh]">
            <SidebarContent />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function SidebarContent() {
  const kategoriObat = [
    "Semua",
    "Alergi",
    "Antibiotik",
    "Asma",
    "Batuk & Flu",
    "Demam",
    "Diabetes",
    "Herbal",
    "Hipertensi",
    "Jantung",
    "Kontrasepsi & Hormon",
    "Kulit",
    "Mata",
    "Mulut & THT",
    "Otot, Tulang & Sendi",
    "Saluran Pencernaan",
    "Vitamin & Suplemen",
  ];

  return (
    <div className="flex flex-col max-h-full">
      {/* Logo / Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-600 p-2 rounded-md text-white">
            <Home size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-none">
              Apotek Pelangi
            </h1>
            <p className="text-xs text-gray-500">Kasir</p>
          </div>
        </div>
      </div>

      {/* Scrollable Nav */}
      <div className="flex-1 overflow-y-auto pr-1">
        <p className="text-xs uppercase text-gray-400 mb-2">Kategori</p>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="kategori-obat">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center text-gray-800 hover:text-cyan-600 space-x-2 text-sm">
                <Layers size={16} />
                <span>Kategori Obat</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ml-6 space-y-1 text-sm">
              {kategoriObat.map((kategori) => (
                <Link
                  key={kategori}
                  href={`/kategori/${kategori
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="block text-gray-700 hover:text-cyan-600 transition"
                >
                  {kategori}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr className="my-4 border-gray-200" />

        <Link
          href="/settings"
          className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 text-sm"
        >
          <Settings size={16} />
          <span>Pengaturan</span>
        </Link>
      </div>
    </div>
  );
}
