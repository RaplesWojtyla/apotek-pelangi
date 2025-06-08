'use client'

import { useState, useEffect } from 'react'
import { getProducts, Product } from '@/action/kasir/product.action'
import ProductCard from './ProductCard'
import toast from 'react-hot-toast'
import SkeletonCard from '@/components/skeleton/SkeletonCard'

interface Props {
  search: string
  currPage: number
  take: number
  onAddToCart: (product: Product) => void
  cartItems: { id: string; quantity: number }[] // ✅ diterima dari parent
}

export default function CatalogProductKasir({
  search,
  currPage,
  take,
  onAddToCart,
  cartItems = [],
}: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetchingProducts(true)
      try {
        const data = await getProducts({ matcher: search, page: currPage, take })
        setProducts(data)
      } catch (error) {
        console.error('[CatalogProductKasir] Error fetching products:', error)
        toast.error('Gagal mengambil data produk')
      } finally {
        setIsFetchingProducts(false)
      }
    }

    fetchProducts()
  }, [search, currPage, take])

  const getCartQty = (productId: string) => {
    const item = cartItems.find(item => item.id === productId)
    return item?.quantity ?? 0
  }

  if (isFetchingProducts) {
    return <SkeletonCard />
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product as Product & { stok_barang: number }}
            onAddToCart={onAddToCart}
            cartQty={getCartQty(product.id)}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-12">
          <p>Oops! Produk tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}
