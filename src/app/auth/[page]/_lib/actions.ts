'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthPath, formatTokenResponse, getFormFields, PageType, TokenResponse } from './utils';

export async function authFormSubmit(
    page: PageType,
    formData: FormData
): Promise<{ errors: Record<string, string> | null; success: boolean }> {
    const rawFormData = getFormFields(page).map((field) => {
        if (field.type === 'tel') {
            const countryCode = formData.get('countryCode');
            return {
                [field.name]: `${countryCode}${formData.get(field.name)}`,
            };
        }

        if (field.name === 'otp') {
            return {
                [field.name]: formData.getAll(field.name).join(''),
            };
        }

        return {
            [field.name]: formData.get(field.name),
        };
    });

    if (page === 'login') {
        rawFormData.push({ remember: formData.get('remember') === 'on' });
    }

    const tokenRes = await fetch(`${process.env.API_URL}/account/${AuthPath[page]}`, {
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

    const jsonData = await tokenRes.json();
    const tokenData: TokenResponse = formatTokenResponse(jsonData);

    if (tokenData.errors) {
        return {
            errors: tokenData.errors,
            success: false,
        };
    }

    const { access_token, refresh_token } = tokenData.data;

    const cookieStore = cookies();

    cookieStore.set('access-token', access_token);
    cookieStore.set('refresh-token', refresh_token);

    if (['signup'].includes(page)) redirect('/auth/otp-verification');
    if (page === 'forgot-password') redirect('/auth/reset-password');
    if (page === 'reset-password') redirect('/auth/login');
    else redirect('/dashboard');

    return { errors: null, success: true };
}

export async function sendOtp() {
    // TODO: Implement this
    console.log('sendOtp');
}
