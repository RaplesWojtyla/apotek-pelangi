'use client'

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Resep Tn. Patra",
      type: "Obat dengan resep",
      price: 21000,
      status: "available",
      image: "/logo.png",
    },
    {
      id: 2,
      name: "Paracetamol",
      type: "Obat & Perawatan",
      price: 21000,
      status: "available",
      image: "/logo.png",
    },
    {
      id: 3,
      name: "Paracetamol",
      type: "Obat & Perawatan",
      price: 21000,
      status: "out_of_stock",
      image: "/logo.png",
    },
  ];

  const availableItems = cartItems.filter((item) => item.status === "available");
  const subtotal = availableItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-3xl font-bold mb-6">Keranjang</h1>

        <Tabs defaultValue="semua" className="mb-6">
          <TabsList className="flex flex-wrap gap-2 w-full sm:w-[805px]">
            <TabsTrigger value="semua" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Semua
            </TabsTrigger>
            <TabsTrigger value="obat-satuan" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Obat Satuan
            </TabsTrigger>
            <TabsTrigger value="obat-resep" className="flex-1 h-10 rounded-xl border border-gray-300 text-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Obat Resep
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-start mb-4">
          <label className="flex items-center space-x-2 text-base">
            <Checkbox />
            <span>Pilih Semua</span>
            <span className="text-sm text-red-600 cursor-pointer mt-1 ml-[36rem] max-sm:ml-48">
              Hapus Semua
            </span>
          </label>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row justify-between sm:items-center p-4 sm:p-6 rounded-2xl border ${item.status === "out_of_stock"
                  ? "bg-red-200 border-red-300"
                  : "bg-white border-gray-300"
                  } shadow-sm`}
              >
                <div className="flex items-start sm:items-center flex-1">
                  <Checkbox disabled={item.status === "out_of_stock"} className="mr-4 mt-1 sm:mt-0" />
                  <Image src={item.image} alt={item.name} width={70} height={70} />
                  <div className="ml-4 sm:ml-6">
                    <h4 className="font-semibold text-sm sm:text-base mb-1">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">{item.type}</p>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${item.status === "available"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                        }`}
                    >
                      {item.status === "available" ? "Stok Tersedia" : "Stok tidak tersedia"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-center mt-4 sm:mt-0 space-x-2 w-full sm:w-40">
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-lg">
                    -
                  </Button>
                  <span className="font-semibold text-sm sm:text-base">1</span>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-lg">
                    +
                  </Button>
                </div>

                <div className="text-sm sm:text-base font-semibold mt-2 sm:mt-0 sm:w-28 text-right">
                  Rp{item.price.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="bg-white border border-gray-300 shadow-sm rounded-2xl p-4 sm:p-6 h-fit">
            <h4 className="font-semibold text-base">
              Sub Total ({availableItems.length} Produk)
            </h4>
            <hr className="my-4" />
            <div className="flex justify-between text-sm sm:text-base mb-4">
              <span>Total Harga :</span>
              <span className="font-bold">Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
            <Button className="w-full bg-black text-white text-sm font-semibold h-10 rounded-full">
              Bayar sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
