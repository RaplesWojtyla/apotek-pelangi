'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Keranjang() {
  const [items, setItems] = useState([
    { id: 1, name: 'Paracetamol', price: 5000, qty: 1 },
    { id: 2, name: 'Vitamin C', price: 5000, qty: 2 }
  ])
  const [bayar, setBayar] = useState(0)
  const [metode, setMetode] = useState('tunai')

  let total = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  let kembalian = bayar - total

  return (
    <div className="hidden lg:block fixed right-0 top-0 bottom-0 max-w-[425px] pt-18 bg-white p-6 border-l shadow-lg min-h-screen overflow-y-auto z-40">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600">🛒 Keranjang</h2>

      <ul className="divide-y divide-gray-200 mb-4 max-h-64 overflow-y-auto">
        {items.map((item, index) => (
          <li key={item.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      let updated = [...items]
                      updated[index].qty = Math.max(1, updated[index].qty - 1)
                      setItems(updated)
                    }}
                  >
                    -
                  </Button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      let updated = [...items]
                      updated[index].qty += 1
                      setItems(updated)
                    }}
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
                  onClick={() => {
                    let filtered = items.filter((_, i) => i !== index)
                    setItems(filtered)
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          </li>
        ))}
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
