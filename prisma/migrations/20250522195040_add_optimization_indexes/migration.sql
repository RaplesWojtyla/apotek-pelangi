-- CreateIndex
CREATE INDEX "Barang_nama_barang_idx" ON "Barang"("nama_barang");

-- CreateIndex
CREATE INDEX "Barang_id_jenis_barang_idx" ON "Barang"("id_jenis_barang");

-- CreateIndex
CREATE INDEX "StokBarang_id_barang_idx" ON "StokBarang"("id_barang");

-- CreateIndex
CREATE INDEX "StokBarang_tanggal_kadaluarsa_idx" ON "StokBarang"("tanggal_kadaluarsa");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");
