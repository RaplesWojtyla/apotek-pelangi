import { addToCart, getCart } from "@/action/cart.action";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cart = await getCart()

		return NextResponse.json(cart)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 401 }
		)
	}
}

export async function POST(req: Request) {
	const { idBarang, amount, sumber } = await req.json()

	try {
		const item = await addToCart(idBarang, amount, sumber)

		return NextResponse.json(item)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 401 }
		)
	}
}
