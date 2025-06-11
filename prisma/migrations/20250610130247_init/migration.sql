/*
  Warnings:

  - Added the required column `id_user` to the `FakturPenjualan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FakturPenjualan" ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FakturPenjualan" ADD CONSTRAINT "FakturPenjualan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
