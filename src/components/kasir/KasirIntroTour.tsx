'use client'

import Joyride, { Step, CallBackProps, TooltipRenderProps, STATUS } from 'react-joyride';
import { Button } from '@/components/ui/button';

const introSteps: Step[] = [
    {
        title: 'Selamat Datang di Antarmuka Kasir',
        content: 'Tur ini akan memandu Anda melalui fitur-fitur utama yang tersedia.',
        placement: 'center',
        target: 'body',
    },
    {
        target: '#tour-kasir-sidebar',
        content: 'Gunakan sidebar ini untuk memfilter produk berdasarkan kategori yang tersedia.',
        disableBeacon: true,
        placement: 'right'
    },
    {
        target: '#tour-search',
        content: 'Anda dapat mencari produk secara spesifik melalui kolom pencarian ini.',
        disableBeacon: true,
    },
    {
        target: '#tour-kasir-daftar',
        content: 'Untuk memproses penebusan resep dan menerima transaksi online, akses menu ini.',
        disableBeacon: true,
    },
    {
        target: '#tour-kasir-history',
        content: 'Untuk melihat riwayat transaksi, Anda dapat mengaksesnya melalui tombol ini.',
        disableBeacon: true,
    },
    {
        target: '#tour-kasir-add-to-cart',
        content: 'Sekarang, coba klik tombol ini untuk menambahkan produk ke keranjang. Tur selanjutnya akan muncul di sana.',
        disableBeacon: true,
    },
];

const CustomTooltip = ({ index, isLastStep, step, backProps, primaryProps, tooltipProps }: TooltipRenderProps) => (
    <div {...tooltipProps} className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
        {step.title && <h2 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h2>}
        <div className="text-sm text-slate-600">{step.content}</div>
        <div className="flex justify-between items-center mt-4">
            {index > 0 && (<Button variant="ghost" {...backProps}>Kembali</Button>)}
            <div className='flex-grow' />
            <Button {...primaryProps}>{isLastStep ? "Mengerti" : "Lanjut"}</Button>
        </div>
    </div>
);

interface TourProps {
    run: boolean;
    setRun: (run: boolean) => void;
}

export default function KasirIntroTour({ run, setRun }: TourProps) {
    const handleCallback = (data: CallBackProps) => {
        const { status } = data;
        // --- PERBAIKAN DI SINI ---
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            setRun(false);
            localStorage.setItem('hasViewedKasirIntroTour', 'true');
        }
    };

    return (
        <Joyride
            run={run}
            steps={introSteps}
            continuous
            callback={handleCallback}
            tooltipComponent={CustomTooltip}
            scrollOffset={150}
            styles={{ options: { zIndex: 9999 } }}
        />
    );
}