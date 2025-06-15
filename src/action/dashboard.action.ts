'use server';

import { prisma } from '@/lib/prisma';


export interface DashboardData {
	userCount: number;
	barangCount: number;
	jenisBarangCount: number;
	kategoriBarangNames: { id: string; nama_kategori: string }[];
	jenisBarangNames: { id: string; nama_jenis: string }[];
}

export interface JenisBarangWithCategory {
	id: string;
	nama_jenis: string;
	kategori_barang: { 
		nama_kategori: string;
	};
}

interface DashboardResult {
	success: boolean;
	data?: DashboardData;
	error?: string;
}

interface LimitedJenisBarangResult {
	success: boolean;
	data?: JenisBarangWithCategory[];
	error?: string;
}

export async function getDashboardData(): Promise<DashboardResult> {
	try { 
		const userCount = await prisma.user.count();
		const barangCount = await prisma.barang.count();
		const jenisBarangCount = await prisma.jenisBarang.count();

		const kategoriBarangNames = await prisma.kategoriBarang.findMany({
			select: { id: true, nama_kategori: true },
			orderBy: { nama_kategori: 'asc' },
		});

		const jenisBarangNames = await prisma.jenisBarang.findMany({
			select: { id: true, nama_jenis: true },
			orderBy: { nama_jenis: 'asc' },
		});

		return {
			success: true,
			data: {
				userCount,
				barangCount,
				jenisBarangCount,
				kategoriBarangNames,
				jenisBarangNames,
			},
		};
	} catch (error) {
		console.error('Error fetching dashboard data:', error);
		return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch dashboard data.' };
	}
}


export async function getLimitedJenisBarangWithCategories(): Promise<LimitedJenisBarangResult> {
	try {
		const limitedJenisBarang = await prisma.jenisBarang.findMany({
			take: 12, 
			select: {
				id: true,
				nama_jenis: true,
				kategori_barang: { 
					select: { nama_kategori: true },
				},
			},
			orderBy: {
				createdAt: 'desc', 
			},
		});

		return {
			success: true,
			data: limitedJenisBarang,
		};
	} catch (error) {
		console.error('Error fetching limited jenis barang with categories:', error);
		return { success: false, error: 'Failed to fetch limited jenis barang.' };
	}
}