import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserDb } from "@/action/user.action";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	const dbUser = await getUserDb(user.id);

	let dest = "/customer";
	if (dbUser?.role === "ADMIN") dest = "/admin";
	else if (dbUser?.role === "KASIR") dest = "/kasir";

	const url = new URL(dest, req.url)
	
	return NextResponse.redirect(url);
}
