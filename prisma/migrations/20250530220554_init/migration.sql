/*
  Warnings:

  - Added the required column `nama_penerima` to the `FakturPenjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_telepon` to the `FakturPenjualan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FakturPenjualan" ADD COLUMN     "nama_penerima" TEXT NOT NULL,
ADD COLUMN     "nomor_telepon" TEXT NOT NULL;
