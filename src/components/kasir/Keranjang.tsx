'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CartItem } from '@/app/kasir/page' 

export default function Keranjang({
  items, 
  onUpdateQty, 
  onRemoveItem 
}: {
  items: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
}) {
  const [bayar, setBayar] = useState(0)
  const [metode, setMetode] = useState('tunai')

  let total = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  let kembalian = bayar - total

  return (
    <div className="p-1">
      <ul className="divide-y divide-gray-200 mb-4 max-h-64 overflow-y-auto">
        {items.length === 0 ? ( 
          <li className="py-4 text-center text-gray-500">Keranjang kosong</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{item.nama_barang}</p> {/* Menggunakan item.nama_barang */}
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1} 
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{item.qty}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">
                    Rp{(item.qty * item.price).toLocaleString()}
                  </p>
                  <button
                    className="text-xs text-red-500 hover:underline"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between font-medium">
          <span>Total:</span>
          <span className="font-bold text-cyan-600">Rp{total.toLocaleString()}</span>
        </div>

        <div className="space-y-1">
          <Label htmlFor="bayar">Bayar:</Label>
          <Input
            id="bayar"
            type="number"
            value={bayar}
            onChange={e => setBayar(parseInt(e.target.value || '0'))}
            placeholder="Masukkan nominal bayar"
          />
        </div>

        <div className="flex justify-between font-medium">
          <span>Kembalian:</span>
          <span className={kembalian < 0 ? 'text-red-500' : 'text-green-600'}>
            Rp{Math.max(0, kembalian).toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <Label>Metode Pembayaran:</Label>
          <RadioGroup
            defaultValue="tunai"
            value={metode}
            onValueChange={setMetode}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tunai" id="tunai" />
              <Label htmlFor="tunai">Tunai</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="qris" id="qris" />
              <Label htmlFor="qris">QRIS</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          disabled={total === 0 || bayar < total}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-3"
        >
          Simpan Transaksi
        </Button>
      </div>
    </div>
  )
}