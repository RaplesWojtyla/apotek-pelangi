import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // KATEGORI
  const kategori1 = await prisma.kategori_barang.create({
    data: { nama_kategori: "Obat dan Perawatan" },
  });
  const kategori2 = await prisma.kategori_barang.create({
    data: { nama_kategori: "Perangkat dan Peralatan" },
  });

  // JENIS BARANG untuk kategori1 (Obat dan Perawatan)
  const jenis1 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Batuk, pilek dan flu",
      id_kategori_barang: kategori1.id,
    },
  });
  const jenis2 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Demam dan nyeri",
      id_kategori_barang: kategori1.id,
    },
  });
  const jenis3 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Alergi",
      id_kategori_barang: kategori1.id,
    },
  });
  const jenis4 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Masalah pencernaan",
      id_kategori_barang: kategori1.id,
    },
  });
  const jenis5 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Tulang dan sendi",
      id_kategori_barang: kategori1.id,
    },
  });
  const jenis6 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Lainnya",
      id_kategori_barang: kategori1.id,
    },
  });

  // JENIS BARANG untuk kategori2 (Perangkat dan Peralatan)
  const jenis7 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Untuk sehari-hari",
      id_kategori_barang: kategori2.id,
    },
  });
  const jenis8 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "P3K",
      id_kategori_barang: kategori2.id,
    },
  });
  const jenis9 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Tisu, alkohol dan jarum",
      id_kategori_barang: kategori2.id,
    },
  });
  const jenis10 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Lainnya",
      id_kategori_barang: kategori2.id,
    },
  });

  // BARANG dan DETAILNYA untuk jenis1 (Batuk, pilek dan flu)
  const barang1 = await prisma.barang.create({
    data: {
      nama_barang: "OBH Combi Plus Batuk Flu Menthol",
      id_jenis_barang: jenis1.id,
      harga_jual: 26000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang1.id,
      deskripsi: "Obat batuk hitam",
      indikasi_umum: "Meredakan batuk berdahak",
      komposisi: "Succus liquiritae, Ammonium chloride",
      dosis: "3x sehari 1 sendok takar",
      aturan_pakai: "Sesudah makan",
      perhatian: "Tidak untuk anak < 2 tahun",
      kontra_indikasi: "Hipertensi, alergi kandungan",
      efek_samping: "Ngantuk",
      golongan: "Obat bebas terbatas",
      kemasan: "Botol 100 ml",
      manufaktur: "PT Combiphar",
      no_bpom: "TI123456781",
    },
  });

  const barang2 = await prisma.barang.create({
    data: {
      nama_barang: "Paracetamol",
      id_jenis_barang: jenis2.id,
      harga_jual: 5000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang2.id,
      deskripsi: "Obat pereda demam dan nyeri",
      indikasi_umum: "Demam, sakit kepala",
      komposisi: "Paracetamol 500mg",
      dosis: "2 tablet setiap 6 jam",
      aturan_pakai: "Sesudah makan",
      perhatian: "Jangan melebihi dosis",
      kontra_indikasi: "Alergi paracetamol",
      efek_samping: "Mual, alergi kulit",
      golongan: "Obat bebas",
      kemasan: "Strip isi 10 tablet",
      manufaktur: "PT Kalbe Farma",
      no_bpom: "TI987654321",
    },
  });

  // BARANG untuk jenis9 (Tisu, alkohol dan jarum)
  const barang3 = await prisma.barang.create({
    data: {
      nama_barang: "Tisu Alkohol",
      id_jenis_barang: jenis9.id,
      harga_jual: 12000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang3.id,
      deskripsi: "Tisu pembersih antiseptik",
      indikasi_umum: "Membersihkan luka ringan",
      komposisi: "Isopropyl alcohol 70%",
      dosis: "Sesuai kebutuhan",
      aturan_pakai: "Langsung digunakan",
      perhatian: "Jauhkan dari api",
      kontra_indikasi: "Kulit sensitif",
      efek_samping: "Iritasi ringan",
      golongan: "Alat kesehatan",
      kemasan: "Kotak isi 10 sachet",
      manufaktur: "PT Medtech",
      no_bpom: "AKD201234567",
    },
  });

  const barang6 = await prisma.barang.create({
    data: {
      nama_barang: "Promag",
      id_jenis_barang: jenis4.id,
      harga_jual: 6000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang6.id,
      deskripsi: "Antasida untuk lambung",
      indikasi_umum: "Maag, perih lambung",
      komposisi: "Hydrotalcite, Mg(OH)2, Simethicone",
      dosis: "1-2 tablet 3x sehari",
      aturan_pakai: "Sesudah makan",
      perhatian: "Hindari penggunaan jangka panjang",
      kontra_indikasi: "Gagal ginjal",
      efek_samping: "Sembelit",
      golongan: "Obat bebas",
      kemasan: "Strip isi 6 tablet",
      manufaktur: "Kalbe Farma",
      no_bpom: "TI55443322",
    },
  });

  // Jenis5 - Tulang dan sendi
  const barang7 = await prisma.barang.create({
    data: {
      nama_barang: "Neurobion",
      id_jenis_barang: jenis5.id,
      harga_jual: 23000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang7.id,
      deskripsi: "Vitamin untuk saraf dan otot",
      indikasi_umum: "Kesemutan, nyeri otot",
      komposisi: "Vit B1, B6, B12",
      dosis: "1 tablet per hari",
      aturan_pakai: "Sesudah makan",
      perhatian: "Hindari overdosis",
      kontra_indikasi: "Hipervitaminosis",
      efek_samping: "Alergi, mual",
      golongan: "Suplemen",
      kemasan: "Strip isi 10 tablet",
      manufaktur: "PT Merck",
      no_bpom: "TI77665544",
    },
  });

  // Jenis6 - Lainnya (obat)
  const barang8 = await prisma.barang.create({
    data: {
      nama_barang: "Minyak Kayu Putih",
      id_jenis_barang: jenis6.id,
      harga_jual: 11000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang8.id,
      deskripsi: "Minyak aromaterapi penghangat",
      indikasi_umum: "Masuk angin, kembung",
      komposisi: "Oleum cajuputi",
      dosis: "Oleskan sesuai kebutuhan",
      aturan_pakai: "Untuk pemakaian luar",
      perhatian: "Jauhkan dari anak-anak",
      kontra_indikasi: "Luka terbuka",
      efek_samping: "Iritasi lokal",
      golongan: "Obat luar",
      kemasan: "Botol 60ml",
      manufaktur: "Cap Lang",
      no_bpom: "TR33221100",
    },
  });

  // Jenis7 - Peralatan sehari-hari
  const barang9 = await prisma.barang.create({
    data: {
      nama_barang: "Masker Medis",
      id_jenis_barang: jenis7.id,
      harga_jual: 25000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang9.id,
      deskripsi: "Masker pelindung 3 lapis",
      indikasi_umum: "Melindungi dari partikel dan virus",
      komposisi: "Non-woven fabric",
      dosis: "-",
      aturan_pakai: "Sekali pakai",
      perhatian: "Ganti setiap 4 jam",
      kontra_indikasi: "-",
      efek_samping: "-",
      golongan: "Alat kesehatan",
      kemasan: "Box isi 50 pcs",
      manufaktur: "PT Maskerindo",
      no_bpom: "AKD99887766",
    },
  });

  // Jenis8 - P3K
  const barang10 = await prisma.barang.create({
    data: {
      nama_barang: "Plester Luka",
      id_jenis_barang: jenis8.id,
      harga_jual: 5000,
    },
  });
  await prisma.detail_barang.create({
    data: {
      id_barang: barang10.id,
      deskripsi: "Plester steril untuk luka ringan",
      indikasi_umum: "Menutup luka gores",
      komposisi: "Kain kasa, perekat hypoallergenic",
      dosis: "-",
      aturan_pakai: "Bersihkan luka sebelum tempel",
      perhatian: "Ganti setiap 8 jam",
      kontra_indikasi: "Kulit sensitif",
      efek_samping: "Iritasi kulit",
      golongan: "Alat kesehatan",
      kemasan: "Pack isi 10",
      manufaktur: "Hansaplast",
      no_bpom: "AKL22446688",
    },
  });

  // Stok untuk barang1 - OBH Combi
  await prisma.stok_barang.create({
    data: {
      id_barang: barang1.id,
      kode_batch: "OBH-202501",
      tanggal_masuk: new Date("2025-05-10"),
      tanggal_kadaluarsa: new Date("2026-05-10"),
      jumlah: 20,
    },
  });

  // Stok untuk barang2 - Paracetamol
  await prisma.stok_barang.create({
    data: {
      id_barang: barang2.id,
      kode_batch: "PCM-202501",
      tanggal_masuk: new Date("2025-05-01"),
      tanggal_kadaluarsa: new Date("2027-05-01"),
      jumlah: 50,
    },
  });

  // Stok untuk barang3 - Tisu Alkohol
  await prisma.stok_barang.create({
    data: {
      id_barang: barang3.id,
      kode_batch: "ALC-202501",
      tanggal_masuk: new Date("2025-04-20"),
      tanggal_kadaluarsa: new Date("2026-04-20"),
      jumlah: 30,
    },
  });

  // Stok untuk barang6 - Promag
  await prisma.stok_barang.create({
    data: {
      id_barang: barang6.id,
      kode_batch: "PMG-202504",
      tanggal_masuk: new Date("2025-04-15"),
      tanggal_kadaluarsa: new Date("2027-04-15"),
      jumlah: 40,
    },
  });

  // Stok untuk barang7 - Neurobion
  await prisma.stok_barang.create({
    data: {
      id_barang: barang7.id,
      kode_batch: "NRB-202504",
      tanggal_masuk: new Date("2025-04-10"),
      tanggal_kadaluarsa: new Date("2027-10-10"),
      jumlah: 15,
    },
  });

  // Stok untuk barang8 - Minyak Kayu Putih
  await prisma.stok_barang.create({
    data: {
      id_barang: barang8.id,
      kode_batch: "MKP-202503",
      tanggal_masuk: new Date("2025-03-25"),
      tanggal_kadaluarsa: new Date("2026-09-25"),
      jumlah: 20,
    },
  });

  // Stok untuk barang9 - Masker Medis
  await prisma.stok_barang.create({
    data: {
      id_barang: barang9.id,
      kode_batch: "MSK-202505",
      tanggal_masuk: new Date("2025-05-05"),
      tanggal_kadaluarsa: new Date("2027-05-05"),
      jumlah: 30,
    },
  });

  // Stok untuk barang10 - Plester Luka
  await prisma.stok_barang.create({
    data: {
      id_barang: barang10.id,
      kode_batch: "PLS-202504",
      tanggal_masuk: new Date("2025-04-01"),
      tanggal_kadaluarsa: new Date("2026-10-01"),
      jumlah: 90,
    },
  });


  console.log("✅ Seeder tanpa perulangan selesai!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
