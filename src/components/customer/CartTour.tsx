'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { Button } from '@/components/ui/button';

const tourSteps: Step[] = [
    {
        title: 'Selamat Datang di Keranjang Belanja',
        content: 'Di sini Anda dapat melihat semua produk yang telah Anda tambahkan. Mari kita lihat fitur-fitur yang ada.',
        placement: 'center',
        target: 'body',
    },
    {
        target: '#tour-cart-tabs', 
        content: 'Anda dapat memfilter tampilan keranjang untuk melihat semua item, hanya obat satuan, atau hanya obat resep.',
        disableBeacon: true,
    },
    {
        target: '#tour-item-list',
        content: 'Ini adalah daftar produk di keranjang Anda. Mari kita lihat aksi yang bisa Anda lakukan pada setiap item.',
        disableBeacon: true,
    },
    {
        target: '#tour-quantity-controls', 
        content: 'Gunakan tombol plus (+) dan minus (-) ini untuk mengubah jumlah produk yang ingin Anda beli.',
        disableBeacon: true,
        placement: 'right',
    },
    {
        target: '#tour-delete-item-button',
        content: 'Gunakan tombol ini jika Anda ingin menghapus produk dari keranjang.',
        disableBeacon: true,
    },
    {
        target: '#tour-summary-card',
        content: 'Ringkasan pesanan Anda, termasuk total harga, akan ditampilkan di sini.',
    },
    {
        target: '#tour-checkout-button-cart',
        content: 'Jika semua sudah sesuai, klik tombol ini untuk melanjutkan ke halaman pembayaran.',
    }
];

const CustomTooltip = ({
  index,
  isLastStep,
  step,
  backProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => (
  <div {...tooltipProps} className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
    {step.title && <h2 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h2>}
    <div className="text-sm text-slate-600">{step.content}</div>
    <div className="flex justify-between items-center mt-4">
      {index > 0 && (
        <Button variant="ghost" {...backProps}>
          Kembali
        </Button>
      )}
      <div className='flex-grow' />
      <Button {...primaryProps}>
        {isLastStep ? "Selesai" : "Lanjut"}
      </Button>
    </div>
  </div>
);

export default function CartTour() {
    const [run, setRun] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const hasViewedTour = localStorage.getItem('hasViewedCartTour');
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
            localStorage.setItem('hasViewedCartTour', 'true');
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