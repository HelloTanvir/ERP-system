'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DropdownSelectOption, InputField, ListResponse } from './utils';

export const getPromiseOptionsForDropdown = (inputValue: string, field: InputField) => {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    if (!field.optionsGetUrl) {
        return new Promise<DropdownSelectOption[]>((resolve) => {
            resolve(
                (field.options || []).filter((option) =>
                    option.label?.toLowerCase()?.includes(inputValue.toLowerCase())
                )
            );
        });
    }

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
                        name: string;
                    }>
                ) => {
                    resolve(
                        data?.results?.map((item) => ({
                            label: item.name,
                            value: item.id,
                            item,
                        }))
                    );
                }
            );
    });
};

export const redirectTo = (url: string) => {
    redirect(url);
};
