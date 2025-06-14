/*
  Warnings:

  - A unique constraint covering the columns `[id_detail_faktur_pembelian]` on the table `StokBarang` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode_batch]` on the table `StokBarang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stokBarangId` to the `FakturPembelian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_detail_faktur_pembelian` to the `StokBarang` table without a default value. This is not possible if the table is not empty.
  - Made the column `kode_batch` on table `StokBarang` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tanggal_kadaluarsa` on table `StokBarang` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FakturPembelian" ADD COLUMN     "stokBarangId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StokBarang" ADD COLUMN     "id_detail_faktur_pembelian" TEXT NOT NULL,
ALTER COLUMN "kode_batch" SET NOT NULL,
ALTER COLUMN "tanggal_kadaluarsa" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StokBarang_id_detail_faktur_pembelian_key" ON "StokBarang"("id_detail_faktur_pembelian");

-- CreateIndex
CREATE UNIQUE INDEX "StokBarang_kode_batch_key" ON "StokBarang"("kode_batch");

-- AddForeignKey
ALTER TABLE "StokBarang" ADD CONSTRAINT "StokBarang_id_detail_faktur_pembelian_fkey" FOREIGN KEY ("id_detail_faktur_pembelian") REFERENCES "DetailFakturPembelian"("id") ON DELETE CASCADE ON UPDATE CASCADE;
