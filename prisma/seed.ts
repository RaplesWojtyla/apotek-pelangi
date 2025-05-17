import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

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
    data: { nama_jenis: "Demam dan nyeri", id_kategori_barang: kategori1.id },
  });
  const jenis3 = await prisma.jenis_barang.create({
    data: { nama_jenis: "Alergi", id_kategori_barang: kategori1.id },
  });
  const jenis4 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Masalah pencernaan",
      id_kategori_barang: kategori1.id,
    },
  });
  const jenis5 = await prisma.jenis_barang.create({
    data: { nama_jenis: "Tulang dan sendi", id_kategori_barang: kategori1.id },
  });
  const jenis6 = await prisma.jenis_barang.create({
    data: { nama_jenis: "Lainnya", id_kategori_barang: kategori1.id },
  });

  // JENIS BARANG untuk kategori2 (Perangkat dan Peralatan)
  const jenis7 = await prisma.jenis_barang.create({
    data: { nama_jenis: "Untuk sehari-hari", id_kategori_barang: kategori2.id },
  });
  const jenis8 = await prisma.jenis_barang.create({
    data: { nama_jenis: "P3K", id_kategori_barang: kategori2.id },
  });
  const jenis9 = await prisma.jenis_barang.create({
    data: {
      nama_jenis: "Tisu, alkohol dan jarum",
      id_kategori_barang: kategori2.id,
    },
  });
  const jenis10 = await prisma.jenis_barang.create({
    data: { nama_jenis: "Lainnya", id_kategori_barang: kategori2.id },
  });

  // BARANG dan DETAILNYA untuk jenis1 (Batuk, pilek dan flu)
  const barang1 = await prisma.barang.create({
    data: {
      nama_barang: "OBH Combi",
      id_jenis_barang: jenis1.id,
      harga_jual: 20906,
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

  console.log("✅ Seeder tanpa perulangan selesai!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
