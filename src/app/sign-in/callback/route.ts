import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId, syncUser } from "@/action/user.action";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	await syncUser()
	const dbUser = await getUserByClerkId(user.id);

	let dest =`${process.env.NEXT_PUBLIC_APP_URL}/customer`;
	if (dbUser?.role === "ADMIN") dest =`${process.env.NEXT_PUBLIC_APP_URL}/admin`;
	else if (dbUser?.role === "KASIR") dest =`${process.env.NEXT_PUBLIC_APP_URL}/kasir`;

	const url = new URL(dest, req.url)
	
	return NextResponse.redirect(url);
}
