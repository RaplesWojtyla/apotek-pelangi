import React from "react";
import Link from "next/link";
import { Frown } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center md:space-x-10 text-center md:text-left">
        {/* Icon dengan background lingkaran */}
        <div className="relative w-48 h-48 bg-red-100 rounded-full flex items-center justify-center mb-6 md:mb-0">
          <Frown className="w-32 h-32 text-red-600" />
        </div>

        {/* Teks Keterangan */}
        <div>
          <h1 className="text-5xl font-bold text-red-800">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            OOPS! PAGE NOT BE FOUND
          </h2>
          <p className="text-gray-500 mt-4 max-w-md">
            Sorry but the page you are looking for does not exist, has been
            removed, name changed or is temporarily unavailable.
          </p>
          <Link href="/sign-in/callback">
            <span className="text-cyan-500 font-medium hover:underline mt-4 inline-block">
              Back to homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
