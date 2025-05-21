import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ProductDetailPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Gambar Produk */}
        <div className="md:col-span-1 flex justify-center">
          <img
            src="/logo.png"
            alt="Prospan"
            className="w-64 h-64 rounded-lg"
          />
        </div>

        {/* Detail Produk */}
        <div className="md:col-span-1 space-y-6">
          <h1 className="text-2xl font-bold">Prospan Sirup</h1>
          <p className="text-xl text-green-700 font-semibold">Rp8.700</p>

          {/* Jumlah */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Jumlah:</span>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200">-</button>
              <span className="px-4">1</span>
              <button className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200">+</button>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex w-full gap-2">
            <button className="flex-1 bg-cyan-500 text-white text-sm py-2 rounded-md hover:bg-cyan-600">
              Beli Sekarang
            </button>
            <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
              <ShoppingCart size={18} />
            </button>
          </div>

          {/* Informasi Tambahan */}
          <div className="space-y-6 text-sm mt-6 leading-relaxed">
            <div>
              <p className="font-semibold text-xl">Kategori :</p>
              <p>Obat & Perawatan</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Deskripsi :</p>
              <p>Prospan sirup merupakan obat batuk herbal yang digunakan untuk meredakan batuk berdahak secara alami.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Indikasi Umum :</p>
              <p>Meredakan batuk berdahak.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Komposisi :</p>
              <p>Tiap 5 ml mengandung ekstrak daun ivy (Hedera helix).</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Dosis :</p>
              <p>Dewasa dan anak-anak sesuai petunjuk penggunaan.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Aturan Pakai :</p>
              <p>Sesudah makan, sesuai dosis berdasarkan usia.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Perhatian :</p>
              <p>Gunakan sesuai anjuran dokter jika sedang hamil atau menyusui.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Kontra Indikasi :</p>
              <p>Hipersensitif terhadap salah satu komponen.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Efek Samping :</p>
              <p>Mual ringan atau alergi ringan pada beberapa pengguna.</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Golongan :</p>
              <p>Obat bebas terbatas</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Kemasan :</p>
              <p>Botol 100 ml</p>
            </div>

            <div>
              <p className="font-semibold text-xl">Manufaktur :</p>
              <p>Darya Varia</p>
            </div>

            <div>
              <p className="font-semibold text-xl">No. BPOM :</p>
              <p>TI184645601</p>
            </div>
          </div>
        </div>

        {/* Rekomendasi Produk */}
        <div className="md:col-span-1 space-y-6">
          {["Flutamol", "Paracetamol", "Expan", "Sanmol"].map((name, i) => (
            <Card key={i} className="max-w-xs w-full mx-auto">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <img
                  src={`/rekomendasi${i + 1}.png`}
                  alt={name}
                  className="w-16 h-16 rounded"
                />
                <div className="flex w-full gap-2">
                  <button className="flex-1 bg-cyan-500 text-white text-sm py-1 rounded-md hover:bg-cyan-600">
                    Beli Sekarang
                  </button>
                  <button className="p-2 bg-white border border-cyan-500 rounded-md hover:bg-cyan-50 text-cyan-600">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
