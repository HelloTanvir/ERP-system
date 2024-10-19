'use server';

import { DropdownSelectOption, ListResponse } from '@/app/_lib/utils';
import { cookies } from 'next/headers';

export async function getWarehouseDropdownOptions(): Promise<DropdownSelectOption[]> {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const warehouseRes = await fetch(`${process.env.API_URL}/inventory/warehouse/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (warehouseRes.ok) {
        const data: ListResponse<{
            id: string;
            name: string;
        }> = await warehouseRes.json();

        return data?.results?.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }

    return [];
}
