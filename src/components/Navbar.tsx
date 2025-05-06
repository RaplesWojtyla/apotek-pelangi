import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 flex justify-center bg-transparent">
  <div className="backdrop-blur-md bg-white/40 px-10 py-3 shadow-md w-full max-w-6xl grid grid-cols-3 items-center rounded-b-xl">
    {/* Logo + Nama */}
    <div className="flex items-center gap-5">
      <Image src="/img/logosementara.png" alt="Logo Apotek Pelangi" width={48} height={48} />
      <div className="leading-tight text-black text-sm font-semibold">
        <p>Apotek</p>
        <p>Pelangi</p>
      </div>
    </div>

    {/* Navigation */}
    <nav className="hidden md:flex justify-center gap-10 text-sm text-black font-medium">
      <Link href="#" className="whitespace-nowrap">Kemitraan</Link>
      <Link href="#" className="whitespace-nowrap">Katalog Produk</Link>
      <Link href="#" className="whitespace-nowrap">Artikel</Link>
      <Link href="#" className="whitespace-nowrap">Kontak Kami</Link>
    </nav>

    {/* Language Dropdown with Flag */}
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-black text-sm font-medium hover:opacity-80 transition">
          <Image
            src="/img/bendera indo.jpg"
            alt="ID Flag"
            width={32}
            height={32}
            className="rounded-3xl"
          />
          ID <ChevronDown className="ml-1 w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-black">
          <div className="px-4 py-2 flex items-center gap-2">
            <Image src="/img/bendera eng.png" alt="EN Flag" width={32} height={32} className="rounded-3xl" />
            EN
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</header>

  )
}
