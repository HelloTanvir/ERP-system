'use server';

import { AuthPath } from '@/app/auth/[page]/_lib/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOut() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access-token');
    const refreshToken = cookieStore.get('refresh-token');

    const signOutRes = await fetch(`${process.env.API_URL}/account/${AuthPath.logout}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify({
            refresh_token: refreshToken.value,
        }),
    });

    if (signOutRes.ok) {
        cookieStore.delete('access-token');
        cookieStore.delete('refresh-token');
        redirect('/auth/login');
    }
}
