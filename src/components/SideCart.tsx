// components/Keranjang.tsx
"use client";

export default function Keranjang() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Keranjang</h2>
      <ul className="space-y-2 mb-4 overflow-y-auto">
        <li className="flex justify-between items-center">
          <span>1x Paracetamol</span>
          <div className="flex items-center space-x-2">
            <span>Rp5.000</span>
            <button className="text-red-500 hover:text-red-700">Hapus</button>
          </div>
        </li>
        <li className="flex justify-between items-center">
          <span>2x Vitamin C</span>
          <div className="flex items-center space-x-2">
            <span>Rp10.000</span>
            <button className="text-red-500 hover:text-red-700">Hapus</button>
          </div>
        </li>
      </ul>

      <div className="border-t pt-2">
        <div className="flex justify-between">
          <span className="font-medium">Total:</span>
          <span className="font-semibold">Rp15.000</span>
        </div>

        <div className="mt-3">
          <label className="block mb-1 font-medium">Bayar:</label>
          <input
            type="number"
            placeholder="Masukkan jumlah bayar"
            className="w-full p-2 rounded border border-gray-300"
          />
        </div>

        <div className="mt-2 flex justify-between">
          <span className="font-medium">Kembalian:</span>
          <span>Rp5.000</span>
        </div>

        <button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-xl shadow">
          Simpan Transaksi
        </button>
      </div>
    </div>
  );
}
