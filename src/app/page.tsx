// app/page.tsx
'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { getDashboardData, DashboardData, getLimitedJenisBarangWithCategories, JenisBarangWithCategory } from '@/action/dashboard.action';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

export default function Home() {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        userCount: 0,
        barangCount: 0,
        jenisBarangCount: 0,
        kategoriBarangNames: [],
        jenisBarangNames: [],
    });

    const [displayJenisBarang, setDisplayJenisBarang] = useState<JenisBarangWithCategory[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const dashboardResult = await getDashboardData();
                if (dashboardResult.success && dashboardResult.data) {
                    setDashboardData(dashboardResult.data);
                } else {
                    setError(dashboardResult.error || "Gagal memuat data dashboard.");
                }

                const limitedJenisResult = await getLimitedJenisBarangWithCategories();
                if (limitedJenisResult.success && limitedJenisResult.data) {
                    setDisplayJenisBarang(limitedJenisResult.data);
                } else {
                    setError(limitedJenisResult.error || "Gagal memuat daftar jenis barang.");
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Terjadi kesalahan: ${err instanceof Error ? err.message : String(err)}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Menggunakan useUser dari Clerk untuk kondisional rendering SignIn/UserButton
    const { isSignedIn } = useUser(); // Hook useUser dari Clerk

    return (
        <div className="bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-cyan-500 text-white text-center px-6 overflow-hidden relative pb-24">
                <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center relative z-10 min-h-screen pt-20 pb-10">
                    <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
                        {/* Kolom Kiri: Teks Konten Apotek Pelangi */}
                        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up">
                            <p className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wide text-yellow-300">
                                Kesehatan Terjamin, Hidup Lebih Tenang.
                            </p>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                                Tentang Apotek Pelangi
                            </h1>
                            <p className="text-lg font-semibold text-white/90 mb-4">
                                Apotek Pelangi adalah solusi terlengkap untuk kebutuhan Kesehatan harian Anda
                            </p>
                            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/80">
                                Dapatkan semua kebutuhan Kesehatan Anda dengan mudah melalui ekosistem kami. Kami bermitra dengan <strong className="text-yellow-300">{loading ? '...' : dashboardData.userCount}</strong> Member Apotek Pelangi yang menyediakan <strong className="text-yellow-300">{loading ? '...' : dashboardData.barangCount}</strong> produk dan menjangkau <strong className="text-yellow-300">{loading ? '...' : dashboardData.jenisBarangCount}</strong> jenis produk.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                                <Link href="/customer/catalog">
                                    <button className="bg-yellow-500 text-cyan-800 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                                        Jelajahi Produk Kami
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Kolom Kanan: Gambar Pil Apotek Pelangi */}
                        <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0 animate-fade-in-right">
                            <Image
                                src="/img/hero.png"
                                alt="Ilustrasi Dua Kapsul Obat"
                                width={400}
                                height={400}
                                className="object-contain rounded-full drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistik Box Section (Data Dinamis) */}
            <section className="relative z-10 -mt-20">
                <div className="max-w-5xl mx-auto px-4">
                    {loading ? (
                        <p className="text-center text-gray-700 text-lg py-10">Memuat data statistik...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 text-lg py-10">Error: {error}</p>
                    ) : (
                        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6">
                            <div className="bg-white border border-gray-200 p-6 shadow-lg rounded-lg text-center w-full sm:w-72">
                                <p className="text-4xl text-cyan-800 font-extrabold mb-2">{dashboardData.jenisBarangCount}</p>
                                <p className="text-lg font-semibold text-cyan-800 mb-4">Jenis Produk</p>
                                <Link href="/customer/catalog">
                                    <button className="w-full text-yellow-500 font-bold border border-yellow-500 rounded-full px-6 py-3 hover:bg-yellow-500 hover:text-cyan-800 transition-colors duration-300">
                                        Jelajahi
                                    </button>
                                </Link>
                            </div>
                            <div className="bg-white border border-gray-200 p-6 shadow-lg rounded-lg text-center w-full sm:w-72">
                                <p className="text-4xl text-cyan-800 font-extrabold mb-2">{dashboardData.userCount}</p>
                                <p className="text-lg font-semibold text-cyan-800 mb-4">Member Apotek Pelangi</p>
                                {/* Tombol "Jadi Member Kami" - Disabled jika isSignedIn true */}
                                <SignUpButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
                                    <button
                                        className={`w-full font-bold border rounded-full px-6 py-3 transition-colors duration-300 ${
                                            isSignedIn
                                                ? 'text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-cyan-800'
                                                : 'text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-cyan-800'
                                        }`}
                                        disabled={isSignedIn} // Properti disabled berdasarkan isSignedIn
                                    >
                                        {isSignedIn ? 'Jadi Member Kami' : 'Jadi Member Kami'}
                                    </button>
                                </SignUpButton>
                            </div>
                            <div className="bg-white border border-gray-200 p-6 shadow-lg rounded-lg text-center w-full sm:w-72">
                                <p className="text-4xl text-cyan-800 font-extrabold mb-2">{dashboardData.barangCount}</p>
                                <p className="text-lg font-semibold text-cyan-800 mb-4">Produk Tersedia</p>
                                <Link href="/customer/catalog">
                                    <button className="w-full text-yellow-500 font-bold border border-yellow-500 rounded-full px-6 py-3 hover:bg-yellow-500 hover:text-cyan-800 transition-colors duration-300">
                                        Lihat Produk
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Section "Belanja Aneka Produk Kesehatan" (Daftar Jenis Barang Dinamis dengan Link) */}
            <section className="bg-white px-6 md:px-12 py-16">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
                    <div className="lg:w-1/3 flex justify-center">
                        <Image
                            src="/img/gambarobat.png"
                            alt="Produk Kesehatan"
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                    </div>
                    <div className="lg:w-2/3 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                            Belanja Aneka Produk Kesehatan Mulai <br className="hidden md:block" />
                            Dari Obat sampai dengan Produk <span className="bg-yellow-400 px-2 rounded">Kecantikan</span>
                        </h2>
                        {loading ? (
                            <p className="text-center text-gray-700 text-lg">Memuat jenis produk...</p>
                        ) : error ? (
                            <p className="text-center text-red-500 text-lg">Error memuat jenis produk: {error}</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {displayJenisBarang.length > 0 ? (
                                    displayJenisBarang.map((jB) => (
                                        <div key={jB.id} className="p-4 border border-yellow-400 rounded-lg text-center font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                            <Link
                                                href={`/customer/catalog?jenisId=${jB.id}&kategoriNama=${encodeURIComponent(jB.kategori_barang.nama_kategori)}&jenisNama=${encodeURIComponent(jB.nama_jenis)}`}
                                                className="block text-gray-700 hover:text-cyan-600 transition cursor-pointer"
                                            >
                                                {jB.nama_jenis}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-full text-gray-600">Tidak ada jenis barang ditemukan.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section "Tersedia produk berdasarkan kondisi Kesehatan" (Tidak Diubah) */}
            <section className="bg-white py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
                        Tersedia produk berdasarkan <span className="bg-yellow-400 px-2 rounded">kondisi kesehatanmu</span>
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-6 gap-y-8 justify-items-center">
                        {[
                            'Batuk & Flu', 'Diabetes', 'Antibiotik', 'Anti Nyeri', 'Jantung', 'Demam',
                            'Diare', 'Hipertensi', 'Antiseptik', 'Lambung', 'Vertigo', 'Diet',
                            'Consumer Goods', 'Asma',
                        ].map((label, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link href="/customer/catalog">
                            <button className="bg-cyan-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-cyan-600 transition duration-300 shadow-md">
                                Lihat Katalog Produk
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section "Mengapa Memilih Apotek Pelangi?" */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Mengapa Memilih Apotek Pelangi?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Kartu 1: Produk Asli */}
                        <div className="flex flex-col items-center p-8 bg-cyan-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                            <svg className="w-16 h-16 text-cyan-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Produk 100% Asli & BPOM</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Agar Anda tenang dan aman, hanya obat terjamin asli dari distributor resmi dan sudah lulus BPOM.</p>
                        </div>

                        {/* Kartu 2: Proses Cepat & Mudah */}
                        <div className="flex flex-col items-center p-8 bg-orange-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                            <svg className="w-16 h-16 text-orange-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Proses Cepat & Mudah</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Pesan obat secara online dan ambil langsung di apotek tanpa perlu antre. Cepat, mudah, dan hemat waktu.</p>
                        </div>

                        {/* Kartu 3: Pilihan Pembayaran Lengkap */}
                        <div className="flex flex-col items-center p-8 bg-blue-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                            <svg className="w-16 h-16 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pilihan Pembayaran Lengkap</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Nikmati kemudahan bertransaksi dengan berbagai metode pembayaran aman: E-wallet, transfer bank, dan QRIS.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}