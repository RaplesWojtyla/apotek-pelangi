'use client'

import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/action/product.action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: (product: Product) => void }) {
    const router = useRouter()

    const handleDetail = (id: string) => {
        router.push(`/customer/catalog/${id}`)
    }

    
    function handleAddToCartClick() {
        onAddToCart(product); 
        toast.success("Berhasil ditambahkan ke keranjang!", {
            duration: 3000,
            icon: '🛒'
        });
        
    }

    return (
        <div
            className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center cursor-pointer"
        >
            {/* Icon hati */}
            <button className="absolute top-3 right-3 text-cyan-500 hover:text-cyan-600">
                <Heart size={18} />
            </button>

            {/* Gambar */}
            <img
                src={`/${product.foto_barang}`}
                alt={product.nama_barang}
                className="w-24 h-24 object-contain mb-4"
                onClick={() => handleDetail(product.id)}
            />

            {/* Label jenis */}
            <span
                className="text-xs text-gray-500 mb-1"
                onClick={() => handleDetail(product.id)}
            >
                Untuk: {product.jenis_barang.nama_jenis}
            </span>

            {/* Nama */}
            <h3
                className="text-sm font-medium text-center mb-1"
                onClick={() => handleDetail(product.id)}
            >
                {product.nama_barang}
            </h3>

            {/* Harga */}
            <p className="text-sm text-gray-700 mb-3">Rp {product.harga_jual.toLocaleString('id-ID')}</p>

            {/* Tombol beli + keranjang */}
            <div className="flex w-full gap-2">
                <Button
                    className="flex-1 bg-cyan-500 text-white text-sm rounded-md hover:bg-cyan-600 cursor-pointer"
					onClick={handleAddToCartClick} 
				>
                    Beli Sekarang
                </Button>
                <Button
                    className="bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600 cursor-pointer"
                    onClick={handleAddToCartClick} 
                >
                    <ShoppingCart size={16} />
                </Button>
            </div>
        </div>
    );
}
