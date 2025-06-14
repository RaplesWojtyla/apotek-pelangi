/*
  Warnings:

  - You are about to drop the column `stokBarangId` on the `FakturPembelian` table. All the data in the column will be lost.
  - You are about to drop the column `id_detail_faktur_pembelian` on the `StokBarang` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StokBarang" DROP CONSTRAINT "StokBarang_id_detail_faktur_pembelian_fkey";

-- DropIndex
DROP INDEX "StokBarang_id_detail_faktur_pembelian_key";

-- DropIndex
DROP INDEX "StokBarang_kode_batch_key";

-- AlterTable
ALTER TABLE "FakturPembelian" DROP COLUMN "stokBarangId";

-- AlterTable
ALTER TABLE "StokBarang" DROP COLUMN "id_detail_faktur_pembelian",
ALTER COLUMN "kode_batch" DROP NOT NULL,
ALTER COLUMN "tanggal_kadaluarsa" DROP NOT NULL;
