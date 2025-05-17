"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RedirectToRoleDashboard() {
	const { isLoaded, isSignedIn, user } = useUser();
	const router = useRouter();
	const didRedirect = useRef(false);

	useEffect(() => {
		if (!isLoaded || !isSignedIn || didRedirect.current) return;
		const role = user.publicMetadata.role as
			| "admin"
			| "kasir"
			| "customer"
			| undefined;

		// pastikan role sudah ter-set di metadata Clerk
		if (!role) {
			console.warn("User tidak memiliki role di publicMetadata");
			return;
		}

		let target = "/";
		if (role === "admin") target = "/admin";
		else if (role === "kasir") target = "/kasir";
		else if (role === "customer") target = "/customer";

		didRedirect.current = true;
		router.replace(target);
	}, [isLoaded, isSignedIn, user, router]);

	return null;
}
