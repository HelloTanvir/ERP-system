'use server';

import { cookies } from 'next/headers';
import { InventoryItem } from '../../inventory-item/_lib/utils';

export const getInventoryItem = async (id: number): Promise<InventoryItem | null> => {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const res = await fetch(`${process.env.API_URL}/inventory/item/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (res.ok) {
        const data = (await res.json()) as InventoryItem;
        return data;
    }

    return null;
};
