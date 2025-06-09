-- DropForeignKey
ALTER TABLE "DetailBarang" DROP CONSTRAINT "DetailBarang_id_barang_fkey";

-- AddForeignKey
ALTER TABLE "DetailBarang" ADD CONSTRAINT "DetailBarang_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
