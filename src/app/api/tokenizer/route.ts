import { snap } from "@/lib/utils"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const midtransParams = await req.json()

	const transasction = await snap.createTransaction(midtransParams)

	return NextResponse.json(transasction)
}