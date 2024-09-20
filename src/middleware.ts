import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access-token');

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const verifiedAccessToken = await fetch(`${process.env.API_URL}/account/token/verify`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: accessToken?.value,
        }),
    });

    const response = NextResponse.next();

    if (verifiedAccessToken.status === 201) {
        return response;
    }

    const refreshToken = request.cookies.get('refresh-token');
    if (!refreshToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const tokenRes = await fetch(`${process.env.API_URL}/account/token/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: refreshToken.value,
        }),
    });

    const tokenData: {
        message: string;
        statusCode: number;
        data: {
            access: string;
            refresh: string;
        } | null;
        error: {
            [key: string]: string;
        } | null;
    } = await tokenRes.json();

    if (tokenData.statusCode === 401 || !tokenData.data) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const { access, refresh } = tokenData.data;

    response.cookies.set('access-token', access);
    response.cookies.set('refresh-token', refresh);

    return response;
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
