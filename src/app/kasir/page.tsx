'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link' // DITAMBAH

import SearchBar from '@/components/SearchBar'
import CatalogSidebar from '@/components/kasir/CatalogSidebar'
import CatalogProducts from '@/components/kasir/CatalogProductKasir'
import Keranjang from '@/components/kasir/Keranjang'
import SideCart from '@/components/kasir/SideCart'
import ProductPagination from '@/components/Pagination'

import { getCatalogTotalPages, Product } from '@/action/kasir/product.action'

export type CartItem = {
	id: string
	nama_barang: string
	harga_jual: number
	quantity: number
	stok_barang: number
	resep?: boolean
}

export default function DashboardKasirPage() {
	const params = useSearchParams()
	const search = String(params.get('matcher') ?? '')
	const page = Number(params.get('page') ?? 1)
	// DITAMBAH: Baca parameter filter dari URL
	const jenisId = params.get("jenisId") ?? ""
	const jenisNama = params.get("jenisNama") ?? ""
	const kategoriNama = params.get("kategoriNama") ?? ""
	const take = 8

	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)

	const handleAddToCart = useCallback((product: Product & { stok_barang: number }) => {
		setCartItems(prev => {
			const exist = prev.find(item => item.id === product.id)
			if (exist) {
				if (exist.quantity >= product.stok_barang) return prev
				return prev.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			return [
				...prev,
				{
					id: product.id,
					nama_barang: product.nama_barang,
					harga_jual: product.harga_jual,
					quantity: 1,
					stok_barang: product.stok_barang,
				},
			]
		})
		toast.success(`${product.nama_barang} ditambahkan ke keranjang`)
	}, [])

	const handleUpdateQty = useCallback((id: string, newQty: number) => {
		setCartItems(prev =>
			prev
				.map(item =>
					item.id === id ? { ...item, quantity: newQty } : item
				)
				.filter(item => item.quantity > 0)
		)
	}, [])

	const handleRemoveItem = useCallback((id: string) => {
		setCartItems(prev => prev.filter(item => item.id !== id))
	}, [])

	const handleClearCart = useCallback(() => {
		setCartItems([])
	}, [])

	useEffect(() => {
		const fetchTotal = async () => {
			try {
				// DIUBAH: Kirim jenisId ke action untuk perhitungan halaman
				const t = await getCatalogTotalPages(search, take, jenisId)
				setTotalPages(t)
			} catch {
				toast.error('Gagal menghitung total halaman')
			}
		}
		fetchTotal()
		// DIUBAH: Tambahkan jenisId sebagai dependency agar halaman di-update saat filter berubah
	}, [search, page, jenisId])

	return (
		<>
			<Toaster position="top-right" />
			<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 overflow-x-hidden">
				<CatalogSidebar />

				<div className="flex-1 lg:pl-64 p-4">
					<SearchBar />
					{/* DIUBAH: Judul dinamis berdasarkan filter yang aktif */}
					{jenisId && jenisNama ? (
						<h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
							<Link
								href={'/kasir'}
								className="text-gray-500 hover:underline"
							>
								Semua Produk
							</Link>
							<span className="mx-2 text-gray-400">&gt;</span>
							<span className="text-gray-500">{kategoriNama}</span>
							<span className="mx-2 text-gray-400">&gt;</span>
							<span className="text-cyan-600">{jenisNama}</span>
						</h1>
					) : (
						<h1 className="text-2xl font-bold mb-6">Semua Produk</h1>
					)}
					<CatalogProducts
						search={search}
						currPage={page}
						take={take}
						onAddToCart={handleAddToCart}
						cartItems={cartItems}
						jenisId={jenisId} // DIUBAH: Kirim jenisId ke komponen produk
					/>
					<div className="mt-6 flex justify-center">
						<ProductPagination totalPages={totalPages} />
					</div>
				</div>

				<div className="hidden lg:block w-[340px] flex-none p-2">
					<aside className="sticky top-4 bg-white border shadow-md rounded-md flex flex-col">
						<h2 className="text-2xl font-bold mb-2 text-cyan-600 px-4 pt-4">🛒 Keranjang</h2>
						<Keranjang
							items={cartItems}
							onUpdateQty={handleUpdateQty}
							onRemoveItem={handleRemoveItem}
							onClearCart={handleClearCart}
						/>
					</aside>
				</div>
			</div>

			<SideCart
				items={cartItems}
				onUpdateQty={handleUpdateQty}
				onRemoveItem={handleRemoveItem}
			/>
		</>
	)
}