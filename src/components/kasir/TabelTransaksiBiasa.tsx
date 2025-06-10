'use client';

import clsx from 'clsx';
import TransaksiDetailDialog from './TransactionModal';

interface Faktur {
	id: string;
	tanggal_faktur: string;
	nama_penerima: string;
	total: number;
	status: string;
	detail_faktur_penjualan: any[];
	id_user: string;
}

export default function TabelTransaksiBiasa({
	fakturList,
	refreshData,
}: {
	fakturList: Faktur[];
	refreshData: () => void;
}) {
	const renderStatusBadge = (status: string) => {
		return (
			<span
				className={clsx(
					'inline-block mt-2 px-3 py-1 text-xs rounded',
					{
						'bg-yellow-500 text-white': status === 'MENUNGGU_PEMBAYARAN',
						'bg-green-500 text-white': status === 'PEMBAYARAN_BERHASIL',
						'bg-red-500 text-white': status === 'PEMBAYARAN_GAGAL',
						'bg-blue-500 text-white': status === 'MENUNGGU_PENGAMBILAN',
						'bg-green-600 text-white': status === 'SELESAI',
						'bg-red-700 text-white': status === 'DIBATALKAN',
					}
				)}
			>
				{status.replaceAll('_', ' ')}
			</span>
		);
	};

	const filtered = fakturList.filter(
		(trx) =>
			trx.status !== 'SELESAI' &&
			trx.status !== 'DIBATALKAN' &&
			trx.status !== 'PEMBAYARAN_GAGAL'
	);

	return (
		<div className="bg-white shadow rounded-lg overflow-x-auto">
			<table className="w-full min-w-[700px] text-sm">
				<thead className="bg-gray-50 text-gray-700 font-semibold text-left">
					<tr>
						<th className="p-4">No</th>
						<th className="p-4">ID Transaksi</th>
						<th className="p-4">Nama Penerima</th>
						<th className="p-4">Tanggal</th>
						<th className="p-4">Total</th>
						<th className="p-4">Status</th>
						<th className="p-4">Aksi</th>
					</tr>
				</thead>
				<tbody>
					{filtered.map((item, index) => (
						<tr key={item.id} className="border-t hover:bg-gray-50">
							<td className="p-4">{index + 1}</td>
							<td className="p-4 font-medium">{item.id}</td>
							<td className="p-4">{item.nama_penerima}</td>
							<td className="p-4">{new Date(item.tanggal_faktur).toLocaleDateString()}</td>
							<td className="p-4">Rp {item.total.toLocaleString('id-ID')}</td>
							<td className="p-4">{renderStatusBadge(item.status)}</td>
							<td className="p-4">
								<TransaksiDetailDialog faktur={item} onUpdate={refreshData} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
