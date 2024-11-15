'use server';

import { DropdownSelectOption, InputField, ListResponse } from '@/app/_lib/utils';
import { cookies } from 'next/headers';
import { IChartOfAccount } from './utils';

export const getPromiseOptionsForDropdown = (inputValue: string, field: Partial<InputField>) => {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const url = new URL(`${process.env.API_URL}/${field.optionsGetUrl}`);
    url.searchParams.append(field.optionsFilterQuery || 'search', inputValue || '');

    return new Promise<DropdownSelectOption[]>((resolve) => {
        fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token?.value}`,
            },
        })
            .then((res) => res.json())
            .then((data: ListResponse<IChartOfAccount['category']>) => {
                resolve(
                    data?.results?.map((item) => ({
                        label: item[field.name as keyof IChartOfAccount['category']],
                        value: item.id,
                        item,
                    }))
                );
            });
    });
};
