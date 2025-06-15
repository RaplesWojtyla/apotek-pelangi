'use client' // <-- Tambahkan ini untuk menggunakan hooks

import TebusResepTour from "@/components/customer/TebusResepTour";
import UploadResepForm from "@/components/customer/UploadResepForm";
import TutorTebus from "@/components/TutorTebus";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs"; // <-- Impor hook dan komponen Clerk
import Link from "next/link";
import { Button } from "@/components/ui/button"; // <-- Impor Button

export default function TebusResep() {
    const { isSignedIn } = useUser(); // <-- Dapatkan status login pengguna

    return (
        <div className="min-h-screen bg-white p-4 md:p-8 max-w-3xl mx-auto">
            <div className="pt-10" />
            <h1 className="text-2xl font-bold mb-2 text-cyan-700">Tebus Resep</h1>

            <p className="text-sm text-gray-600 mb-6">
                Unggah foto resep dari dokter untuk kami proses. Setelah disetujui, obat akan masuk ke keranjang dan bisa dibayar melalui halaman checkout.
            </p>

            {/* --- Logika Kondisional Dimulai Di Sini --- */}
            {isSignedIn ? (
                // KONTEN UNTUK PENGGUNA YANG SUDAH LOGIN
                <>
                    <TebusResepTour />
                    <UploadResepForm />
                    <div className="my-6 text-center text-sm text-gray-700">
                        <p>
                            Setelah mengupload resep, kamu bisa cek status penebusan di halaman{" "}
                            <Link
                                id="tour-cek-status-link"
                                href="/customer/tebusresep/list"
                                className="text-cyan-600 font-semibold underline"
                            >
                                Daftar Penebusan Resep
                            </Link>
                            .
                        </p>
                    </div>
                </>
            ) : (
                // KONTEN UNTUK PENGGUNA TAMU (BELUM LOGIN)
                <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-8 my-8">
                    <h3 className="text-xl font-semibold text-gray-800">Silakan Masuk Terlebih Dahulu</h3>
                    <p className="text-gray-500 mt-2 mb-6">
                        Untuk dapat mengunggah dan menebus resep dokter, Anda perlu masuk ke akun Anda atau mendaftar jika belum memiliki akun.
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        <SignInButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
                            <Button variant="outline">Masuk</Button>
                        </SignInButton>
                        <SignUpButton mode="modal" fallbackRedirectUrl="/sign-in/callback">
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Daftar Sekarang</Button>
                        </SignUpButton>
                    </div>
                </div>
            )}
            {/* --- Logika Kondisional Selesai --- */}

            <div id="tour-tutorial-accordion">
                <TutorTebus />
            </div>
        </div>
    );
}