import { Category, countAllCategories, getCategories } from "@/action/category.action"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const take: number = Number(searchParams.get('take') ?? await countAllCategories())
		const categories: Category[] = await getCategories(take)

		console.log(searchParams);
		return NextResponse.json(categories)
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message ?? "Internal Server Error"},
			{ status: 500 }
		)
	}
}