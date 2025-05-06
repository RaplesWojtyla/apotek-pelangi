import React from "react";
import "../../app/globals.css";
import  Navbar  from "@/components/Navbar";
import AppSidebar from "@/components/sidebar"; 
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductPagination from "@/components/pagination";

const products = [
  {
    name: "Rhinus SR 60 Kapsul",
    price: "Rp21.000/strip",
    image: "/logo.png",
  },
  {
    name: "Rhinofed 4.5mg/60ml",
    price: "Rp21.500/botol",
    image: "/images/product2.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Rhinus SR 60 Kapsul",
    price: "Rp21.000/strip",
    image: "/images/product1.png",
  },
  {
    name: "Rhinofed 4.5mg/60ml",
    price: "Rp21.500/botol",
    image: "/images/product2.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Rhinus SR 60 Kapsul",
    price: "Rp21.000/strip",
    image: "/images/product1.png",
  },
  {
    name: "Rhinofed 4.5mg/60ml",
    price: "Rp21.500/botol",
    image: "/images/product2.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Rhinus SR 60 Kapsul",
    price: "Rp21.000/strip",
    image: "/images/product1.png",
  },
  {
    name: "Rhinofed 4.5mg/60ml",
    price: "Rp21.500/botol",
    image: "/images/product2.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
  {
    name: "Termorex Sirup 60 ml",
    price: "Rp8.000/botol",
    image: "/images/product3.png",
  },
];


export default function Catalog() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar Fixed Desktop */}
      <AppSidebar />

      {/* Content Wrapper */}
      <div className="lg:ml-64">
        {/* Main Content */}
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-6">Semua Kategori</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
          <ProductPagination/>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}