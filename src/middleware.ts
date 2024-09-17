import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    // TODO: implement authentication check
    return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - auth (authentication routes)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
    ],
};
