import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard } from "lucide-react";

export default function PembayaranPage() {
  return (
        <div className="min-h-screen bg-white text-gray-900">
  <Navbar />

  <div className="p-4 md:p-10 max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Checkout</h1>

    <Card className="bg-gray-100 p-6 md:p-10 space-y-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold">
        Pesanan anda telah diterima. Silahkan lakukan pembayaran
      </h2>

      <div className="mb-6">
        <p className="font-medium text-lg">Korey Doyle</p>
        <p className="text-sm text-gray-600">No Telepon: 084860342321</p>
      </div>

      <hr className="border-gray-300" />

      <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 my-6">
        <div className="mb-3">
          <p className="text-gray-500">Kode Invoice:</p>
          <p className="font-semibold text-gray-900">INV-00002</p>
        </div>
        <div className="mb-3">
          <p className="text-gray-500">Tanggal Transaksi:</p>
          <p className="font-semibold text-gray-900">22 Mei 2025</p>
        </div>
        <div className="mb-3">
          <p className="text-gray-500">Total:</p>
          <p className="font-semibold text-gray-900">Rp 164.673,00</p>
        </div>
        <div className="mb-3">
          <p className="text-gray-500">Metode Pembayaran:</p>
          <p className="font-semibold text-gray-900">GOPAY</p>
        </div>
      </div>

      <hr className="border-gray-300" />

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Detail Pesanan</h3>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>Rp 164.673,00</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Diskon</span>
            <span>Rp 0,00</span>
          </div>

          <hr className="border-gray-300 my-3" />

          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>Rp 164.673,00</span>
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Status Pembayaran</h3>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="text-blue-600" size={18} />
            <Badge className="bg-yellow-400 text-black font-medium">
              Menunggu Pembayaran
            </Badge>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6">
          Bayar Sekarang
        </Button>
      </div>
    </Card>
  </div>

  <Footer />
</div>

    );
    }
