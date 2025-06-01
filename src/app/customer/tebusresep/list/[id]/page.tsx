"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface ResepDetail {
    id: number;
    namaFile: string;
    tanggalUpload: string;
    status: string;
    catatan?: string;
    fotoUrl: string;
}

// Dummy fetch function untuk contoh
function fetchResepDetail(id: number): ResepDetail | null {
    const dummyData: ResepDetail[] = [
        {
            id: 1,
            namaFile: "resep1.jpg",
            tanggalUpload: "2025-05-28",
            status: "Diproses",
            catatan: "Tolong cepat diproses",
            fotoUrl: "/logo.png",
        },
        {
            id: 2,
            namaFile: "resep2.png",
            tanggalUpload: "2025-05-29",
            status: "Selesai",
            catatan: "Sudah dibayar",
            fotoUrl: "/logo.png",
        },
    ];
    return dummyData.find((item) => item.id === id) ?? null;
}

export default function DetailTebusResep({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = parseInt(params.id, 10);
    const resep = fetchResepDetail(id);

    if (!resep) {
        return (
            <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white text-center">
                <p className="text-red-600 font-semibold">Resep tidak ditemukan.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
                >
                    Kembali
                </button>
            </div>
        );
    }

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
                <img src={resep.fotoUrl} alt="Foto Resep" className="mx-auto max-h-64 object-contain" />
            </div>

            <div className="border rounded-md p-4 mb-6">
                <p><span className="font-semibold">Nama File:</span> {resep.namaFile}</p>
                <p><span className="font-semibold">Tanggal Upload:</span> {resep.tanggalUpload}</p>
                <p><span className="font-semibold">Status:</span> {resep.status}</p>
                {resep.catatan && <p><span className="font-semibold">Catatan:</span> {resep.catatan}</p>}
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
