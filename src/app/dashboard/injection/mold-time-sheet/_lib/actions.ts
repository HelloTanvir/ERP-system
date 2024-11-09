'use server';

import {
    DropdownSelectOption,
    formatDateTimestamp,
    InputField,
    ListResponse,
} from '@/app/_lib/utils';
import { cookies } from 'next/headers';

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
                        inactive_from: string;
                    }>
                ) => {
                    resolve(
                        data?.results?.map((item) => ({
                            label: formatDateTimestamp(item.inactive_from),
                            value: item.id,
                            item,
                        }))
                    );
                }
            );
    });
};
