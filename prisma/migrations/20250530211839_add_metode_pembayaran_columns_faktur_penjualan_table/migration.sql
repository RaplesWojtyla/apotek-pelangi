/*
  Warnings:

  - Added the required column `metode_pembayaran` to the `FakturPenjualan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetodePembayaran" AS ENUM ('DANA', 'GOPAY', 'QRIS', 'BANK_TRANSFER');

-- AlterTable
ALTER TABLE "FakturPenjualan" ADD COLUMN     "metode_pembayaran" "MetodePembayaran" NOT NULL;
