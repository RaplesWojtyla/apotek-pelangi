'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { Button } from '@/components/ui/button';

const tourSteps: Step[] = [
    {
        title: 'Selamat Datang di Halaman Tebus Resep',
        content: 'Di sini Anda dapat dengan mudah mengunggah resep dari dokter untuk kami proses. Mari kita mulai!',
        placement: 'center',
        target: 'body',
    },
    {
        target: '#tour-upload-resep',
        content: 'Klik atau seret file gambar resep Anda ke area ini untuk mengunggahnya.',
        disableBeacon: true,
    },
    {
        target: '#tour-catatan-resep',
        content: 'Anda bisa menambahkan catatan untuk apoteker jika ada informasi tambahan (opsional).',
        disableBeacon: true,
    },
    {
        target: '#tour-kirim-resep-button',
        content: 'Setelah foto resep diunggah, klik tombol ini untuk mengirimkan pengajuan Anda.',
    },
    {
        target: '#tour-cek-status-link',
        content: 'Anda dapat memantau status semua pengajuan resep Anda di halaman ini.',
    },
    {
        target: '#tour-tutorial-accordion',
        content: 'Jika butuh panduan lebih detail, Anda selalu bisa melihatnya kembali di sini.',
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

export default function TebusResepTour() {
    const [run, setRun] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const hasViewedTour = localStorage.getItem('hasViewedTebusResepTour');
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
            localStorage.setItem('hasViewedTebusResepTour', 'true');
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