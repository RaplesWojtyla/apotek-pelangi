'use client';

import DetailTebusResepDialog from './DetailTebusDialog';

type PengajuanResep = {
	id: string;
	id_user: string;
	tanggal_pengajuan: Date;
	status: string;
	catatan: string | null;
	foto_resep: string;
	user: { id: string; nama: string | null } | null;
};

interface TabelTebusResepProps {
	resepList: PengajuanResep[];
	refreshData: () => void;
}

export default function TabelTebusResep({ resepList, refreshData }: TabelTebusResepProps) {
	return (
		<div className="bg-white shadow rounded-lg overflow-x-auto">
			<table className="w-full min-w-[700px] text-sm">
				<thead className="bg-gray-50 text-gray-700 font-semibold text-left">
					<tr>
						<th className="p-4">No</th>
						<th className="p-4">ID Pengajuan</th>
						<th className="p-4">Nama Pengaju</th>
						<th className="p-4">Tanggal Upload</th>
						<th className="p-4">Status</th>
						<th className="p-4">Aksi</th>
					</tr>
				</thead>
				<tbody>
					{resepList.length > 0 ? (
						resepList.map((resep, index) => (
							<tr key={resep.id} className="border-t hover:bg-gray-50">
								<td className="p-4">{index + 1}</td>
								<td className="p-4 font-medium">{resep.id}</td>
								<td className="p-4">{resep.user?.nama || 'Tanpa Nama'}</td>
								<td className="p-4">{new Date(resep.tanggal_pengajuan).toLocaleDateString('id-ID')}</td>
								<td className="p-4">
									<span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
										{resep.status.replace('_', ' ')}
									</span>
								</td>
								<td className="p-4">
									<DetailTebusResepDialog resep={resep} onProcessSuccess={refreshData} />
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6} className="text-center p-8 text-gray-500">
								Tidak ada pengajuan resep yang perlu diproses.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}