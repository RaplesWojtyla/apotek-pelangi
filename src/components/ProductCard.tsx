import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    name: string;
    price: string;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
      {/* Icon hati */}
      <button className="absolute top-3 right-3 text-cyan-500 hover:text-cyan-600">
        <Heart size={18} />
      </button>

      {/* Gambar */}
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-contain mb-4"
      />

      {/* Label jenis */}
      <span className="text-xs text-gray-500 mb-1">Untuk: Batuk</span>

      {/* Nama */}
      <h3 className="text-sm font-medium text-center mb-1">
        {product.name}
      </h3>

      {/* Harga */}
      <p className="text-sm text-gray-700 mb-3">{product.price}</p>

      {/* Tombol beli + keranjang */}
      <div className="flex w-full gap-2">
        <button className="flex-1 bg-cyan-500 text-white text-sm py-1 rounded-md hover:bg-cyan-600">
          Beli Sekarang
        </button>
        <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
}
