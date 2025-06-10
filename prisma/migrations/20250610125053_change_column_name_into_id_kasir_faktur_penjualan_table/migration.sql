/*
  Warnings:

  - You are about to drop the column `id_user` on the `FakturPenjualan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FakturPenjualan" DROP CONSTRAINT "FakturPenjualan_id_user_fkey";

-- AlterTable
ALTER TABLE "FakturPenjualan" DROP COLUMN "id_user",
ADD COLUMN     "id_kasir" TEXT;

-- AddForeignKey
ALTER TABLE "FakturPenjualan" ADD CONSTRAINT "FakturPenjualan_id_kasir_fkey" FOREIGN KEY ("id_kasir") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
