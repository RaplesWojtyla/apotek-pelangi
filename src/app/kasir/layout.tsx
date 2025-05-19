import { syncUser } from '@/action/user.action';
import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export default async function KasirLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    try {
        await syncUser()
    } catch (e) {
        console.error(`Gagal menyinkronkan data user.`)
    }

    return (
        <ClerkProvider>
            <html lang="id">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <Navbar />
                    <main className="min-h-[calc(100vh-10rem)]">
                        {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}