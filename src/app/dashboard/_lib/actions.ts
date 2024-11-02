'use server';

import { ListResponse } from '@/app/_lib/utils';
import { AuthPath } from '@/app/auth/[page]/_lib/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from './utils';

export async function signOut() {
    'use server';

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
            refresh_token: refreshToken?.value ?? '',
        }),
    });

    if (signOutRes.ok) {
        cookieStore.delete('access-token');
        cookieStore.delete('refresh-token');
        redirect('/auth/login');
    }
}

export interface ServerActionOptions {
    endpoint: string;
    revalidatePath: string;
}

export async function createGenericServerActions<T extends { id: number | string }>({
    endpoint,
    revalidatePath: path,
}: ServerActionOptions) {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    async function createItem(item: Omit<T, 'id'>): Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        } | null;
    }> {
        'use server';

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token?.value}`,
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            const errors = await response.json();
            return { success: false, errors };
        }

        revalidatePath(path);
        return { success: true, errors: null };
    }

    async function updateItem(item: T): Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        } | null;
    }> {
        'use server';

        const response = await fetch(`${endpoint}${item.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token?.value}`,
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            const errors = await response.json();
            return { success: false, errors };
        }

        revalidatePath(path);
        return { success: true, errors: null };
    }

    async function deleteItem(id: T['id']): Promise<void> {
        'use server';

        const res = await fetch(`${endpoint}${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${access_token?.value}`,
            },
        });
        // const data = await res.json();
        console.log(res);
        revalidatePath(path);
    }

    async function getItems(query?: SearchParams): Promise<ListResponse<T>> {
        'use server';

        let ep = endpoint;
        if (query) {
            ep = `${ep}?${Object.entries(query)
                .map((e) => `${e[0]}=${e[1]}`)
                .join('&')}`;
        }

        const response = await fetch(ep, {
            headers: { Authorization: `Bearer ${access_token?.value}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        const data: ListResponse<T> = await response.json();

        return data;
    }

    return { createItem, updateItem, deleteItem, getItems };
}
