'use client'

import { useState } from 'react'
import { Loader2, ShoppingCart, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/action/kasir/product.action'

interface ProductCardProps {
  product: Product & { stok_barang: number }
  onAddToCart: (product: Product) => void
  cartQty?: number
}

export default function ProductCard({ product, onAddToCart, cartQty = 0 }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const isOutOfStock = product.stok_barang === 0 || cartQty >= product.stok_barang
  const isDisabled = isOutOfStock || isAdding

  const handleAdd = async () => {
    if (isDisabled) return
    setIsAdding(true)
    try {
      onAddToCart(product)
    } catch (err) {
      console.error('[ProductCard] add error', err)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full h-32 bg-gray-100 flex items-center justify-center">
        <img
          src={product.foto_barang}
          alt={product.nama_barang}
          className="max-h-full object-contain"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">STOK HABIS</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs uppercase text-gray-500 mb-1">
          Untuk: {product.jenis_barang.nama_jenis}
        </p>
        <h3 className="text-sm font-medium truncate mb-2" title={product.nama_barang}>
          {product.nama_barang}
        </h3>

        <p className="text-sm font-semibold text-orange-500 mb-2">
          Rp {product.harga_jual.toLocaleString('id-ID')}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Package size={16} className="mr-1" />
          <span>Stok: {product.stok_barang}</span>
        </div>

        <div className="mt-auto">
          <Button
            className={`w-full flex items-center justify-center py-2 rounded-md space-x-2 
              ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none' 
                           : 'bg-cyan-500 hover:bg-cyan-600 text-white'}
            `}
            onClick={handleAdd}
            disabled={isDisabled}
            title={isOutOfStock ? 'Stok tidak mencukupi' : 'Beli Sekarang'}
          >
            {isAdding ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Beli Sekarang</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
