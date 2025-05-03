import React from "react";
import "../../app/globals.css";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Rhinus SR 60 Kapsul",
    price: "Rp21.000/strip",
    image: "/images/product1.png"
  },
  {
    name: "Rhinofed 4.5mg/60ml",
    price: "Rp21.500/botol",
    image: "/images/product2.png"
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png"
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png"
  },
];

export default function CustDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
      <div className="grid grid-cols-5 gap-6 px-10 py-8">
        <aside className="col-span-1">
          <Sidebar />
        </aside>
        <main className="col-span-4">
          <h1 className="text-2xl font-bold mb-6">Semua Kategori</h1>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10 space-x-2">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 text-sm hover:bg-gray-200"
              >
                {n}
              </button>
            ))}
            <span className="text-sm text-gray-600">next ›</span>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
