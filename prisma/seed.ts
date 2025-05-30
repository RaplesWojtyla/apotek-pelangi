import { prisma } from "@/lib/prisma";

async function main() {
    // KATEGORI
    const kategori1 = await prisma.kategoriBarang.create({
        data: { nama_kategori: "Obat dan Perawatan" },
    });
    const kategori2 = await prisma.kategoriBarang.create({
        data: { nama_kategori: "Perangkat dan Peralatan" },
    });

    // JENIS BARANG untuk kategori1 (Obat dan Perawatan)
    const jenis1 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Batuk, pilek dan flu",
            id_kategori_barang: kategori1.id,
        },
    });
    const jenis2 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Demam dan nyeri",
            id_kategori_barang: kategori1.id,
        },
    });
    const jenis3 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Alergi",
            id_kategori_barang: kategori1.id,
        },
    });
    const jenis4 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Masalah pencernaan",
            id_kategori_barang: kategori1.id,
        },
    });
    const jenis5 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Tulang dan sendi",
            id_kategori_barang: kategori1.id,
        },
    });
    const jenis6 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Lainnya Obat",
            id_kategori_barang: kategori1.id,
        },
    });

    // JENIS BARANG untuk kategori2 (Perangkat dan Peralatan)
    const jenis7 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Untuk sehari-hari",
            id_kategori_barang: kategori2.id,
        },
    });
    const jenis8 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "P3K",
            id_kategori_barang: kategori2.id,
        },
    });
    const jenis9 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Tisu, alkohol dan jarum",
            id_kategori_barang: kategori2.id,
        },
    });
    const jenis10 = await prisma.jenisBarang.create({
        data: {
            nama_jenis: "Lainnya Peralatan",
            id_kategori_barang: kategori2.id,
        },
    });

    // --- DATA BARANG LAMA ---
    // BARANG dan DETAILNYA untuk jenis1 (Batuk, pilek dan flu)
    const barang1 = await prisma.barang.create({
        data: {
            nama_barang: "OBH Combi Plus Batuk Flu Menthol",
            id_jenis_barang: jenis1.id,
            harga_jual: 26000,
        },
    });
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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
    await prisma.detailBarang.create({
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

    // --- DATA BARANG BARU (20 item) ---

    // BARANG dan DETAILNYA untuk jenis1 (Batuk, pilek dan flu)
    const barang11 = await prisma.barang.create({
        data: {
            nama_barang: "Bodrex Flu dan Batuk",
            id_jenis_barang: jenis1.id,
            harga_jual: 15000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang11.id,
            deskripsi: "Obat untuk meredakan gejala flu dan batuk",
            indikasi_umum: "Flu, batuk, pilek, sakit kepala, demam",
            komposisi: "Paracetamol, Pseudoephedrine HCl, Dextromethorphan HBr",
            dosis: "Dewasa: 1 tablet 3x sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Hati-hati pada penderita gangguan fungsi hati dan ginjal",
            kontra_indikasi: "Hipertensi, penyakit jantung, alergi",
            efek_samping: "Mengantuk, pusing, mual",
            golongan: "Obat bebas terbatas",
            kemasan: "Strip @4 tablet",
            manufaktur: "PT Tempo Scan Pacific",
            no_bpom: "DTL9900701810A1",
        },
    });

    const barang12 = await prisma.barang.create({
        data: {
            nama_barang: "Vicks Formula 44",
            id_jenis_barang: jenis1.id,
            harga_jual: 28000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang12.id,
            deskripsi: "Obat batuk dan pilek",
            indikasi_umum: "Batuk tidak berdahak, pilek",
            komposisi: "Dextromethorphan HBr, Doxylamine Succinate",
            dosis: "Dewasa: 2 sendok takar (10 ml) setiap 4 jam",
            aturan_pakai: "Sesudah makan",
            perhatian: "Dapat menyebabkan kantuk",
            kontra_indikasi: "Asma, glaukoma sudut tertutup",
            efek_samping: "Mengantuk, pusing",
            golongan: "Obat bebas terbatas",
            kemasan: "Botol 100 ml",
            manufaktur: "PT Procter & Gamble Home Products",
            no_bpom: "DTL7204900737A1",
        },
    });

    // BARANG dan DETAILNYA untuk jenis2 (Demam dan nyeri)
    const barang13 = await prisma.barang.create({
        data: {
            nama_barang: "Ibuprofen",
            id_jenis_barang: jenis2.id,
            harga_jual: 7500,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang13.id,
            deskripsi: "Obat anti-inflamasi non-steroid (OAINS)",
            indikasi_umum: "Nyeri ringan hingga sedang, demam",
            komposisi: "Ibuprofen 200mg",
            dosis: "Dewasa: 1-2 tablet setiap 4-6 jam",
            aturan_pakai: "Sesudah makan",
            perhatian: "Hati-hati pada penderita gangguan lambung",
            kontra_indikasi: "Ulkus peptikum, alergi ibuprofen",
            efek_samping: "Mual, nyeri ulu hati",
            golongan: "Obat bebas",
            kemasan: "Strip @10 tablet",
            manufaktur: "PT Indofarma",
            no_bpom: "GKL0108603610A1",
        },
    });

    const barang14 = await prisma.barang.create({
        data: {
            nama_barang: "Hot In Cream",
            id_jenis_barang: jenis2.id,
            harga_jual: 18000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang14.id,
            deskripsi: "Krim pereda nyeri otot",
            indikasi_umum: "Nyeri otot, pegal-pegal, keseleo",
            komposisi: "Methyl Salicylate, Menthol, Eugenol",
            dosis: "Oleskan secukupnya pada area yang sakit",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Hindari kontak dengan mata dan luka terbuka",
            kontra_indikasi: "Kulit sensitif, alergi komponen",
            efek_samping: "Iritasi kulit ringan",
            golongan: "Obat bebas",
            kemasan: "Tube 60 gr",
            manufaktur: "PT Ultra Sakti",
            no_bpom: "QD143712211",
        },
    });

    // BARANG dan DETAILNYA untuk jenis3 (Alergi)
    const barang15 = await prisma.barang.create({
        data: {
            nama_barang: "Cetirizine",
            id_jenis_barang: jenis3.id,
            harga_jual: 8000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang15.id,
            deskripsi: "Obat antihistamin untuk alergi",
            indikasi_umum: "Rhinitis alergi, urtikaria kronis",
            komposisi: "Cetirizine Dihydrochloride 10mg",
            dosis: "Dewasa: 1 tablet sekali sehari",
            aturan_pakai: "Sebelum atau sesudah makan",
            perhatian: "Dapat menyebabkan kantuk",
            kontra_indikasi: "Gangguan ginjal berat, alergi cetirizine",
            efek_samping: "Mengantuk, sakit kepala",
            golongan: "Obat keras (dengan resep dokter)",
            kemasan: "Strip @10 tablet",
            manufaktur: "Generic",
            no_bpom: "GKL9721621217A1",
        },
    });

    const barang16 = await prisma.barang.create({
        data: {
            nama_barang: "Chlorpheniramine Maleate (CTM)",
            id_jenis_barang: jenis3.id,
            harga_jual: 2000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang16.id,
            deskripsi: "Obat antihistamin",
            indikasi_umum: "Alergi, gatal-gatal",
            komposisi: "Chlorpheniramine Maleate 4mg",
            dosis: "Dewasa: 1 tablet 3-4x sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Menyebabkan kantuk",
            kontra_indikasi: "Asma akut, glaukoma sudut sempit",
            efek_samping: "Mengantuk, mulut kering",
            golongan: "Obat bebas terbatas",
            kemasan: "Strip @10 tablet",
            manufaktur: "PT Kimia Farma",
            no_bpom: "DTL7810702810A1",
        },
    });

    // BARANG dan DETAILNYA untuk jenis4 (Masalah pencernaan)
    const barang17 = await prisma.barang.create({
        data: {
            nama_barang: "Entrostop",
            id_jenis_barang: jenis4.id,
            harga_jual: 7000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang17.id,
            deskripsi: "Obat antidiare",
            indikasi_umum: "Diare non-spesifik",
            komposisi: "Attapulgite, Pectin",
            dosis: "Dewasa: 2 tablet setiap setelah buang air besar",
            aturan_pakai: "Sebelum atau sesudah makan",
            perhatian: "Tidak untuk diare infeksius",
            kontra_indikasi: "Diare berdarah, demam tinggi",
            efek_samping: "Sembelit",
            golongan: "Obat bebas terbatas",
            kemasan: "Strip @4 tablet",
            manufaktur: "PT Kalbe Farma",
            no_bpom: "DTL7810702810A1",
        },
    });

    const barang18 = await prisma.barang.create({
        data: {
            nama_barang: "Mylanta Suspensi",
            id_jenis_barang: jenis4.id,
            harga_jual: 20000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang18.id,
            deskripsi: "Antasida cair untuk lambung",
            indikasi_umum: "Maag, perut kembung, begah",
            komposisi: "Aluminium Hydroxide, Magnesium Hydroxide, Simethicone",
            dosis: "Dewasa: 1-2 sendok takar (5-10 ml) 3-4x sehari",
            aturan_pakai: "1 jam sebelum makan atau 2 jam setelah makan dan sebelum tidur",
            perhatian: "Hindari penggunaan jangka panjang",
            kontra_indikasi: "Gangguan ginjal berat",
            efek_samping: "Sembelit, diare",
            golongan: "Obat bebas",
            kemasan: "Botol 150 ml",
            manufaktur: "PT Johnson & Johnson Indonesia",
            no_bpom: "DBL7213207033A1",
        },
    });

    // BARANG dan DETAILNYA untuk jenis5 (Tulang dan sendi)
    const barang19 = await prisma.barang.create({
        data: {
            nama_barang: "Osteocare",
            id_jenis_barang: jenis5.id,
            harga_jual: 55000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang19.id,
            deskripsi: "Suplemen untuk kesehatan tulang",
            indikasi_umum: "Membantu memenuhi kebutuhan kalsium dan vitamin D",
            komposisi: "Kalsium, Magnesium, Zinc, Vitamin D3",
            dosis: "1 tablet per hari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Tidak untuk anak-anak tanpa pengawasan dokter",
            kontra_indikasi: "Hiperkalsemia",
            efek_samping: "Gangguan pencernaan ringan",
            golongan: "Suplemen",
            kemasan: "Box @30 tablet",
            manufaktur: "PT Vitabiotics",
            no_bpom: "SD101539261",
        },
    });

    const barang20 = await prisma.barang.create({
        data: {
            nama_barang: "Counterpain",
            id_jenis_barang: jenis5.id,
            harga_jual: 25000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang20.id,
            deskripsi: "Krim pereda nyeri otot dan sendi",
            indikasi_umum: "Nyeri otot, keseleo, nyeri sendi",
            komposisi: "Methyl Salicylate, Eugenol, Menthol",
            dosis: "Oleskan secukupnya pada area yang sakit 3-4x sehari",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Jangan digunakan pada luka terbuka",
            kontra_indikasi: "Alergi komponen",
            efek_samping: "Iritasi kulit",
            golongan: "Obat bebas",
            kemasan: "Tube 15 gr",
            manufaktur: "PT Taisho Pharmaceutical Indonesia Tbk",
            no_bpom: "QTL0712702737A1",
        },
    });

    // BARANG dan DETAILNYA untuk jenis6 (Lainnya - Obat)
    const barang21 = await prisma.barang.create({
        data: {
            nama_barang: "Betadine Antiseptic Solution",
            id_jenis_barang: jenis6.id,
            harga_jual: 10000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang21.id,
            deskripsi: "Larutan antiseptik povidone iodine",
            indikasi_umum: "Disinfeksi luka, mencegah infeksi",
            komposisi: "Povidone Iodine 10%",
            dosis: "Oleskan pada luka",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Hindari kontak dengan mata",
            kontra_indikasi: "Alergi iodine",
            efek_samping: "Iritasi kulit",
            golongan: "Obat bebas",
            kemasan: "Botol 15 ml",
            manufaktur: "PT Mundipharma Healthcare Indonesia",
            no_bpom: "PKL1110034567",
        },
    });

    const barang22 = await prisma.barang.create({
        data: {
            nama_barang: "Hansaplast Spray Antiseptik",
            id_jenis_barang: jenis6.id,
            harga_jual: 30000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang22.id,
            deskripsi: "Spray antiseptik untuk luka",
            indikasi_umum: "Membersihkan luka dan mencegah infeksi",
            komposisi: "Polyhexanide",
            dosis: "Semprotkan pada luka dari jarak 10cm",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Hindari menghirup langsung",
            kontra_indikasi: "Alergi Polyhexanide",
            efek_samping: "Iritasi kulit ringan",
            golongan: "Alat kesehatan",
            kemasan: "Botol spray 50ml",
            manufaktur: "Beiersdorf",
            no_bpom: "KEMENKES RI AKL20902717890",
        },
    });

    // BARANG dan DETAILNYA untuk jenis7 (Untuk sehari-hari - Alat)
    const barang23 = await prisma.barang.create({
        data: {
            nama_barang: "Termometer Digital",
            id_jenis_barang: jenis7.id,
            harga_jual: 45000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang23.id,
            deskripsi: "Alat pengukur suhu tubuh digital",
            indikasi_umum: "Mengukur suhu tubuh secara akurat",
            komposisi: "-",
            dosis: "-",
            aturan_pakai: "Digunakan di ketiak atau mulut",
            perhatian: "Bersihkan setelah digunakan",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Unit",
            manufaktur: "Omron Healthcare",
            no_bpom: "AKL20501817890",
        },
    });

    const barang24 = await prisma.barang.create({
        data: {
            nama_barang: "Hand Sanitizer Gel",
            id_jenis_barang: jenis7.id,
            harga_jual: 15000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang24.id,
            deskripsi: "Gel pembersih tangan tanpa bilas",
            indikasi_umum: "Membunuh kuman dan bakteri",
            komposisi: "Ethanol 70%",
            dosis: "Tuangkan secukupnya ke telapak tangan",
            aturan_pakai: "Usapkan hingga kering",
            perhatian: "Mudah terbakar, jauhkan dari jangkauan anak-anak",
            kontra_indikasi: "-",
            efek_samping: "Kulit kering",
            golongan: "Antiseptik",
            kemasan: "Botol 100ml",
            manufaktur: "PT Karya Abadi",
            no_bpom: "KEMENKES RI PKD 20501020000",
        },
    });

    // BARANG dan DETAILNYA untuk jenis8 (P3K)
    const barang25 = await prisma.barang.create({
        data: {
            nama_barang: "Kasa Steril",
            id_jenis_barang: jenis8.id,
            harga_jual: 8000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang25.id,
            deskripsi: "Kasa steril untuk menutup luka",
            indikasi_umum: "Menutup dan melindungi luka",
            komposisi: "Kain kasa katun steril",
            dosis: "-",
            aturan_pakai: "Gunakan pada luka yang sudah dibersihkan",
            perhatian: "Hanya untuk sekali pakai",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Box isi 10 pcs",
            manufaktur: "OneMed",
            no_bpom: "AKD11603900000",
        },
    });

    const barang26 = await prisma.barang.create({
        data: {
            nama_barang: "Alkohol Swab",
            id_jenis_barang: jenis8.id,
            harga_jual: 10000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang26.id,
            deskripsi: "Tisu alkohol sekali pakai untuk sterilisasi",
            indikasi_umum: "Membersihkan permukaan kulit sebelum injeksi",
            komposisi: "Isopropyl alcohol 70%",
            dosis: "Usapkan pada area yang diinginkan",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Mudah terbakar",
            kontra_indikasi: "Luka terbuka",
            efek_samping: "Iritasi ringan",
            golongan: "Alat kesehatan",
            kemasan: "Kotak isi 100 pcs",
            manufaktur: "Gea Medical",
            no_bpom: "AKD20903020000",
        },
    });

    // BARANG dan DETAILNYA untuk jenis9 (Tisu, alkohol dan jarum)
    const barang27 = await prisma.barang.create({
        data: {
            nama_barang: "Jarum Suntik Sekali Pakai",
            id_jenis_barang: jenis9.id,
            harga_jual: 50000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang27.id,
            deskripsi: "Jarum steril untuk injeksi",
            indikasi_umum: "Pengambilan sampel darah, injeksi obat",
            komposisi: "Stainless steel",
            dosis: "-",
            aturan_pakai: "Hanya untuk sekali pakai",
            perhatian: "Buang pada tempat sampah medis",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Box isi 100 pcs",
            manufaktur: "Terumo",
            no_bpom: "AKD20902900000",
        },
    });

    const barang28 = await prisma.barang.create({
        data: {
            nama_barang: "Kapas Medis",
            id_jenis_barang: jenis9.id,
            harga_jual: 7000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang28.id,
            deskripsi: "Kapas non-steril untuk berbagai keperluan medis",
            indikasi_umum: "Membersihkan luka, aplikasi antiseptik",
            komposisi: "Kapas murni",
            dosis: "-",
            aturan_pakai: "Ambil secukupnya",
            perhatian: "Simpan di tempat kering",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Gulungan 50 gr",
            manufaktur: "Mediwash",
            no_bpom: "AKL11603900000",
        },
    });

    // BARANG dan DETAILNYA untuk jenis10 (Lainnya - Peralatan)
    const barang29 = await prisma.barang.create({
        data: {
            nama_barang: "Tensimeter Digital",
            id_jenis_barang: jenis10.id,
            harga_jual: 180000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang29.id,
            deskripsi: "Alat pengukur tekanan darah digital",
            indikasi_umum: "Memantau tekanan darah",
            komposisi: "-",
            dosis: "-",
            aturan_pakai: "Lingkarkan manset pada lengan atas",
            perhatian: "Baca petunjuk penggunaan",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Unit",
            manufaktur: "Omron Healthcare",
            no_bpom: "AKL20501817890",
        },
    });

    const barang30 = await prisma.barang.create({
        data: {
            nama_barang: "Glucose Meter Kit",
            id_jenis_barang: jenis10.id,
            harga_jual: 250000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang30.id,
            deskripsi: "Alat pengukur kadar gula darah",
            indikasi_umum: "Memantau kadar gula darah pada penderita diabetes",
            komposisi: "-",
            dosis: "-",
            aturan_pakai: "Gunakan sesuai petunjuk alat",
            perhatian: "Gunakan strip tes yang kompatibel",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Kit (alat, strip, lancet)",
            manufaktur: "Accu-Chek",
            no_bpom: "AKL20101717890",
        },
    });

    const barang31 = await prisma.barang.create({
        data: {
            nama_barang: "Obat Kumur Antiseptik",
            id_jenis_barang: jenis6.id, // Masuk ke "Lainnya" untuk Obat dan Perawatan
            harga_jual: 18000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang31.id,
            deskripsi: "Cairan kumur untuk kebersihan mulut",
            indikasi_umum: "Mencegah bau mulut, membunuh kuman",
            komposisi: "Hexetidine, Thymol, Menthol",
            dosis: "Berkumur 2x sehari setelah sikat gigi",
            aturan_pakai: "Jangan ditelan",
            perhatian: "Tidak untuk anak di bawah 6 tahun",
            kontra_indikasi: "Alergi komponen",
            efek_samping: "Perubahan rasa",
            golongan: "Obat bebas",
            kemasan: "Botol 250 ml",
            manufaktur: "PT Johnson & Johnson Indonesia",
            no_bpom: "NA18151600000",
        },
    });

    const barang32 = await prisma.barang.create({
        data: {
            nama_barang: "Koyo Salonpas",
            id_jenis_barang: jenis5.id, // Masuk ke "Tulang dan sendi"
            harga_jual: 9000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang32.id,
            deskripsi: "Koyo pereda nyeri otot dan pegal",
            indikasi_umum: "Nyeri otot, nyeri sendi, sakit punggung, keseleo",
            komposisi: "Methyl Salicylate, Menthol, Camphor",
            dosis: "Tempelkan pada area yang sakit",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Jangan gunakan pada kulit sensitif atau luka terbuka",
            kontra_indikasi: "Alergi komponen",
            efek_samping: "Iritasi kulit",
            golongan: "Obat bebas",
            kemasan: "Sachet isi 10 lembar",
            manufaktur: "Hisamitsu Pharma",
            no_bpom: "QL021800201",
        },
    });

    const barang33 = await prisma.barang.create({
        data: {
            nama_barang: "Ambeven",
            id_jenis_barang: jenis4.id, // Masuk ke "Masalah pencernaan"
            harga_jual: 22000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang33.id,
            deskripsi: "Obat herbal untuk wasir/ambeien",
            indikasi_umum: "Meredakan gejala wasir",
            komposisi: "Graptophylli folium, Sophorae japonicae flos",
            dosis: "2 kapsul 3x sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Tidak untuk ibu hamil dan menyusui",
            kontra_indikasi: "-",
            efek_samping: "Efek samping ringan seperti gangguan pencernaan",
            golongan: "Obat herbal terstandar",
            kemasan: "Strip @10 kapsul",
            manufaktur: "PT Medifarma Laboratories",
            no_bpom: "TR132371901",
        },
    });

    const barang34 = await prisma.barang.create({
        data: {
            nama_barang: "Panadol Biru",
            id_jenis_barang: jenis2.id, // Masuk ke "Demam dan nyeri"
            harga_jual: 10000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang34.id,
            deskripsi: "Obat pereda demam dan nyeri",
            indikasi_umum: "Demam, sakit kepala, sakit gigi",
            komposisi: "Paracetamol 500mg",
            dosis: "Dewasa: 1-2 kaplet 3-4x sehari",
            aturan_pakai: "Dapat diminum sebelum atau sesudah makan",
            perhatian: "Hati-hati pada penderita gangguan fungsi hati",
            kontra_indikasi: "Alergi paracetamol",
            efek_samping: "Reaksi alergi kulit",
            golongan: "Obat bebas",
            kemasan: "Strip @10 kaplet",
            manufaktur: "PT Sterling Products Indonesia",
            no_bpom: "DBL7804528104A1",
        },
    });

    const barang35 = await prisma.barang.create({
        data: {
            nama_barang: "Freshcare Minyak Angin",
            id_jenis_barang: jenis6.id, // Masuk ke "Lainnya" untuk Obat dan Perawatan
            harga_jual: 16000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang35.id,
            deskripsi: "Minyak angin roll on untuk pegal dan pusing",
            indikasi_umum: "Meredakan pusing, mabuk perjalanan, gatal akibat gigitan serangga",
            komposisi: "Menthol, Camphor, Olive Oil, Essensial Oil",
            dosis: "Oleskan pada bagian tubuh yang membutuhkan",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Hindari area mata dan luka terbuka",
            kontra_indikasi: "Kulit sensitif",
            efek_samping: "Iritasi lokal",
            golongan: "Obat bebas",
            kemasan: "Botol roll on 10 ml",
            manufaktur: "PT Ultra Sakti",
            no_bpom: "QD163614531",
        },
    });

    const barang36 = await prisma.barang.create({
        data: {
            nama_barang: "Tolak Angin Cair",
            id_jenis_barang: jenis1.id, // Masuk ke "Batuk, pilek dan flu" karena untuk gejala mirip flu
            harga_jual: 5000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang36.id,
            deskripsi: "Obat herbal masuk angin",
            indikasi_umum: "Meredakan masuk angin, perut kembung, mual, sakit kepala, meriang",
            komposisi: "Ekstrak jahe, mint, adas, daun cengkeh",
            dosis: "1 sachet 3-4x sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Tidak untuk ibu hamil",
            kontra_indikasi: "Alergi komponen",
            efek_samping: "Tidak ada",
            golongan: "Obat herbal terstandar",
            kemasan: "Sachet 15 ml",
            manufaktur: "PT Sido Muncul",
            no_bpom: "TR082697291",
        },
    });

    const barang37 = await prisma.barang.create({
        data: {
            nama_barang: "Obat Merah (Povidone Iodine)",
            id_jenis_barang: jenis8.id, // Masuk ke P3K
            harga_jual: 8000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang37.id,
            deskripsi: "Larutan antiseptik untuk luka",
            indikasi_umum: "Antiseptik pada luka",
            komposisi: "Povidone Iodine 10%",
            dosis: "Oleskan pada luka",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Hindari kontak dengan mata",
            kontra_indikasi: "Alergi iodine",
            efek_samping: "Iritasi kulit",
            golongan: "Obat bebas",
            kemasan: "Botol 5 ml",
            manufaktur: "Generik",
            no_bpom: "KEMENKES RI PKD 20501800000",
        },
    });

    const barang38 = await prisma.barang.create({
        data: {
            nama_barang: "Kassa Gulung Hidrofil",
            id_jenis_barang: jenis8.id, // Masuk ke P3K
            harga_jual: 12000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang38.id,
            deskripsi: "Kain kasa gulung untuk membalut luka",
            indikasi_umum: "Membalut luka, fiksasi perban",
            komposisi: "Kain kasa hidrofil",
            dosis: "-",
            aturan_pakai: "Gunakan sesuai kebutuhan",
            perhatian: "Simpan di tempat kering",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Gulungan 4m x 5cm",
            manufaktur: "OneMed",
            no_bpom: "AKD11603900000",
        },
    });

    const barang39 = await prisma.barang.create({
        data: {
            nama_barang: "Pembalut Wanita (Reguler)",
            id_jenis_barang: jenis7.id, // Masuk ke Untuk sehari-hari
            harga_jual: 17000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang39.id,
            deskripsi: "Pembalut wanita dengan daya serap tinggi",
            indikasi_umum: "Untuk menstruasi",
            komposisi: "Non-woven, Pulp, PE film",
            dosis: "-",
            aturan_pakai: "Ganti secara berkala",
            perhatian: "Simpan di tempat kering",
            kontra_indikasi: "-",
            efek_samping: "Iritasi kulit (jarang)",
            golongan: "Alat kesehatan",
            kemasan: "Pack isi 10",
            manufaktur: "Softex",
            no_bpom: "KEMENKES RI PKD 10104100000",
        },
    });

    const barang40 = await prisma.barang.create({
        data: {
            nama_barang: "Handuk Kecil",
            id_jenis_barang: jenis7.id, // Masuk ke Untuk sehari-hari
            harga_jual: 15000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang40.id,
            deskripsi: "Handuk kecil berbahan lembut",
            indikasi_umum: "Untuk membersihkan tangan/wajah",
            komposisi: "Katun",
            dosis: "-",
            aturan_pakai: "Cuci sebelum penggunaan pertama",
            perhatian: "Cuci terpisah dengan warna gelap",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Peralatan Umum",
            kemasan: "Unit",
            manufaktur: "Terry Palmer",
            no_bpom: "-", // Produk umum, tidak memiliki BPOM
        },
    });

    const barang41 = await prisma.barang.create({
        data: {
            nama_barang: "Betadine Kumur",
            id_jenis_barang: jenis6.id, // Lainnya - Obat dan Perawatan
            harga_jual: 25000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang41.id,
            deskripsi: "Obat kumur antiseptik untuk rongga mulut",
            indikasi_umum: "Mengatasi sakit tenggorokan, sariawan, bau mulut",
            komposisi: "Povidone Iodine 1%",
            dosis: "Berkumur 10ml selama 30 detik, 3-4x sehari",
            aturan_pakai: "Jangan ditelan",
            perhatian: "Tidak untuk anak di bawah 6 tahun",
            kontra_indikasi: "Alergi iodine",
            efek_samping: "Perubahan warna gigi sementara",
            golongan: "Obat bebas",
            kemasan: "Botol 190 ml",
            manufaktur: "PT Mundipharma Healthcare Indonesia",
            no_bpom: "DTL7204900737A1",
        },
    });

    const barang42 = await prisma.barang.create({
        data: {
            nama_barang: "Konimex Tablet Vitamin C",
            id_jenis_barang: jenis6.id, // Lainnya - Obat dan Perawatan
            harga_jual: 8000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang42.id,
            deskripsi: "Suplemen Vitamin C untuk daya tahan tubuh",
            indikasi_umum: "Membantu memelihara daya tahan tubuh",
            komposisi: "Vitamin C 500mg",
            dosis: "1-2 tablet sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Hindari dosis berlebihan",
            kontra_indikasi: "Gangguan ginjal",
            efek_samping: "Gangguan pencernaan (dosis tinggi)",
            golongan: "Suplemen",
            kemasan: "Strip @10 tablet",
            manufaktur: "PT Konimex",
            no_bpom: "SD091537151",
        },
    });

    const barang43 = await prisma.barang.create({
        data: {
            nama_barang: "Antangin JRG",
            id_jenis_barang: jenis1.id, // Batuk, Pilek, Flu
            harga_jual: 4500,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang43.id,
            deskripsi: "Obat herbal untuk masuk angin dan kelelahan",
            indikasi_umum: "Meredakan masuk angin, pegal-pegal, meriang, mual",
            komposisi: "Ekstrak Zingiberis Rhizoma, Menthae Folium, Myristicae Semen",
            dosis: "1 sachet 3x sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Tidak untuk ibu hamil",
            kontra_indikasi: "Alergi komponen",
            efek_samping: "Tidak ada",
            golongan: "Obat herbal terstandar",
            kemasan: "Sachet 10 ml",
            manufaktur: "PT Deltomed Laboratories",
            no_bpom: "TR082679901",
        },
    });

    const barang44 = await prisma.barang.create({
        data: {
            nama_barang: "Kasa Hidrofil Steril",
            id_jenis_barang: jenis8.id, // P3K
            harga_jual: 9000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang44.id,
            deskripsi: "Kain kasa steril untuk penutup luka",
            indikasi_umum: "Menutup luka, menyerap cairan",
            komposisi: "Kain kasa katun steril",
            dosis: "-",
            aturan_pakai: "Gunakan pada luka yang sudah dibersihkan",
            perhatian: "Hanya untuk sekali pakai",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Alat kesehatan",
            kemasan: "Pack isi 5 lembar",
            manufaktur: "OneMed",
            no_bpom: "AKD11603900000",
        },
    });

    const barang45 = await prisma.barang.create({
        data: {
            nama_barang: "Cooling Fever Patch (ByeBye Fever)",
            id_jenis_barang: jenis2.id, // Demam dan nyeri
            harga_jual: 15000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang45.id,
            deskripsi: "Plester kompres penurun panas",
            indikasi_umum: "Membantu meredakan demam pada anak",
            komposisi: "Gel hidrogel dengan bahan pendingin",
            dosis: "Tempelkan pada dahi",
            aturan_pakai: "Ganti setiap 8 jam",
            perhatian: "Hindari kontak dengan mata",
            kontra_indikasi: "Kulit sensitif",
            efek_samping: "Iritasi kulit ringan",
            golongan: "Alat kesehatan",
            kemasan: "Box isi 2 lembar",
            manufaktur: "Kobayashi Healthcare",
            no_bpom: "AKL20501817890",
        },
    });

    const barang46 = await prisma.barang.create({
        data: {
            nama_barang: "Sapu Tangan Kain",
            id_jenis_barang: jenis7.id, // Untuk sehari-hari
            harga_jual: 7000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang46.id,
            deskripsi: "Sapu tangan kain katun",
            indikasi_umum: "Untuk membersihkan keringat atau kotoran ringan",
            komposisi: "Katun",
            dosis: "-",
            aturan_pakai: "Cuci setelah digunakan",
            perhatian: "Cuci terpisah dengan pakaian lain",
            kontra_indikasi: "-",
            efek_samping: "-",
            golongan: "Peralatan Umum",
            kemasan: "Pack isi 3",
            manufaktur: "Lokal",
            no_bpom: "-",
        },
    });

    const barang47 = await prisma.barang.create({
        data: {
            nama_barang: "Koyo Cabe",
            id_jenis_barang: jenis5.id, // Tulang dan sendi
            harga_jual: 3000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang47.id,
            deskripsi: "Koyo hangat pereda nyeri otot",
            indikasi_umum: "Pegal-pegal, nyeri otot, sakit pinggang",
            komposisi: "Ekstrak Capsicum",
            dosis: "Tempelkan pada area yang sakit",
            aturan_pakai: "Untuk pemakaian luar",
            perhatian: "Sensasi panas yang kuat, hindari kontak dengan mata",
            kontra_indikasi: "Kulit sensitif, luka terbuka",
            efek_samping: "Iritasi kulit",
            golongan: "Obat bebas",
            kemasan: "Sachet isi 10 lembar",
            manufaktur: "PT Indo Farma",
            no_bpom: "QL021800201",
        },
    });

    const barang48 = await prisma.barang.create({
        data: {
            nama_barang: "Oralit",
            id_jenis_barang: jenis4.id, // Masalah pencernaan
            harga_jual: 2000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang48.id,
            deskripsi: "Larutan rehidrasi oral untuk diare",
            indikasi_umum: "Mengganti cairan dan elektrolit yang hilang akibat diare",
            komposisi: "Natrium klorida, Kalium klorida, Glukosa anhidrat, Natrium bikarbonat",
            dosis: "Larutkan 1 sachet dalam 200 ml air",
            aturan_pakai: "Minum sesuai kebutuhan",
            perhatian: "Gunakan air matang",
            kontra_indikasi: "Gangguan ginjal berat",
            efek_samping: "Mual, muntah (jarang)",
            golongan: "Obat bebas",
            kemasan: "Sachet",
            manufaktur: "PT Pharos Indonesia",
            no_bpom: "DTL9900803423A1",
        },
    });

    const barang49 = await prisma.barang.create({
        data: {
            nama_barang: "Handscoon (Sarung Tangan Medis)",
            id_jenis_barang: jenis9.id, // Tisu, alkohol dan jarum (terkait sterilisasi)
            harga_jual: 60000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang49.id,
            deskripsi: "Sarung tangan lateks sekali pakai",
            indikasi_umum: "Melindungi tangan dari kontaminasi",
            komposisi: "Lateks",
            dosis: "-",
            aturan_pakai: "Gunakan pada tangan",
            perhatian: "Tidak untuk alergi lateks",
            kontra_indikasi: "Alergi lateks",
            efek_samping: "Reaksi alergi",
            golongan: "Alat kesehatan",
            kemasan: "Box isi 100 pcs",
            manufaktur: "Sensi",
            no_bpom: "AKL11603700000",
        },
    });

    const barang50 = await prisma.barang.create({
        data: {
            nama_barang: "Obat Batuk Sirup Herbal",
            id_jenis_barang: jenis1.id, // Batuk, pilek dan flu
            harga_jual: 20000,
        },
    });
    await prisma.detailBarang.create({
        data: {
            id_barang: barang50.id,
            deskripsi: "Obat batuk sirup dengan bahan herbal",
            indikasi_umum: "Meredakan batuk dan melegakan tenggorokan",
            komposisi: "Ekstrak daun sirih, jahe, kencur",
            dosis: "Dewasa: 15 ml 3x sehari",
            aturan_pakai: "Sesudah makan",
            perhatian: "Kocok dahulu sebelum diminum",
            kontra_indikasi: "Alergi komponen",
            efek_samping: "Tidak ada",
            golongan: "Obat herbal",
            kemasan: "Botol 60 ml",
            manufaktur: "PT Herbalindo",
            no_bpom: "TR123456789",
        },
    });


    // --- STOK BARANG LAMA ---
    // Stok untuk barang1 - OBH Combi
    await prisma.stokBarang.create({
        data: {
            id_barang: barang1.id,
            kode_batch: "OBH-202501",
            tanggal_masuk: new Date("2025-05-10"),
            tanggal_kadaluarsa: new Date("2026-05-10"),
            jumlah: 20,
        },
    });

    // Stok untuk barang2 - Paracetamol
    await prisma.stokBarang.create({
        data: {
            id_barang: barang2.id,
            kode_batch: "PCM-202501",
            tanggal_masuk: new Date("2025-05-01"),
            tanggal_kadaluarsa: new Date("2027-05-01"),
            jumlah: 50,
        },
    });

    // Stok untuk barang3 - Tisu Alkohol
    await prisma.stokBarang.create({
        data: {
            id_barang: barang3.id,
            kode_batch: "ALC-202501",
            tanggal_masuk: new Date("2025-04-20"),
            tanggal_kadaluarsa: new Date("2026-04-20"),
            jumlah: 30,
        },
    });

    // Stok untuk barang6 - Promag
    await prisma.stokBarang.create({
        data: {
            id_barang: barang6.id,
            kode_batch: "PMG-202504",
            tanggal_masuk: new Date("2025-04-15"),
            tanggal_kadaluarsa: new Date("2027-04-15"),
            jumlah: 40,
        },
    });

    // Stok untuk barang7 - Neurobion
    await prisma.stokBarang.create({
        data: {
            id_barang: barang7.id,
            kode_batch: "NRB-202504",
            tanggal_masuk: new Date("2025-04-10"),
            tanggal_kadaluarsa: new Date("2027-10-10"),
            jumlah: 15,
        },
    });

    // Stok untuk barang8 - Minyak Kayu Putih
    await prisma.stokBarang.create({
        data: {
            id_barang: barang8.id,
            kode_batch: "MKP-202503",
            tanggal_masuk: new Date("2025-03-25"),
            tanggal_kadaluarsa: new Date("2026-09-25"),
            jumlah: 20,
        },
    });

    // Stok untuk barang9 - Masker Medis
    await prisma.stokBarang.create({
        data: {
            id_barang: barang9.id,
            kode_batch: "MSK-202505",
            tanggal_masuk: new Date("2025-05-05"),
            tanggal_kadaluarsa: new Date("2027-05-05"),
            jumlah: 30,
        },
    });

    // Stok untuk barang10 - Plester Luka
    await prisma.stokBarang.create({
        data: {
            id_barang: barang10.id,
            kode_batch: "PLS-202504",
            tanggal_masuk: new Date("2025-04-01"),
            tanggal_kadaluarsa: new Date("2026-10-01"),
            jumlah: 90,
        },
    });

    // --- STOK BARANG BARU (20 item) ---
    await prisma.stokBarang.create({
        data: {
            id_barang: barang11.id,
            kode_batch: "BDF-202505",
            tanggal_masuk: new Date("2025-05-15"),
            tanggal_kadaluarsa: new Date("2027-05-15"),
            jumlah: 25,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang12.id,
            kode_batch: "VFX-202505",
            tanggal_masuk: new Date("2025-05-20"),
            tanggal_kadaluarsa: new Date("2027-05-20"),
            jumlah: 18,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang13.id,
            kode_batch: "IBP-202504",
            tanggal_masuk: new Date("2025-04-25"),
            tanggal_kadaluarsa: new Date("2026-04-25"),
            jumlah: 60,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang14.id,
            kode_batch: "HIC-202503",
            tanggal_masuk: new Date("2025-03-10"),
            tanggal_kadaluarsa: new Date("2027-03-10"),
            jumlah: 35,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang15.id,
            kode_batch: "CTZ-202505",
            tanggal_masuk: new Date("2025-05-01"),
            tanggal_kadaluarsa: new Date("2026-11-01"),
            jumlah: 45,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang16.id,
            kode_batch: "CTM-202504",
            tanggal_masuk: new Date("2025-04-05"),
            tanggal_kadaluarsa: new Date("2027-04-05"),
            jumlah: 100,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang17.id,
            kode_batch: "ENT-202505",
            tanggal_masuk: new Date("2025-05-12"),
            tanggal_kadaluarsa: new Date("2026-12-12"),
            jumlah: 55,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang18.id,
            kode_batch: "MYL-202503",
            tanggal_masuk: new Date("2025-03-18"),
            tanggal_kadaluarsa: new Date("2027-03-18"),
            jumlah: 22,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang19.id,
            kode_batch: "OST-202504",
            tanggal_masuk: new Date("2025-04-08"),
            tanggal_kadaluarsa: new Date("2026-08-08"),
            jumlah: 10,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang20.id,
            kode_batch: "CNT-202505",
            tanggal_masuk: new Date("2025-05-03"),
            tanggal_kadaluarsa: new Date("2027-05-03"),
            jumlah: 30,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang21.id,
            kode_batch: "BET-202504",
            tanggal_masuk: new Date("2025-04-12"),
            tanggal_kadaluarsa: new Date("2026-04-12"),
            jumlah: 40,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang22.id,
            kode_batch: "HPS-202505",
            tanggal_masuk: new Date("2025-05-08"),
            tanggal_kadaluarsa: new Date("2027-05-08"),
            jumlah: 15,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang23.id,
            kode_batch: "TRM-202502",
            tanggal_masuk: new Date("2025-02-01"),
            tanggal_kadaluarsa: new Date("2030-02-01"), // Alat, kadaluarsa lebih lama
            jumlah: 10,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang24.id,
            kode_batch: "HND-202505",
            tanggal_masuk: new Date("2025-05-10"),
            tanggal_kadaluarsa: new Date("2027-05-10"),
            jumlah: 50,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang25.id,
            kode_batch: "KST-202504",
            tanggal_masuk: new Date("2025-04-15"),
            tanggal_kadaluarsa: new Date("2026-04-15"),
            jumlah: 70,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang26.id,
            kode_batch: "ALS-202505",
            tanggal_masuk: new Date("2025-05-01"),
            tanggal_kadaluarsa: new Date("2026-05-01"),
            jumlah: 120,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang27.id,
            kode_batch: "JRS-202503",
            tanggal_masuk: new Date("2025-03-20"),
            tanggal_kadaluarsa: new Date("2030-03-20"), // Alat, kadaluarsa lebih lama
            jumlah: 200,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang28.id,
            kode_batch: "KPS-202505",
            tanggal_masuk: new Date("2025-05-05"),
            tanggal_kadaluarsa: new Date("2027-05-05"),
            jumlah: 80,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang29.id,
            kode_batch: "TNS-202501",
            tanggal_masuk: new Date("2025-01-10"),
            tanggal_kadaluarsa: new Date("2032-01-10"), // Alat, kadaluarsa lebih lama
            jumlah: 5,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang30.id,
            kode_batch: "GLC-202502",
            tanggal_masuk: new Date("2025-02-15"),
            tanggal_kadaluarsa: new Date("2031-02-15"), // Alat, kadaluarsa lebih lama
            jumlah: 3,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang31.id,
            kode_batch: "KMR-202505",
            tanggal_masuk: new Date("2025-05-07"),
            tanggal_kadaluarsa: new Date("2027-05-07"),
            jumlah: 25,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang32.id,
            kode_batch: "KYS-202504",
            tanggal_masuk: new Date("2025-04-18"),
            tanggal_kadaluarsa: new Date("2026-04-18"),
            jumlah: 40,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang33.id,
            kode_batch: "AMB-202505",
            tanggal_masuk: new Date("2025-05-11"),
            tanggal_kadaluarsa: new Date("2027-05-11"),
            jumlah: 15,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang34.id,
            kode_batch: "PNL-202504",
            tanggal_masuk: new Date("2025-04-02"),
            tanggal_kadaluarsa: new Date("2026-04-02"),
            jumlah: 70,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang35.id,
            kode_batch: "FSC-202503",
            tanggal_masuk: new Date("2025-03-28"),
            tanggal_kadaluarsa: new Date("2027-03-28"),
            jumlah: 30,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang36.id,
            kode_batch: "TOL-202505",
            tanggal_masuk: new Date("2025-05-09"),
            tanggal_kadaluarsa: new Date("2026-05-09"),
            jumlah: 50,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang37.id,
            kode_batch: "OBM-202504",
            tanggal_masuk: new Date("2025-04-20"),
            tanggal_kadaluarsa: new Date("2027-04-20"),
            jumlah: 20,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang38.id,
            kode_batch: "KAS-202505",
            tanggal_masuk: new Date("2025-05-03"),
            tanggal_kadaluarsa: new Date("2028-05-03"),
            jumlah: 25,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang39.id,
            kode_batch: "PBL-202504",
            tanggal_masuk: new Date("2025-04-10"),
            tanggal_kadaluarsa: new Date("2027-04-10"),
            jumlah: 40,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang40.id,
            kode_batch: "HNK-202501",
            tanggal_masuk: new Date("2025-01-01"),
            tanggal_kadaluarsa: new Date("2035-01-01"), // Produk umum, kadaluarsa lama
            jumlah: 50,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang41.id,
            kode_batch: "BKM-202505",
            tanggal_masuk: new Date("2025-05-14"),
            tanggal_kadaluarsa: new Date("2026-11-14"),
            jumlah: 18,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang42.id,
            kode_batch: "KVC-202504",
            tanggal_masuk: new Date("2025-04-22"),
            tanggal_kadaluarsa: new Date("2027-04-22"),
            jumlah: 60,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang43.id,
            kode_batch: "ATG-202505",
            tanggal_masuk: new Date("2025-05-16"),
            tanggal_kadaluarsa: new Date("2026-05-16"),
            jumlah: 35,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang44.id,
            kode_batch: "KHS-202504",
            tanggal_masuk: new Date("2025-04-25"),
            tanggal_kadaluarsa: new Date("2027-04-25"),
            jumlah: 40,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang45.id,
            kode_batch: "BYF-202505",
            tanggal_masuk: new Date("2025-05-02"),
            tanggal_kadaluarsa: new Date("2026-05-02"),
            jumlah: 20,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang46.id,
            kode_batch: "STK-202501",
            tanggal_masuk: new Date("2025-01-05"),
            tanggal_kadaluarsa: new Date("2035-01-05"),
            jumlah: 60,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang47.id,
            kode_batch: "KYC-202503",
            tanggal_masuk: new Date("2025-03-15"),
            tanggal_kadaluarsa: new Date("2026-03-15"),
            jumlah: 80,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang48.id,
            kode_batch: "ORL-202505",
            tanggal_masuk: new Date("2025-05-10"),
            tanggal_kadaluarsa: new Date("2027-05-10"),
            jumlah: 100,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang49.id,
            kode_batch: "HND-202504",
            tanggal_masuk: new Date("2025-04-01"),
            tanggal_kadaluarsa: new Date("2029-04-01"),
            jumlah: 15,
        },
    });
    await prisma.stokBarang.create({
        data: {
            id_barang: barang50.id,
            kode_batch: "OBH-202505",
            tanggal_masuk: new Date("2025-05-19"),
            tanggal_kadaluarsa: new Date("2026-05-19"),
            jumlah: 28,
        },
    });


    console.log("✅ Seeder tanpa perulangan selesai!");
}

main()
    .then(() => {
        console.log('Seeding berhasil.')
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error('Seeding gagal.', e)
        return prisma.$disconnect().finally(() => process.exit(1))
    })