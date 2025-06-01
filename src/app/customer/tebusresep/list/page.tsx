"use client";

import { useState } from "react";
import Link from "next/link";

interface Resep {
    id: number;
    namaFile: string;
    tanggalUpload: string;
    status: "diproses" | "selesai" | "ditolak";
}

export default function ListTebusResep() {
    // Dummy data resep yang sudah diupload
    const [resepList, setResepList] = useState<Resep[]>([
        { id: 1, namaFile: "resep1.jpg", tanggalUpload: "2025-05-28", status: "diproses" },
        { id: 2, namaFile: "resep2.png", tanggalUpload: "2025-05-29", status: "selesai" },
    ]);

    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white">
            <div className="pt-10" />
            <h1 className="text-2xl font-bold mb-6 text-cyan-700">Daftar Penebusan Resep</h1>

            <Link
                href="/customer/tebusresep"
                className="inline-block mb-6 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
            >
                + Upload Resep Baru
            </Link>

            {resepList.length === 0 ? (
                <p className="text-gray-600">Belum ada resep yang diupload.</p>
            ) : (
                <ul className="space-y-4">
                    {resepList.map(({ id, namaFile, tanggalUpload, status }) => (
                        <li key={id} className="border border-gray-300 rounded-md p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{namaFile}</p>
                                <p className="text-sm text-gray-500">Tanggal upload: {tanggalUpload}</p>
                                <p className={`text-sm font-semibold ${status === "diproses"
                                        ? "text-yellow-600"
                                        : status === "selesai"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}>Status: {status}</p>
                            </div>
                            <Link
                                href={`/customer/tebusresep/list/${id}`}
                                className="text-cyan-600 hover:underline font-semibold"
                            >
                                Lihat Detail
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
