'use client'

import Joyride, { Step, CallBackProps, TooltipRenderProps, STATUS } from 'react-joyride';
import { Button } from '@/components/ui/button';

const cartSteps: Step[] = [
    {
        target: '#tour-kasir-side-cart',
        title: 'Keranjang Belanja',
        content: 'Bagus! Item sudah masuk keranjang. Sekarang mari kita lihat bagian ini.',
        disableBeacon: true,
        placement: 'left'
    },
    {
        target: '#tour-kasir-resep-check',
        content: 'Jika item ini memakai resep dokter, centang kotak ini. Opsi untuk mengunggah foto resep akan muncul di bagian bawah.',
        disableBeacon: true,
        placement: 'left',
    },
    {
        target: '#tour-kasir-member-input',
        content: 'Jika pelanggan adalah member, masukkan email mereka di sini untuk mencari dan memilihnya.',
        disableBeacon: true,
        placement: 'left'
    },
    {
        target: '#tour-kasir-payment-input',
        content: 'Setelah semua item masuk, masukkan jumlah uang yang dibayarkan oleh pelanggan di kolom ini.',
        disableBeacon: true,
        placement: 'left'
    },
    {
        target: '#tour-kasir-save-button',
        content: 'Terakhir, klik tombol ini untuk menyimpan transaksi dan menyelesaikan proses.',
        disableBeacon: true,
        placement: 'left'
    }
];

const CustomTooltip = ({ index, isLastStep, step, backProps, primaryProps, tooltipProps }: TooltipRenderProps) => (
    <div {...tooltipProps} className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
        {step.title && <h2 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h2>}
        <div className="text-sm text-slate-600">{step.content}</div>
        <div className="flex justify-between items-center mt-4">
            {index > 0 && (<Button variant="ghost" {...backProps}>Kembali</Button>)}
            <div className='flex-grow' />
            <Button {...primaryProps}>{isLastStep ? "Selesai" : "Lanjut"}</Button>
        </div>
    </div>
);

interface TourProps {
    run: boolean;
    setRun: (run: boolean) => void;
}

export default function KasirCartTour({ run, setRun }: TourProps) {
    const handleCallback = (data: CallBackProps) => {
        const { status } = data;
        // --- PERBAIKAN DI SINI ---
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            setRun(false);
            localStorage.setItem('hasViewedKasirCartTour', 'true');
        }
    };

    return (
        <Joyride
            run={run}
            steps={cartSteps}
            continuous
            callback={handleCallback}
            tooltipComponent={CustomTooltip}
            scrollOffset={150}
            styles={{ options: { zIndex: 9999 } }}
        />
    );
}