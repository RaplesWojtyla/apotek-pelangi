import React from "react";
import "../../app/globals.css";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-sm">
                {/* Back & Title */}
                <div className="text-gray-700 text-sm">
                    <h2 className="text-xl font-bold text-gray-800">Keranjang</h2>
                </div>

                {/* Alamat Pengiriman */}
                <section className="border rounded-lg p-4">
                    <div className="flex justify-between items-start w-full">
                        <div className="text-sm text-gray-700">
                            <h2 className="font-semibold text-base text-black">Alamat Pengiriman</h2>
                            <p>Jane Cooper</p>
                            <p>(+62) 81976564321</p>
                        </div>
                        <div className="text-sm text-gray-700 text-center absolute left-1/2 transform -translate-x-1/2">
                            <p>Jl. Raya Bahagia No.25C, Tangerang Selatan, Tangerang</p>
                        </div>
                        <div>
                            <Button variant="outline" className="text-sm h-9">Pilih Alamat Lain</Button>
                        </div>
                    </div>
                </section>


                {/* Produk Dipesan */}
                <h2 className="font-semibold mb-2">Produk Dipesan</h2>
                <section className="border rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <img src="/produk.png" alt="FG Troches" className="w-20 h-20 object-cover" />
                        <p className="col-span-1">FG Troches 30 Tablet</p>
                        <p className="text-center">Rp 12.000</p>
                        <div className="text-right">
                            <p>Jumlah: 1</p>
                            <p className="font-semibold">Subtotal: Rp 12.000</p>
                        </div>
                    </div>
                </section>

                {/* Pengiriman */}
                <h2 className="font-semibold mb-2">Pengiriman</h2>
                <section className="border rounded-lg p-4 flex items-center gap-4">
                    <img src="/jne.png" alt="JNE" className="w-24" />
                    <div>
                        <p className="font-semibold">Pengiriman Reguler</p>
                        <p className="text-gray-600">Estimasi: 6 - 8 Apr 2025</p>
                        <p className="text-gray-600">Rp 20.000</p>
                    </div>
                </section>

                {/* Pembayaran */}
                <h2 className="font-semibold mb-2">Pembayaran</h2>
                <section className="border rounded-lg p-4 flex items-center gap-4">
                    <img src="/bca.png" alt="BCA" className="w-20" />
                    <div>
                        <p className="font-semibold">No. Rek: 1234567890</p>
                        <p className="text-gray-700">A/N Ottertek Indonesia</p>
                        <p className="text-gray-600 text-xs mt-2">
                            Konfirmasi di atas jam 21.00 atau di Hari Libur?
                            <br /> Pesanan akan diproses pada hari kerja berikutnya.
                        </p>
                    </div>
                </section>

                {/* Ringkasan */}
                <section className="border rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal untuk produk</span>
                        <span>Rp 12.000</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total ongkos kirim</span>
                        <span>Rp 20.000</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total Pembayaran</span>
                        <span>Rp 32.000</span>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline">Batalkan Pesanan</Button>
                        <Button>Selesaikan Pesanan</Button>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
