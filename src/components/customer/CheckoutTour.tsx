'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { Button } from '@/components/ui/button';

const tourSteps: Step[] = [
    {
        title: 'Langkah Terakhir!',
        content: 'Selamat datang di halaman pembayaran. Pastikan semua informasi sudah benar sebelum melanjutkan.',
        placement: 'center',
        target: 'body',
    },
    {
        target: '#tour-info-penerima',
        content: 'Harap periksa kembali nama dan nomor telepon penerima. Pastikan data ini sudah benar untuk kami hubungi jika diperlukan.',
        disableBeacon: true,
    },
    {
        target: '#tour-metode-pembayaran',
        content: 'Pilih salah satu metode pembayaran yang Anda inginkan.',
        disableBeacon: true,
    },
    {
        target: '#tour-ringkasan-order',
        content: 'Di sini Anda dapat melihat ringkasan pesanan Anda. Pastikan semua item dan total harga sudah sesuai.',
    },
    {
        target: '#tour-checkout-button',
        content: 'Jika semua sudah benar, klik tombol ini untuk melanjutkan ke gerbang pembayaran dan menyelesaikan transaksi Anda.',
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

export default function CheckoutTour() {
    const [run, setRun] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const hasViewedTour = localStorage.getItem('hasViewedCheckoutTour');
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
            localStorage.setItem('hasViewedCheckoutTour', 'true');
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