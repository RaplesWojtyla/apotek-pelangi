import React from "react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DaftarTransaksiPage = () => {
	const transactions = [
		{ id: "TX-001", customer: "Tn. Budi", date: "2025-05-08", total: 24000, status: "berhasil" },
		{ id: "TX-002", customer: "Ny. Sari", date: "2025-05-08", total: 0, status: "dibatalkan" },
		{ id: "TX-003", customer: "Tn. Doni", date: "2025-05-07", total: 15000, status: "menunggu" },
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "berhasil":
				return <Badge className="bg-green-600">Berhasil</Badge>;
			case "dibatalkan":
				return <Badge variant="destructive">Dibatalkan</Badge>;
			case "menunggu":
				return <Badge className="bg-yellow-400 text-black">Menunggu Pengambilan</Badge>;
			default:
				return <Badge>Unknown</Badge>;
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />

			<div className="p-4 max-w-6xl mx-auto">
				<h2 className="text-xl font-bold mb-4">Daftar Transaksi</h2>

				<div className="bg-white rounded-lg shadow overflow-x-auto">
					<table className="w-full min-w-[700px] text-sm">
						<thead className="bg-gray-100 text-left">
							<tr className="text-gray-600">
								<th className="p-4">No</th>
								<th className="p-4">ID Transaksi</th>
								<th className="p-4">Nama Pelanggan</th>
								<th className="p-4">Tanggal</th>
								<th className="p-4">Total</th>
								<th className="p-4">Status</th>
								<th className="p-4">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{transactions.length > 0 ? (
								transactions.map((tx, index) => (
									<tr key={tx.id} className="border-t hover:bg-gray-50 transition-colors">
										<td className="p-4">{index + 1}</td>
										<td className="p-4 font-medium">{tx.id}</td>
										<td className="p-4">{tx.customer}</td>
										<td className="p-4">{tx.date}</td>
										<td className="p-4">Rp{tx.total.toLocaleString()}</td>
										<td className="p-4">{getStatusBadge(tx.status)}</td>
										<td className="p-4">
											<Button variant="outline" size="sm">Lihat Detail</Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} className="text-center py-6 text-gray-500">
										Tidak ada transaksi.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DaftarTransaksiPage;
