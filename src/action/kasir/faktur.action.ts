'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache'

export async function getFakturCustomerPaginated(page: number, take: number = 8) {
  const skip = (page - 1) * take;
  return await prisma.fakturPenjualan.findMany({
    where: {
      user: {
        role: 'CUSTOMER',
      },
    },
    orderBy: {
      tanggal_faktur: 'desc',
    },
    skip,
    take,
    include: {
      user: true, // Pastikan include user untuk ambil id_user
      detail_faktur_penjualan: {
        include: {
          barang: true,
        },
      },
    },
  });
}

export async function getFakturTotalPages(take: number = 8) {
  const total = await prisma.fakturPenjualan.count({
    where: {
      user: {
        role: 'CUSTOMER',
      },
    },
  });

  return Math.ceil(total / take);
}

export async function getFakturById(id: string) {
  return await prisma.fakturPenjualan.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      detail_faktur_penjualan: {
        include: {
          barang: true,
        },
      },
    },
  });
}

export async function updateFakturStatus(
  id: string,
  status:
    | 'SELESAI'
    | 'DIBATALKAN'
    | 'MENUNGGU_PEMBAYARAN'
    | 'PEMBAYARAN_BERHASIL'
    | 'PEMBAYARAN_GAGAL'
    | 'MENUNGGU_PENGAMBILAN'
    | 'JATUH_TEMPO'
) {
  const result = await prisma.fakturPenjualan.update({
    where: { id },
    data: { status },
  })

  revalidatePath('/kasir/daftar_transaksi')

  return result
}

export async function buatNotifikasi({
  id_user,
  id_sumber,
  tipe_sumber,
  judul,
  pesan,
}: {
  id_user: string
  id_sumber: string
  tipe_sumber: 'FAKTUR_PENJUALAN'
  judul: string
  pesan: string
}) {
  return await prisma.notifikasi.create({
    data: {
      id_user,
      id_sumber,
      tipe_sumber,
      judul,
      pesan,
    },
  })
}
