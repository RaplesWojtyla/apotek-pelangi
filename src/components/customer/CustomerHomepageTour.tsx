
'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { Button } from '@/components/ui/button'; // Menggunakan komponen Button Anda

// Definisikan 'steps' DI LUAR KOMPONEN untuk mencegah bug.
const tourSteps: Step[] = [
    {
        title: 'Selamat Datang di Apotek Pelangi!',
        content: 'Kami akan memandu Anda melihat fitur-fitur utama di halaman ini.',
        placement: 'center',
        target: 'body',
    },
    {
        target: '#tour-kategori',
        content: 'Jelajahi produk kami berdasarkan kategori untuk pencarian yang lebih mudah.',
        disableBeacon: true,
    },
    {
        target: '#tour-all-kategori',
        content: 'Klik di sini untuk melihat semua kategori yang tersedia.',
    },
    {
        target: '.tour-latest',
        content: 'Ini adalah daftar produk kami. Jika Anda pernah berbelanja, kami akan menampilkan produk yang terakhir Anda beli.',
    },
    {
        target: '#tour-tebus',
        content: 'Punya resep dari dokter? Unggah resep Anda di sini dan biarkan kami yang siapkan obatnya.',
    }
];

// --- PERBAIKAN: Komponen tooltip sekarang lebih pintar ---
// Komponen kustom untuk Tooltip agar bisa menggunakan komponen Button dari ShadCN
const CustomTooltip = ({
  index,
  isLastStep, // Kita akan menggunakan prop 'isLastStep' yang disediakan Joyride
  step,
  backProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => (
  <div {...tooltipProps} className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
    {step.title && <h2 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h2>}
    <div className="text-sm text-slate-600">{step.content}</div>
    <div className="flex justify-between items-center mt-4">
      {/* Tampilkan tombol "Kembali" hanya jika bukan langkah pertama */}
      {index > 0 && (
        <Button variant="ghost" {...backProps}>
          Kembali
        </Button>
      )}
      {/* Spacer agar tombol utama ke kanan */}
      <div className='flex-grow' /> 
      {/* Tombol utama yang teksnya berubah secara dinamis */}
      <Button {...primaryProps}>
        {isLastStep ? "Selesai" : "Lanjut"}
      </Button>
    </div>
  </div>
);


export default function CustomerTour() {
    const [run, setRun] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const hasViewedTour = localStorage.getItem('hasViewedHomepageTour');
            if (!hasViewedTour) {
                const timer = setTimeout(() => {
                    setRun(true);
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [isClient]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = ['finished', 'skipped'];

        if (finishedStatuses.includes(status)) {
            localStorage.setItem('hasViewedHomepageTour', 'true');
            setRun(false);
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <Joyride
            run={run}
            steps={tourSteps}
            continuous
            callback={handleJoyrideCallback}
            scrollOffset={150}
            spotlightPadding={10}
            tooltipComponent={CustomTooltip}
            styles={{
              options: {
                zIndex: 9999
              }
            }}
        />
    );
}
