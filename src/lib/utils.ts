import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import midtransClient from "midtrans-client"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const generatePagination = (totalPages: number, currPage: number) => {
	if (totalPages < 8) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	if (currPage < 4) {
		return [1, 2, 3, '...', totalPages - 1, totalPages]
	}

	if (currPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
	}

	return [
		1,
		'...',
		currPage - 1,
		currPage,
		currPage + 1,
		'...',
		totalPages
	]
}

export const snap = new midtransClient.Snap({
	isProduction: false,
	serverKey: process.env.MIDTRANS_SERVER_KEY,
	clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
})
