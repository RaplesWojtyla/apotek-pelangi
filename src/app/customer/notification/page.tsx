'use client';

import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { getNotifications, markAllNotificationsAsRead } from '@/action/customer/notification.action';
import { Notifikasi } from '@prisma/client';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function NotificationPage() {
	const [notifications, setNotifications] = useState<Notifikasi[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		const fetchNotifs = async () => {
			setIsLoading(true);
			const res = await getNotifications();
			if (res.success) {
				setNotifications(res.data);
			} else {
				toast.error(res.message || "Gagal memuat notifikasi.");
			}
			setIsLoading(false);
		};
		fetchNotifs();
	}, []);

	const handleMarkAllRead = () => {
		startTransition(async () => {
			const res = await markAllNotificationsAsRead();
			if (res.success) {
				toast.success(res.message);
				// Refresh data
				const updatedNotifs = await getNotifications();
				if (updatedNotifs.success) setNotifications(updatedNotifs.data);
			} else {
				toast.error(res.message || "Gagal menandai notifikasi.");
			}
		});
	};

	const getTargetUrl = (notif: Notifikasi) => {
		if (notif.tipe_sumber === 'FAKTUR_PENJUALAN' && notif.id_sumber) {
			return `/customer/history`; // Arahkan ke history untuk melihat detailnya
		}
		return '#'; // URL default jika tidak ada target
	};

	return (
		<div className="max-w-3xl mx-auto px-4 py-6 pt-16 min-h-screen">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold text-gray-800">Notifikasi</h1>
				<Button onClick={handleMarkAllRead} variant="link" disabled={isPending}>
					{isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
					Tandai semua dibaca
				</Button>
			</div>

			<div className="bg-white shadow rounded-lg divide-y">
				{isLoading ? (
					<div className="p-6 text-center text-gray-500 animate-pulse">Memuat notifikasi...</div>
				) : notifications.length === 0 ? (
					<div className="p-6 text-center text-gray-500">Tidak ada notifikasi.</div>
				) : (
					notifications.map((notif) => (
						<Link
							key={notif.id}
							href={getTargetUrl(notif)}
							className={`block p-4 transition hover:bg-gray-50 ${!notif.sudah_dibaca ? 'bg-blue-50' : ''
								}`}
						>
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
								<div>
									<p className="font-semibold text-gray-900">{notif.judul}</p>
									<p className="text-sm text-gray-700">{notif.pesan}</p>
									<p className="text-xs text-gray-500 mt-1">
										{new Date(notif.createdAt).toLocaleString('id-ID')}
									</p>
								</div>
								{!notif.sudah_dibaca && (
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