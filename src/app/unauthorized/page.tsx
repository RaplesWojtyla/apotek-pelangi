import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center md:space-x-10 text-center md:text-left">
        {/* Icon dengan background lingkaran */}
        <div className="relative w-48 h-48 bg-red-100 rounded-full flex items-center justify-center mb-6 md:mb-0">
          <ShieldAlert className="w-32 h-32 text-red-600" />
        </div>

        {/* Teks Keterangan */}
        <div>
          <h1 className="text-5xl font-bold text-red-800">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            OOPS! KAMU TIDAK BERHAK MASUK KE HALAMAN INI!
          </h2>
          <p className="text-gray-500 mt-4 max-w-md">
            Maaf, tapi kamu tidak punya hak untuk mengakses halamman yang kamu tuju.
          </p>
          <Link href="/sign-in/callback">
            <span className="text-cyan-500 font-medium hover:underline mt-4 inline-block">
              kembali ke homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
