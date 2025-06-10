'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import TabelTebusResep from '@/components/kasir/TabelTebusResep';
import TabelTransaksiBiasa from '@/components/kasir/TabelTransaksiBiasa';
import Pagination from '@/components/Pagination';

import {
	getFakturCustomerPaginated,
	getFakturTotalPages,
} from '@/action/kasir/faktur.action';

export default function DaftarTransaksiPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [kategori, setKategori] = useState<'resep' | 'biasa'>('resep');
	const [fakturList, setFakturList] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const page = Number(searchParams.get('page') ?? 1);
	const take = 8;

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const [faktur, total] = await Promise.all([
				getFakturCustomerPaginated(page, take),
				getFakturTotalPages(take),
			]);
			setFakturList(faktur);
			setTotalPages(total);
		} catch (error) {
			console.error('[FakturPagination] Error:', error);
			toast.error('Gagal memuat data transaksi');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (kategori === 'biasa') {
			fetchData();
		}
	}, [kategori, page]);

	return (
		<div className="bg-gray-100 min-h-screen p-6 max-w-5xl mx-auto space-y-8">
			<h1 className="text-3xl font-bold">Daftar Transaksi</h1>

			<div className="flex gap-4">
				<Button
					variant={kategori === 'resep' ? 'default' : 'outline'}
					onClick={() => setKategori('resep')}
				>
					Tebus Resep
				</Button>
				<Button
					variant={kategori === 'biasa' ? 'default' : 'outline'}
					onClick={() => setKategori('biasa')}
				>
					Transaksi Biasa
				</Button>
			</div>

			{kategori === 'resep' && <TabelTebusResep />}

			{kategori === 'biasa' && (
				<>
					{isLoading ? (
						<p className="text-gray-600">Memuat data transaksi...</p>
					) : (
						<>
							<TabelTransaksiBiasa fakturList={fakturList} refreshData={fetchData} />
							<div className="flex justify-center mt-6">
								<Pagination totalPages={totalPages} />
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
