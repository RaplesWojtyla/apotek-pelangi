/*
  Warnings:

  - The values [BANK_TRANSFER] on the enum `MetodePembayaran` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MetodePembayaran_new" AS ENUM ('DANA', 'GOPAY', 'QRIS', 'TRANSFER_BANK');
ALTER TABLE "FakturPenjualan" ALTER COLUMN "metode_pembayaran" TYPE "MetodePembayaran_new" USING ("metode_pembayaran"::text::"MetodePembayaran_new");
ALTER TYPE "MetodePembayaran" RENAME TO "MetodePembayaran_old";
ALTER TYPE "MetodePembayaran_new" RENAME TO "MetodePembayaran";
DROP TYPE "MetodePembayaran_old";
COMMIT;
