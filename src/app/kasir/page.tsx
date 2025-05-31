'use client' 

import { useState } from "react" 
import { useSearchParams } from "next/navigation"
import SearchBar from "@/components/SearchBar"
import Keranjang from "@/components/kasir/Keranjang" 
import CatalogProducts from "@/components/kasir/CatalogProductKasir"
import ProductPagination from "@/components/Pagination"
import { Product } from "@/action/product.action" 

export interface CartItem extends Product {
  qty: number;
  name: string;  
  price: number; 
}

export default function DashboardKasirPage() {
  const searchParams = useSearchParams()
  const search = String(searchParams.get('matcher') ?? '')
  const page = Number(searchParams.get('page') ?? 1)
  const take: number = 8

  const [kasirCartItems, setKasirCartItems] = useState<CartItem[]>([])

  
  const handleAddToCartForKasir = (product: Product) => {
    setKasirCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, {
          ...product,
          qty: 1,
          name: product.nama_barang, 
          price: product.harga_jual 
        }];
      }
    });
  };

  
  const handleUpdateKasirCartItem = (id: string, newQty: number) => {
    setKasirCartItems(prevItems => {
      if (newQty <= 0) {
  
        return prevItems.filter(item => item.id !== id);
      }
  
      return prevItems.map(item =>
        item.id === id ? { ...item, qty: newQty } : item
      );
    });
  };

  
  const handleRemoveFromKasirCart = (id: string) => {
    setKasirCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

      <div className="flex-1">
        <SearchBar />
        <h1 className="text-2xl font-bold mb-6">Semua Produk</h1>
        <CatalogProducts
          search={search}
          currPage={page}
          take={take}
          onAddToCart={handleAddToCartForKasir} 
        />
        <ProductPagination />
      </div>

      <div className="hidden lg:block w-[380px] flex-shrink-0">
        <aside className="sticky top-4 w-full bg-white border shadow-md rounded-md max-h-[calc(100vh-2rem)] overflow-y-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-cyan-600">🛒 Keranjang</h2>
          <Keranjang
            items={kasirCartItems} 
            onUpdateQty={handleUpdateKasirCartItem} 
            onRemoveItem={handleRemoveFromKasirCart} 
          />
        </aside>
      </div>
    </div>
  )
}