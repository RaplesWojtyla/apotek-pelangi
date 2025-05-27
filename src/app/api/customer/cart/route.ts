import { addToCart, getCart, deleteCartItem, deleteSelectedCartItems, updateCartItemQty } from "@/action/customer/cart.action";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cart = await getCart()

		return NextResponse.json(cart)
	} catch (error: any) {
		console.error("[API GET /cart] Error:", error.message);

		return NextResponse.json(
			{ error: error.message || "Gagal memuat keranjang" },
			{ status: error.message === "Pengguna tidak terautentikasi!" ? 401 : 500 }
		);
	}
}

export async function POST(req: Request) {
	const { idBarang, amount, sumber } = await req.json()

	if (!idBarang || typeof amount !== 'number' || !sumber) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 400 }
		)
	}

	try {
		const item = await addToCart(idBarang, amount, sumber)

		return NextResponse.json(
			item,
			{ status: 201 }
		)
	} catch (error: any) {
		console.error("[API POST /cart] Error:", error.message)

		return NextResponse.json(
			{ error: error.message || "Gagal menambahkan ke keranjang" },
			{ status: error.message.includes("Stok tidak mencukupi") ? 400 : 500 }
		);
	}
}

export async function PUT(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const cartItemId = searchParams.get('id')

		if (!cartItemId) {
			return NextResponse.json(
				{ error: "ID item keranjang diperlukan" },
				{ status: 400 }
			)
		}

		const { newQuantity } = await req.json()

		if (typeof newQuantity !== 'number' || newQuantity < 0) {
			return NextResponse.json(
				{ error: "Kuantitas baru tidak valid" },
				{ status: 400 }
			)
		}

		const updatedItem = await updateCartItemQty(cartItemId, newQuantity)

		return NextResponse.json(updatedItem)
	} catch (error: any) {
		console.error("[API PUT /cart] Error:", error.message)

		return NextResponse.json(
			{ error: error.message || "Gagal mengubah kuantitas" },
			{ status: error.message.includes("Stok tidak mencukupi") ? 400 : 500 }
		)
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const cartItemId = searchParams.get('id')

		let body
		try {
			body = await req.json()
		} catch (e) {
			body = null
		}

		if (cartItemId) {
			const deletedItem = await deleteCartItem(cartItemId)

			return NextResponse.json(deletedItem)
		} else if (body && Array.isArray(body.ids) && body.ids.length > 0) {
			const res = await deleteSelectedCartItems(body.ids)

			return NextResponse.json(res)
		} else {
			return NextResponse.json(
				{ error: "Internal server error" },
				{ status: 400 }
			)
		}
	} catch (error: any) {
		console.error("[API DELETE /cart] Error:", error.message)

		return NextResponse.json(
			{ error: error.message || "Gagal menghapus item" },
			{ status: 500 }
		)
	}
}
