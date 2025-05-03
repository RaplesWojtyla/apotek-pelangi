import { ShoppingCart, Bell, User, Search } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <img
            src="logo.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-orange-500">
            Apotek<span className="text-cyan-500">Pelangi</span>
          </span>
        </div>
        <nav className="hidden md:flex space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:text-cyan-500">
            Katalog Produk
          </a>
        </nav>
      </div>

      <div className="flex-1 mx-6 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik kata kunci produk yang anda cari"
            className="w-full border border-gray-300 rounded-full px-4 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-500"
            aria-label="Cari"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-cyan-500">
        {/* Link ke halaman register */}
        <Link href="/CustDashboard" aria-label="Keranjang">
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
        </Link>
        
        <button aria-label="Notifikasi">
          <Bell className="w-6 h-6" />
        </button>
        <button aria-label="Akun">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
