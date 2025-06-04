import { snap } from "@/lib/utils"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const midtransParams = await req.json()

		const transasction = await snap.createTransaction(midtransParams)

		return NextResponse.json(transasction)
	} catch (error) {
		console.error(`Error creating Midtrans transaction: ${error}`);

		return NextResponse.json(
			{ error: "Gagal membuat transaksi." },
			{ status: 500 }
		)
	}
}