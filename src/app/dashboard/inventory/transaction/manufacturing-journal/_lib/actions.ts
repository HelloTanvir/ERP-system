import { DropdownSelectOption, ListResponse } from '@/app/_lib/utils';
import { cookies } from 'next/headers';

export async function getManufacturedItemsDropdownOptions(): Promise<DropdownSelectOption[]> {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const manufacturedItemsRes = await fetch(`${process.env.API_URL}/manufacturing/manufacture/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (manufacturedItemsRes.ok) {
        const data: ListResponse<{
            id: string;
            name: string;
        }> = await manufacturedItemsRes.json();
        return (data || [])?.results?.map((item: { id: string; name: string }) => ({
            label: item.name,
            value: item.id,
        }));
    }

    return [];
}
