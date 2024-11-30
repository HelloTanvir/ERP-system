'use server';

import { cookies } from 'next/headers';
import { DropdownSelectOption, InputField, ListResponse } from './utils';

export const getPromiseOptionsForDropdown = (inputValue: string, field: InputField) => {
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
                        voucher_no: string;
                    }>
                ) => {
                    resolve(
                        data?.results?.map((item) => ({
                            label: item.voucher_no,
                            value: item.id,
                            item,
                        }))
                    );
                }
            );
    });
};
