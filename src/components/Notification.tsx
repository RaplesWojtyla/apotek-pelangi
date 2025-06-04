'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

const mockNotifications = [
  { id: 1, message: 'Pesanan #1234 berhasil dikonfirmasi', time: '2 menit lalu' },
  { id: 2, message: 'Stok barang "Beras 5kg" menipis', time: '10 menit lalu' },
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Tombol Notifikasi */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifikasi"
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Bell className="w-6 h-6 text-cyan-500 cursor-pointer hover:text-cyan-700" />
      </button>

      {/* Dropdown Dialog */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b font-semibold text-gray-700">Notifikasi</div>
          <ul className="max-h-60 overflow-y-auto divide-y text-sm">
            {mockNotifications.length === 0 ? (
              <li className="p-4 text-gray-500">Tidak ada notifikasi</li>
            ) : (
              mockNotifications.map((notif) => (
                <li key={notif.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="text-gray-800">{notif.message}</div>
                  <div className="text-xs text-gray-500 mt-1">{notif.time}</div>
                </li>
              ))
            )}
          </ul>
          <div className="p-3 border-t text-center">
            <Link
              href="/customer/notification"
              className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Lihat Semua Notifikasi
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
