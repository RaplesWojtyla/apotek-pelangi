/*
  Warnings:

  - Added the required column `snap_token` to the `FakturPenjualan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FakturPenjualan" ADD COLUMN     "snap_token" TEXT NOT NULL;
