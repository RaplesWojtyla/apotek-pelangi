import React from "react";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    name: string;
    price: string;
    image: string;
  };
}

export default function KasirCard({ product }: ProductCardProps) {
  return (
    <div className="relative overflow-y-auto bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
      {/* Gambar */}
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-contain mb-4"
      />

      {/* Label jenis */}
      <span className="text-xs text-gray-500 mb-1">Untuk: Batuk</span>

      {/* Nama */}
      <h3 className="text-sm font-medium text-center mb-1">{product.name}</h3>

      {/* Harga */}
      <p className="text-sm text-gray-700 mb-3">{product.price}</p>

      {/* Tombol keranjang */}
      <div className="w-full flex justify-center">
        <button className="w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition">
          <ShoppingCart size={18} className="mx-auto" />
        </button>
      </div>
    </div>
  );
}
