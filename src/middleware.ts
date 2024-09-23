import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AuthPath, formatTokenResponse, TokenResponse } from './app/auth/[page]/_lib/utils';

export async function middleware(request: NextRequest) {
    // Ignore auth check for home page (/)
    if (request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('access-token');

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const verifiedAccessTokenRes = await fetch(
        `${process.env.API_URL}/account/${AuthPath['verify-access-token']}`,
        {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: accessToken?.value,
            }),
        }
    );

    const response = NextResponse.next();

    if (verifiedAccessTokenRes.ok) {
        return response;
    }

    const refreshToken = request.cookies.get('refresh-token');
    if (!refreshToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const tokenRes = await fetch(`${process.env.API_URL}/account/${AuthPath['refresh-token']}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: refreshToken.value,
        }),
    });

    const tokenJsonData = await tokenRes.json();
    const tokenData: TokenResponse = formatTokenResponse(tokenJsonData);

    if (tokenData.status_code === 401 || !tokenData.data) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const { access_token, refresh_token } = tokenData.data;

    response.cookies.set('access-token', access_token);
    response.cookies.set('refresh-token', refresh_token);

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
