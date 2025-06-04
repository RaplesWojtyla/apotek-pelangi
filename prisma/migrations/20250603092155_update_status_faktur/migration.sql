/*
  Warnings:

  - The values [DRAFT,DIKIRIM] on the enum `StatusFaktur` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusFaktur_new" AS ENUM ('MENUNGGU_PENGAMBILAN', 'MENUNGGU_PEMBAYARAN', 'JATUH_TEMPO', 'DIBATALKAN', 'PEMBAYARAN_BERHASIL', 'PEMBAYARAN_GAGAL', 'SELESAI');
ALTER TABLE "FakturPenjualan" ALTER COLUMN "status" TYPE "StatusFaktur_new" USING ("status"::text::"StatusFaktur_new");
ALTER TYPE "StatusFaktur" RENAME TO "StatusFaktur_old";
ALTER TYPE "StatusFaktur_new" RENAME TO "StatusFaktur";
DROP TYPE "StatusFaktur_old";
COMMIT;
