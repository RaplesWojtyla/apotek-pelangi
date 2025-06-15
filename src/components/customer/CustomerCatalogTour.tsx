'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { Button } from '@/components/ui/button';

const tourSteps: Step[] = [
    {
        title: 'Selamat Datang di Katalog Produk!',
        content: 'Ini adalah halaman katalog kami. Mari kita lihat cara berbelanja.',
        placement: 'center',
        target: 'body',
    },
    {
        target: '#tour-catalog-sidebar',
        content: 'Gunakan sidebar ini untuk memfilter produk berdasarkan kategori yang Anda inginkan.',
        disableBeacon: true,
    },
    {
        target: '#tour-buy-now-button',
        content: 'Klik tombol ini untuk langsung mebeli produk.',
        disableBeacon: true,
    },
    {
        target: '#tour-add-to-cart-button',
        content: 'Klik tombol ini untuk menambahkan produk ke keranjang belanja Anda.',
        disableBeacon: true,
    },
    {
        target: '#tour-cart-icon',
        content: 'Setelah ditambahkan, Anda dapat melihat semua item di keranjang Anda di sini dan melanjutkan ke pembayaran.',
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


export default function CustomerCatalogTour() {
    const [run, setRun] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const hasViewedTour = localStorage.getItem('hasViewedCatalogTour');
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
            localStorage.setItem('hasViewedCatalogTour', 'true');
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