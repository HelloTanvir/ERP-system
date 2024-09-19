'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFormFields, PageType } from './utils';

export async function authFormSubmit(page: PageType, formData: FormData) {
    const rawFormData = getFormFields(page).map((field) => {
        if (field.type === 'tel') {
            const countryCode = formData.get('countryCode');
            return {
                [field.name]: `${countryCode}${formData.get(field.name)}`,
            };
        }

        return {
            [field.name]: formData.get(field.name),
        };
    });

    if (page === 'login') {
        rawFormData.push({ remember: formData.get('remember') === 'on' });
    }

    const tokenRes = await fetch(`${process.env.API_URL}/auth/${page}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            rawFormData.reduce((acc, curr) => {
                return { ...acc, ...curr };
            }, {})
        ),
    });

    const tokenData: {
        error: {
            [key: string]: string;
        } | null;
        statusCode: number;
        data: {
            access_token: string;
            refresh_token: string;
        } | null;
    } = await tokenRes.json();

    if (![200, 201].includes(tokenData.statusCode) || !tokenData.data) {
        return {
            error: tokenData.error,
            success: false,
        };
    }

    const { access_token, refresh_token } = tokenData.data;

    const cookieStore = cookies();

    cookieStore.set('access-token', access_token);
    cookieStore.set('refresh-token', refresh_token);

    if (page === 'forgot-password') redirect('/auth/reset-password');
    if (page === 'reset-password') redirect('/auth/login');
    else redirect('/');

    return { error: null, success: true };
}
