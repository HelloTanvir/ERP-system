'use server';

import { DropdownSelectOption, InputField, ListResponse } from '@/app/_lib/utils';
import { cookies } from 'next/headers';

export const getPromiseOptionsForTimeSheetDropdown = (inputValue: string, field: InputField) => {
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
            .then(
                (
                    data: ListResponse<{
                        id: string;
                        mold_name: string;
                    }>
                ) => {
                    resolve(
                        data?.results?.map((item) => ({
                            label: item.mold_name,
                            value: item.id,
                            item,
                        }))
                    );
                }
            );
    });
};
