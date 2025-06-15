'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, TooltipRenderProps } from 'react-joyride';
import { Button } from '@/components/ui/button';

const tourSteps: Step[] = [
    {
        target: 'body',
        content: 'Selamat datang di katalog kami! Anda bisa melihat semua produk yang kami tawarkan.',
        placement: 'center',
    },
   {
        target: '#tour-search',
        content: 'Anda dapat menjelajahi berbagai macam produk kami di sini.',
        disableBeacon: true,
    },
    {
        target: '#tour-catalog-sidebar',
        content: 'Anda juga dapat memfilter produk berdasarkan kategori dan jenis.',
        disableBeacon: true,
    },
    {
        target: '#tour-guest-signup-button',
        content: 'Untuk mulai berbelanja yuk daftar atau masuk terlebih dahulu!',
        disableBeacon: true,
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
        {isLastStep ? "Mulai Belanja!" : "Lanjut"}
      </Button>
    </div>
  </div>
);

export default function GuestCatalogTour() {
    const [run, setRun] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const hasViewedTour = localStorage.getItem('hasViewedGuestCatalogTour');
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
            localStorage.setItem('hasViewedGuestCatalogTour', 'true');
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