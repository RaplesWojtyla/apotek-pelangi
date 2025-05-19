/*
  Warnings:

  - You are about to drop the column `nama` on the `JenisBarang` table. All the data in the column will be lost.
  - You are about to drop the `DetailObat` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `harga_beli` on the `DetailFakturPembelian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `id_kategori_barang` to the `JenisBarang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_jenis` to the `JenisBarang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailObat" DROP CONSTRAINT "DetailObat_id_barang_fkey";

-- AlterTable
ALTER TABLE "DetailFakturPembelian" DROP COLUMN "harga_beli",
ADD COLUMN     "harga_beli" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "JenisBarang" DROP COLUMN "nama",
ADD COLUMN     "id_kategori_barang" TEXT NOT NULL,
ADD COLUMN     "nama_jenis" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StokBarang" ALTER COLUMN "tanggal_kadaluarsa" DROP NOT NULL;

-- DropTable
DROP TABLE "DetailObat";

-- CreateTable
CREATE TABLE "KategoriBarang" (
    "id" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,
    "foto_kategori" TEXT NOT NULL DEFAULT 'kategori.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KategoriBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailBarang" (
    "id" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "deskripsi" TEXT,
    "indikasi_umum" TEXT,
    "komposisi" TEXT,
    "dosis" TEXT,
    "aturan_pakai" TEXT,
    "perhatian" TEXT,
    "kontra_indikasi" TEXT,
    "efek_samping" TEXT,
    "golongan" TEXT,
    "kemasan" TEXT,
    "manufaktur" TEXT,
    "no_bpom" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetailBarang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailBarang_id_barang_key" ON "DetailBarang"("id_barang");

-- AddForeignKey
ALTER TABLE "JenisBarang" ADD CONSTRAINT "JenisBarang_id_kategori_barang_fkey" FOREIGN KEY ("id_kategori_barang") REFERENCES "KategoriBarang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailBarang" ADD CONSTRAINT "DetailBarang_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
