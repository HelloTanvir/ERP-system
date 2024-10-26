'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select';
import { useDebouncedCallback } from 'use-debounce';
import { SearchField } from '../../_lib/utils';

const icon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="scale-75"
    >
        <path
            d="M22.3242 22.5085L27.5097 27.694M4.17468 14.7301C4.17468 17.4807 5.26735 20.1187 7.21232 22.0636C9.15728 24.0086 11.7952 25.1013 14.5458 25.1013C17.2964 25.1013 19.9343 24.0086 21.8793 22.0636C23.8243 20.1187 24.9169 17.4807 24.9169 14.7301C24.9169 11.9795 23.8243 9.34161 21.8793 7.39664C19.9343 5.45168 17.2964 4.35901 14.5458 4.35901C11.7952 4.35901 9.15728 5.45168 7.21232 7.39664C5.26735 9.34161 4.17468 11.9795 4.17468 14.7301Z"
            stroke="#5E697A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface Props {
    fields?: SearchField[];
}

function SearchInTable({ fields }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term: string, name: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(name, term);
        } else {
            params.delete(name);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="ml-5 flex gap-5">
            {fields?.map((field) => {
                if (field.type === 'dropdown') {
                    return (
                        <div key={field.name} className="flex flex-col gap-1">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label className="text-[#5E697A] text-sm">{field.label}</label>
                            <Select
                                className="basic-single w-[200px]"
                                classNamePrefix="select"
                                name={field.name}
                                options={field.options?.map((option) => ({
                                    value: option,
                                    label: option,
                                }))}
                                onChange={(selectedOption) =>
                                    handleSearch(selectedOption?.value || '', field.name)
                                }
                            />
                        </div>
                    );
                }

                return (
                    <div
                        key={field.name}
                        className="bg-[#F0F0F0] rounded-input-radius flex items-center w-[300px]"
                    >
                        {icon}
                        <input
                            key={field.name}
                            type={field.type}
                            placeholder="Search"
                            className="input input-sm rounded-input-radius flex-1 bg-transparent focus:outline-none focus:ring-0 focus:border-0 pl-0"
                            onChange={(e) => handleSearch(e.target.value, field.name)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default SearchInTable;
