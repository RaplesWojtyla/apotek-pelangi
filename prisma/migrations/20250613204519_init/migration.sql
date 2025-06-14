/*
  Warnings:

  - You are about to drop the column `kode_vendor` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode_batch` to the `DetailFakturPembelian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_kadaluarsa` to the `DetailFakturPembelian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_faktur` to the `FakturPembelian` table without a default value. This is not possible if the table is not empty.
  - Made the column `pajak` on table `FakturPembelian` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Vendor_kode_vendor_key";

-- AlterTable
ALTER TABLE "DetailFakturPembelian" ADD COLUMN     "kode_batch" TEXT NOT NULL,
ADD COLUMN     "tanggal_kadaluarsa" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FakturPembelian" ADD COLUMN     "nomor_faktur" TEXT NOT NULL,
ALTER COLUMN "pajak" SET NOT NULL,
ALTER COLUMN "pajak" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "kode_vendor",
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
