'use client'

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps } from 'react-joyride';

const tourSteps: Step[] = [
    {
        title: 'Selamat Datang di Apotek Pelangi!',
        content: 'Kami akan memandu Anda melihat fitur-fitur utama di halaman ini.',
        locale: { skip: 'LEWATI' },
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
        target: '.tour-all-latest',
        content: 'Ini adalah duplikat dari target sebelumnya, Anda bisa menghapus langkah ini jika tidak perlu.',
    },
    {
        target: '#tour-tebus',
        content: 'Punya resep dari dokter? Unggah resep Anda di sini dan biarkan kami yang siapkan obatnya.',
    }
];


// Komponen ini HANYA bertanggung jawab untuk menampilkan tur.
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
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            scrollOffset={150}      
            spotlightPadding={10} 
            styles={{
                options: {
                    arrowColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    primaryColor: '#0891b2',
                    textColor: '#334155',
                    zIndex: 9999,
                },
                tooltip: {
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    fontFamily: 'inherit',
                },
                tooltipTitle: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '0 0 8px',
                },
                buttonNext: {
                    backgroundColor: '#0891b2',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                },
                buttonSkip: {
                    color: '#64748b',
                    fontSize: '14px',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                },
                spotlight: {
                    borderRadius: '8px',
                },
            }}
        />
    );
}

