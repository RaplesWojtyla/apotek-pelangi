-- CreateEnum
CREATE TYPE "TipeSumber" AS ENUM ('FAKTUR_PEMBELIAN', 'FAKTUR_PENJUALAN', 'PENGAJUAN_RESEP', 'BARANG', 'STOK_BARANG');

-- CreateTable
CREATE TABLE "Notifikasi" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_sumber" TEXT,
    "tipe_sumber" "TipeSumber",
    "judul" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "sudah_dibaca" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notifikasi_id_user_idx" ON "Notifikasi"("id_user");

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
