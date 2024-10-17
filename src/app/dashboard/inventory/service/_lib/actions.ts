import { DropdownSelectOption, ListResponse } from '@/app/_lib/utils';
import { cookies } from 'next/headers';

export async function getUnitOfMeasureDropdownOptions(): Promise<DropdownSelectOption[]> {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const unitOfMeasurementRes = await fetch(`${process.env.API_URL}/inventory/measurement-unit/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (unitOfMeasurementRes.ok) {
        const data: ListResponse<{
            id: string;
            name: string;
        }> = await unitOfMeasurementRes.json();
        return (data || [])?.results?.map((item: { id: string; name: string }) => ({
            label: item.name,
            value: item.id,
        }));
    }

    return [];
}
