/*
  Warnings:

  - You are about to drop the `Ulasan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ulasan" DROP CONSTRAINT "Ulasan_id_barang_fkey";

-- DropForeignKey
ALTER TABLE "Ulasan" DROP CONSTRAINT "Ulasan_id_user_fkey";

-- DropTable
DROP TABLE "Ulasan";
