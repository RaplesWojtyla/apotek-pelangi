'use client'

import { useState, useEffect } from 'react'
import { getProducts, Product } from '@/action/kasir/product.action'
import ProductCard from './ProductCard'
import toast from 'react-hot-toast'
import SkeletonCard from '@/components/skeleton/SkeletonCard'

// DITAMBAH: jenisId pada interface Props
interface Props {
  search: string
  currPage: number
  take: number
  jenisId: string 
  onAddToCart: (product: Product) => void
  cartItems: { id: string; quantity: number }[]
}

export default function CatalogProductKasir({
  search,
  currPage,
  take,
  jenisId, // DITAMBAH: Terima prop jenisId
  onAddToCart,
  cartItems = [],
}: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetchingProducts(true)
      try {
        // DIUBAH: Kirim id_jenis_barang ke action getProducts
        const data = await getProducts({ 
          matcher: search, 
          page: currPage, 
          take, 
          id_jenis_barang: jenisId 
        })
        setProducts(data)
      } catch (error) {
        console.error('[CatalogProductKasir] Error fetching products:', error)
        toast.error('Gagal mengambil data produk')
      } finally {
        setIsFetchingProducts(false)
      }
    }

    fetchProducts()
    // DIUBAH: Tambahkan jenisId ke dependency array agar komponen di-refresh saat filter berubah
  }, [search, currPage, take, jenisId])

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
        products.map((product, index) => ( // <-- Tambahkan 'index'
          <ProductCard
            key={product.id}
            product={product as Product & { stok_barang: number }}
            onAddToCart={onAddToCart}
            cartQty={getCartQty(product.id)}
            isFirst={index === 0}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
						<svg
							className="w-16 h-16 text-gray-400 mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
							></path>
						</svg>

						<h3 className="text-lg font-semibold text-gray-700 mb-1">
							Oops! Produk Tidak Ditemukan!
						</h3>
						<p className="text-sm text-gray-500">
							Sepertinya tidak ada produk yang cocok dengan filter atau pencarian Anda.
						</p>
					</div>
      )}
    </div>
  )
}