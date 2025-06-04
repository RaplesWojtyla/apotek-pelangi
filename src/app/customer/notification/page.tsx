'use client';

import Link from 'next/link';

type Notification = {
  id: number;
  message: string;
  time: string;
  unread: boolean;
  targetUrl: string;
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: 'Pesanan #1234 berhasil dikonfirmasi.',
    time: '2 menit lalu',
    unread: true,
    targetUrl: '/customer/history/1234',
  },
  {
    id: 2,
    message: 'Stok barang "Gula 1kg" hampir habis.',
    time: '15 menit lalu',
    unread: false,
    targetUrl: '/customer/history',
  },
  {
    id: 3,
    message: 'Pembayaran untuk pesanan #4321 gagal.',
    time: '1 jam lalu',
    unread: true,
    targetUrl: '/customer/history/4321',
  },
];

export default function NotificationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Notifikasi</h1>

      <div className="bg-white shadow rounded-lg divide-y">
        {mockNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Tidak ada notifikasi.</div>
        ) : (
          mockNotifications.map((notif) => (
            <Link
              key={notif.id}
              href={notif.targetUrl}
              className={`block p-4 transition hover:bg-gray-50 ${
                notif.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
                {notif.unread && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full self-start sm:self-center">
                    Baru
                  </span>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
