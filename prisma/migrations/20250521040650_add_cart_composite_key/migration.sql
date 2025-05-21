/*
  Warnings:

  - A unique constraint covering the columns `[id_user,id_barang]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart_id_user_id_barang_key" ON "Cart"("id_user", "id_barang");
