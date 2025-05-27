'use client'

import { CartItem } from "@/action/customer/cart.action"
import { useUser } from "@clerk/nextjs"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"

interface CartContextType {
	cartItemsCount: number
	fetchAndUpdateCartCount: (showLoading?: boolean) => Promise<void>
	isLoadingCartCount: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItemsCount, setCartItemsCount] = useState<number>(0)
	const [isLoadingCartCount, setIsLoadingCartCount] = useState<boolean>(true)
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


	return (
		<CartContext.Provider value={{ cartItemsCount, fetchAndUpdateCartCount, isLoadingCartCount }}>
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
