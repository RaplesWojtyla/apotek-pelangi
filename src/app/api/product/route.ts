import { getProducts } from "@/action/customer/product.action";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const page = Number(searchParams.get('page') ?? 1) 
		const search = String(searchParams.get('search') ?? "") 
		const take = Number(searchParams.get('take') ?? 16)
		const products = await getProducts({page: page, matcher: search, take: take})

		return NextResponse.json(products)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message ?? "Internal server error." },
			{ status: 500 }
		)
	}
}