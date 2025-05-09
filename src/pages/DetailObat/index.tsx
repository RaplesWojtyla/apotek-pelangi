import React from 'react'
import "../../app/globals.css";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Navbar from '@/components/Navbar';

export default function ProductDetailPage() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex justify-center">
                    <img src="/logo.png" alt="Prospan" className="w-64 h-64 rounded-lg" />
                </div>

                <div className="md:col-span-1 space-y-4">
                    <h1 className="text-2xl font-bold">Prospan Sirup</h1>
                    <p className="text-xl text-green-700 font-semibold">Rp8.700</p>

                    <div className="flex items-center gap-4">
                        <span className="text-sm">Jumlah:</span>
                        <div className="flex items-center border rounded-md overflow-hidden">
                            <button className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200">-</button>
                            <span className="px-4">1</span>
                            <button className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200">+</button>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <button className="flex-1 bg-cyan-500 text-white text-sm py-2 rounded-md hover:bg-cyan-600">
                            Beli Sekarang
                        </button>
                        <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
                            <ShoppingCart size={18} />
                        </button>
                    </div>

                    <div className="space-y-2 text-sm mt-4 leading-relaxed">
                        <p><strong>Kategori:</strong> Batuk dan Flu</p>
                        <p><strong>Deskripsi:</strong> Prospan sirup merupakan obat batuk herbal...</p>
                        <p><strong>Indikasi Umum:</strong> Meredakan batuk berdahak.</p>
                        <p><strong>Komposisi:</strong> Tiap 5 ml mengandung ekstrak daun ivy...</p>
                        <p><strong>Aturan Pakai:</strong> Sesudah makan sesuai usia.</p>
                        <p><strong>Kontra Indikasi:</strong> Hipersensitif.</p>
                        <p><strong>Efek Samping:</strong> Efek samping ringan.</p>
                        <p><strong>Produksi:</strong> Darya Varia.</p>
                    </div>
                </div>

                <div className="md:col-span-1 space-y-4">
                    {["Flutamol", "Paracetamol", "Expan", "Sanmol"].map((name, i) => (
                        <Card key={i} className="max-w-xs w-full mx-auto">
                            <CardContent className="p-4 flex flex-col items-center gap-2">
                                <img src={`/rekomendasi${i + 1}.png`} alt={name} className="w-16 h-16 rounded" />
                                <div className="flex w-full gap-2">
                                    <button className="flex-1 bg-cyan-500 text-white text-sm py-1 rounded-md hover:bg-cyan-600">
                                        Beli Sekarang
                                    </button>
                                    <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
                                        <ShoppingCart size={16} />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
            );
}