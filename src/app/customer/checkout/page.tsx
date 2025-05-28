import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form: Info Penerima + Metode Pembayaran */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
            {/* Informasi Penerima */}
            <div>
              <h2 className="text-xl font-bold mb-4">Informasi Penerima</h2>
              <div className="space-y-4">
                <div>
                  <label className="font-medium">Nama Penerima</label>
                  <Input placeholder="Masukkan nama penerima" className="mt-1" />
                </div>
                <div>
                  <label className="font-medium">Nomor Telepon</label>
                  <Input placeholder="Masukkan nomor telepon" className="mt-1" />
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <h2 className="text-xl font-bold mb-4">Pilih Metode Pembayaran</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-between w-full">
                  Dana <span className="ml-auto">&rarr;</span>
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  Gopay <span className="ml-auto">&rarr;</span>
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  QRIS <span className="ml-auto">&rarr;</span>
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  Bank Transfer <span className="ml-auto">&rarr;</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Ringkasan Order */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold">Order</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">Rp 164.673,00</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya lainnya</span>
              <span className="font-semibold">Rp 0,00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rp 164.673,00</span>
            </div>
          </Card>

          <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-lg py-4">
            Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
