-- CreateEnum
CREATE TYPE "LevelUser" AS ENUM ('ADMIN', 'KASIR', 'USER');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('AKTIF', 'BANNED', 'NONAKTIF');

-- CreateEnum
CREATE TYPE "StatusResep" AS ENUM ('DRAFT', 'MENGAJUKAN', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "SumberCart" AS ENUM ('RESEP', 'MANUAL');

-- CreateEnum
CREATE TYPE "StatusFaktur" AS ENUM ('DRAFT', 'MENUNGGU_PEMBAYARAN', 'JATUH_TEMPO', 'DIBATALKAN', 'DIKIRIM', 'SELESAI');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "LevelUser" NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_hp" TEXT,
    "status" "StatusUser" NOT NULL,
    "foto_profil" TEXT NOT NULL DEFAULT 'avatar.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "kode_vendor" TEXT NOT NULL,
    "nama_vendor" TEXT NOT NULL,
    "alamat" TEXT,
    "no_hp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisBarang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JenisBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang" (
    "id" TEXT NOT NULL,
    "id_jenis_barang" TEXT NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "harga_jual" INTEGER NOT NULL,
    "foto_barang" TEXT NOT NULL DEFAULT 'Barang.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailObat" (
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
    "golongan" TEXT NOT NULL,
    "kemasan" TEXT,
    "manufaktur" TEXT,
    "no_bpom" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetailObat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StokBarang" (
    "id" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "kode_batch" TEXT,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_kadaluarsa" TIMESTAMP(3) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StokBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengajuanResep" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "tanggal_pengajuan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusResep" NOT NULL DEFAULT 'MENGAJUKAN',
    "catatan" TEXT,
    "foto_resep" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PengajuanResep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "id_resep" TEXT,
    "jumlah" INTEGER NOT NULL,
    "sumber" "SumberCart" NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FakturPenjualan" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "tanggal_faktur" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alamat" TEXT NOT NULL,
    "status" "StatusFaktur" NOT NULL,
    "total" INTEGER NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FakturPenjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailFakturPenjualan" (
    "id" TEXT NOT NULL,
    "id_faktur_penjualan" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "id_resep" TEXT,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "DetailFakturPenjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FakturPembelian" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_vendor" TEXT NOT NULL,
    "tanggal_faktur" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pajak" INTEGER,
    "total" INTEGER NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FakturPembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailFakturPembelian" (
    "id" TEXT NOT NULL,
    "id_faktur_pembelian" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga_beli" TEXT NOT NULL,

    CONSTRAINT "DetailFakturPembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ulasan" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "isi_ulasan" TEXT,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAktivitas" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "aksi" TEXT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAktivitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_kode_vendor_key" ON "Vendor"("kode_vendor");

-- CreateIndex
CREATE UNIQUE INDEX "DetailObat_id_barang_key" ON "DetailObat"("id_barang");

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_id_jenis_barang_fkey" FOREIGN KEY ("id_jenis_barang") REFERENCES "JenisBarang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailObat" ADD CONSTRAINT "DetailObat_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StokBarang" ADD CONSTRAINT "StokBarang_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengajuanResep" ADD CONSTRAINT "PengajuanResep_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_id_resep_fkey" FOREIGN KEY ("id_resep") REFERENCES "PengajuanResep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FakturPenjualan" ADD CONSTRAINT "FakturPenjualan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFakturPenjualan" ADD CONSTRAINT "DetailFakturPenjualan_id_faktur_penjualan_fkey" FOREIGN KEY ("id_faktur_penjualan") REFERENCES "FakturPenjualan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFakturPenjualan" ADD CONSTRAINT "DetailFakturPenjualan_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFakturPenjualan" ADD CONSTRAINT "DetailFakturPenjualan_id_resep_fkey" FOREIGN KEY ("id_resep") REFERENCES "PengajuanResep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FakturPembelian" ADD CONSTRAINT "FakturPembelian_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FakturPembelian" ADD CONSTRAINT "FakturPembelian_id_vendor_fkey" FOREIGN KEY ("id_vendor") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFakturPembelian" ADD CONSTRAINT "DetailFakturPembelian_id_faktur_pembelian_fkey" FOREIGN KEY ("id_faktur_pembelian") REFERENCES "FakturPembelian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFakturPembelian" ADD CONSTRAINT "DetailFakturPembelian_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAktivitas" ADD CONSTRAINT "LogAktivitas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
