import { Search } from "lucide-react";

export default function SearchBar({ placeholder = "Cari produk..." }) {
  return (
    <div className="relative w-full mb-4">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        className="
          w-full
          pl-11
          pr-4
          py-3
          rounded-xl
          border
          border-gray-300
          bg-white
          text-sm
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-500
          focus:border-cyan-500
          transition-all
          duration-200
          shadow-sm
          hover:shadow-md
        "
      />
    </div>
  );
}
