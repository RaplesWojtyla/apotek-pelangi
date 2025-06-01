"use client";

import Link from "next/link";

export default function DetailTebusResep() {
    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white">
            <div className="pt-10" />
            <h1 className="text-2xl font-bold mb-6 text-cyan-700">Detail Penebusan Resep</h1>
            {/* Stepper */}
            <div className="flex justify-between mb-8">
                {["Unggah Resep", "Verifikasi", "Pembayaran", "Menunggu Pengambilan", "Selesai"].map(
                    (step, idx) => (
                        <div key={step} className="flex-1">
                            <div
                                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 ${idx === 0
                                        ? "border-cyan-600 bg-cyan-600 text-white"
                                        : "border-gray-300 text-gray-400"
                                    } font-semibold`}
                            >
                                {idx + 1}
                            </div>
                            <p className="text-center text-xs mt-2 text-gray-600">{step}</p>
                        </div>
                    )
                )}
            </div>

            <div className="mb-6">
                <img src="logo.png" alt="Foto Resep" className="mx-auto max-h-64 object-contain" />
            </div>

            <div className="border rounded-md p-4 mb-6">
                <p><span className="font-semibold">Nama File:</span>nama file</p>
                <p><span className="font-semibold">Tanggal Upload:</span>tanggal</p>
                <p><span className="font-semibold">Status:</span>selesai</p>
                <p><span className="font-semibold">Catatan:</span> cepat eeee</p>
            </div>

            <Link
                href="/customer/tebusresep/list"
                className="inline-block px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
            >
                Kembali ke Daftar
            </Link>
        </div>
    );
}
