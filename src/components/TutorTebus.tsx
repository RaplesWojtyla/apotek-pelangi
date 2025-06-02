"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TutorTebus() {
  return (
    <Accordion
      type="single"
      collapsible
      className="border border-cyan-300 rounded-lg"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-cyan-500 text-white px-4 py-2">
          Cara Menebus Resep
        </AccordionTrigger>
        <AccordionContent className="bg-white px-4 py-4">
          <h2 className="font-bold mb-2 text-lg">Langkah-langkah Menebus Resep Secara Online</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                1
              </div>
              <span>Klik pada <b>Unggah Foto Resep</b> dan pilih file gambar resep dari perangkat Anda.</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                2
              </div>
              <span>Isi kolom <b>Tambahkan Catatan</b> jika ada informasi tambahan (opsional).</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                3
              </div>
              <span>Tekan tombol <b>Tebus Resep Obat</b> untuk mengirimkan permintaan Anda.</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                4
              </div>
              <span>Tunggu konfirmasi dari apotek terkait ketersediaan obat dan validasi resep.</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                5
              </div>
              <span>Setelah disetujui, obat akan otomatis masuk ke <b>keranjang</b>.</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                6
              </div>
              <span>Buka <b>keranjang</b> dan lakukan pembayaran melalui tombol <b>Checkout</b>.</span>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
