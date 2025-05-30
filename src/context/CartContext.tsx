'use client'

import { CartItem } from "@/action/customer/cart.action"
import { useUser } from "@clerk/nextjs"
import { SumberCart } from "@prisma/client"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"


export interface ItemForCheckout {
	idCart: string
	idBarang: string
	namaBarang: string
	jumlah: number
	hargaJual: number
	fotoBarang?: string
	idResep?: string | null
	sumber: SumberCart
	totalStock: number
}

interface CartContextType {
	cartItemsCount: number
	fetchAndUpdateCartCount: (showLoading?: boolean) => Promise<void>
	isLoadingCartCount: boolean
	checkoutItems: ItemForCheckout[]
	setCheckoutItemsHandler: (items: ItemForCheckout[]) => void
	clearCheckoutItemsHandler: () => void 
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItemsCount, setCartItemsCount] = useState<number>(0)
	const [isLoadingCartCount, setIsLoadingCartCount] = useState<boolean>(true)
	const [checkoutItems, setCheckoutItems] = useState<ItemForCheckout[]>([])
	const { isSignedIn, user } = useUser()

	const fetchAndUpdateCartCount = useCallback(async (showLoading = true) => {
		if (!isSignedIn) {
			setCartItemsCount(0)
			setIsLoadingCartCount(false)
			return
		}

		if (showLoading) setIsLoadingCartCount(true)

		try {
			const res = await fetch('/api/customer/cart')

			if (!res.ok) {
				console.error(`'[CartProvider]: Error fetching cart: ${res.status}`);
				setCartItemsCount(0)
			} else {
				const cartItems: CartItem[] = await res.json()

				setCartItemsCount(cartItems.length)
			}
		} catch (error) {
			console.error(`'[CartProvider]: Error fetching cart: ${error}`);
			setCartItemsCount(0)
		} finally {
			if (showLoading) setIsLoadingCartCount(false)
		}
	}, [isSignedIn])

	useEffect(() => {
		if (isSignedIn) fetchAndUpdateCartCount()
		else {
			setCartItemsCount(0)
			setIsLoadingCartCount(false)
		}
	}, [isSignedIn, user, fetchAndUpdateCartCount])

	const setCheckoutItemsHandler = (items: ItemForCheckout[]) => setCheckoutItems(items)
	const clearCheckoutItemsHandler = () => setCheckoutItems([])

	return (
		<CartContext.Provider value={{
			cartItemsCount, 
			fetchAndUpdateCartCount,
			isLoadingCartCount, 
			checkoutItems, 
			setCheckoutItemsHandler, 
			clearCheckoutItemsHandler 
		}}>
			{children}
		</CartContext.Provider>
	)
}

export const useCartContext = () => {
	const context = useContext(CartContext)

	if (context == undefined) {
		throw new Error("[useCartContext] harus digunakan di dalam CartProvider")
	}

	return context
}
