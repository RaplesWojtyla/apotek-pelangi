'use client'

import { StatusFaktur } from "@prisma/client"
import clsx from "clsx"
import Link from "next/link"

type Transaction = {
	id: string;
	total: number;
	status: StatusFaktur;
	user: { nama: string | null } | null;
}

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
	if (transactions.length === 0) {
		return <p className="text-sm text-muted-foreground text-center py-8">Belum ada transaksi.</p>
	}

	const getStatusClass = (status: StatusFaktur) => {
		switch (status) {
			case 'SELESAI':
			case 'PEMBAYARAN_BERHASIL':
				return 'bg-green-100 text-green-700';
			case 'MENUNGGU_PEMBAYARAN':
			case 'MENUNGGU_PENGAMBILAN':
				return 'bg-yellow-100 text-yellow-700';
			case 'DIBATALKAN':
			case 'PEMBAYARAN_GAGAL':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	}

	return (
		<div className="space-y-4">
			{transactions.map((tx) => (
				<div key={tx.id} className="flex items-center justify-between gap-4">
					<div className="flex-1">
						<p className="font-medium text-sm truncate">{tx.user?.nama ?? 'Pelanggan Offline'}</p>
						<p className="text-sm text-muted-foreground">Rp{tx.total.toLocaleString('id-ID')}</p>
					</div>
					<span className={clsx("px-2 py-1 rounded text-xs font-medium", getStatusClass(tx.status))}>
						{tx.status.replace(/_/g, ' ')}
					</span>
				</div>
			))}
			<Link href="/admin/logpenjualan" className="text-sm text-primary hover:underline font-medium pt-4 block text-center">
				Lihat Semua Transaksi
			</Link>
		</div>
	)
}