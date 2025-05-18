import KatalogSidebar from "@/components/Sidebar";
import Keranjang from "@/components/SideCart";
import SearchBar from "@/components/SearchBar";
import KasirCard from "@/components/KasirCard";
const products = [
  {
    name: "Obat Batuk Herbal",
    price: "Rp12.000",
    image: "/images/obat-batuk.png", // pastikan path-nya benar
  },
  {
    name: "Paracetamol 500mg",
    price: "Rp5.000",
    image: "/images/paracetamol.png",
  },
  {
    name: "Minyak Kayu Putih",
    price: "Rp8.500",
    image: "/images/kayu-putih.png",
  },
  {
    name: "Paracetamol 500mg",
    price: "Rp5.000",
    image: "/images/paracetamol.png",
  },
  {
    name: "Minyak Kayu Putih",
    price: "Rp8.500",
    image: "/images/kayu-putih.png",
  },
  {
    name: "Paracetamol 500mg",
    price: "Rp5.000",
    image: "/images/paracetamol.png",
  },
  {
    name: "Minyak Kayu Putih",
    price: "Rp8.500",
    image: "/images/kayu-putih.png",
  },
  {
    name: "Paracetamol 500mg",
    price: "Rp5.000",
    image: "/images/paracetamol.png",
  },
  {
    name: "Minyak Kayu Putih",
    price: "Rp8.500",
    image: "/images/kayu-putih.png",
  },
];

export default function DashboardKasir() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <KatalogSidebar />
      {/* Main Content */}
      <main className=" flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Produk List */}
          <div className="md:col-span-2">
            <SearchBar />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <KasirCard key={i} product={product} />
              ))}
            </div>
          </div>
          <Keranjang />
        </div>
      </main>
    </div>
  );
}
