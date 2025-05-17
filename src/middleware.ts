import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isKasirRoute = createRouteMatcher(['/kasir(.*)'])
const isCustomerRoute = createRouteMatcher(['/customer(.*)'])

export default clerkMiddleware(async (auth, req) => {
	if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata.role === 'ADMIN') {
		const url = new URL('/admin', req.url)

		return NextResponse.redirect(url)
	}
	
	if (isKasirRoute(req) && (await auth()).sessionClaims?.metadata.role === 'KASIR') {
		const url = new URL('/kasir', req.url)

		return NextResponse.redirect(url)
	}

	if (isCustomerRoute(req) && (await auth()).sessionClaims?.metadata.role === 'CUSTOMER') {
		const url = new URL('/customer', req.url)

		return NextResponse.redirect(url)
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};