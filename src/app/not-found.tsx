import React from 'react';
import { Button } from '@/components/ui/button'; 

export default function NotFoundPage() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Halaman tidak ditemukan</h2>
            <p className="mb-6 max-w-md">
                Halaman yang kamu cari mungkin telah dihapus, namanya berubah, atau sedang tidak tersedia.
            </p>
            <Button>
                Kembali ke Beranda
            </Button>
        </div>
    );
}
