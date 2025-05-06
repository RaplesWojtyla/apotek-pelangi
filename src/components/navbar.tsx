'use client';

import { ShoppingCart, Bell, User, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  // Jika bukan halaman landing, kita anggap user sudah "login"
  const isDashboard = pathname === '/CustDashboard';

  return (
    <>
      {/* Navbar Fixed */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-orange-500">
              Apotek<span className="text-cyan-500">Pelangi</span>
            </span>
          </div>
        </div>

        {isDashboard ? (
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
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex items-center space-x-4">
          {isDashboard ? (
            <>
              <Link href="/CustDashboard" aria-label="Keranjang">
                <ShoppingCart className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
              </Link>
              <button aria-label="Notifikasi">
                <Bell className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
              </button>
              <button aria-label="Akun">
                <User className="w-6 h-6 text-cyan-500 hover:text-cyan-700" />
              </button>
            </>
          ) : (
            <>
              <nav className="hidden md:flex space-x-4 text-sm text-gray-600">
                <a href="#" className="hover:text-cyan-500">
                  Katalog Produk
                </a>
              </nav>
              <Link
                href="/Login"
                className="text-sm text-cyan-500 font-medium hover:underline"
              >
                Masuk
              </Link>
              <Link
                href="/Register"
                className="text-sm bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600 transition"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Konten utama (pastikan ada margin atau padding di bawah navbar) */}
      <div className="pt-15">
        {/* Konten yang ada di bawah navbar */}
      </div>
    </>
  );
};
