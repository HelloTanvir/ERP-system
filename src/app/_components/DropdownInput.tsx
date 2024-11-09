'use client';

import { Component, FC, useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { getPromiseOptionsForDropdown, redirectTo } from '../_lib/actions';
import { InputProps } from '../_lib/utils';

function DropdownInput({ field, error }: Readonly<InputProps>) {
    const [selected, setSelected] = useState<any>(null);

    let defaultValue;
    if (field.defaultValue) {
        defaultValue = {
            label: field.defaultValue?.label || field.defaultValue?.name,
            value: field.defaultValue?.value || field.defaultValue?.id,
        };
    }

    let component: Component;
    if (field.creatable) {
        component = (
            <AsyncCreatableSelect
                id={field.name}
                // name={field.name}
                defaultValue={defaultValue}
                isDisabled={field.disabled}
                required={field.required}
                isMulti={field.isMulti}
                cacheOptions
                defaultOptions
                loadOptions={(inputValue) => getPromiseOptionsForDropdown(inputValue, field)}
                onCreateOption={() =>
                    field.redirectURLOnCreate && redirectTo(field.redirectURLOnCreate)
                }
                value={selected}
                onChange={(selectedOption) => {
                    setSelected(selectedOption);
                }}
            />
        );
    } else {
        component = (
            <AsyncSelect
                id={field.name}
                // name={field.name}
                defaultValue={defaultValue}
                isDisabled={field.disabled}
                required={field.required}
                isMulti={field.isMulti}
                cacheOptions
                defaultOptions
                loadOptions={(inputValue) => getPromiseOptionsForDropdown(inputValue, field)}
                value={selected}
                onChange={(selectedOption) => {
                    setSelected(selectedOption);
                }}
            />
        );
    }

    const getValue = useCallback(() => {
        if (field.isMulti && Array.isArray(selected)) {
            return selected?.map((item) => item.value)?.toString();
        }
        return selected?.value;
    }, [field.isMulti, selected]);

    return (
        <div className="relative">
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            {component}
            <input
                className="h-0 absolute top-1/2 left-3 -translate-x-1/2"
                name={field.name}
                required={field.required}
                value={getValue()}
                readOnly
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default DropdownInput as FC<InputProps>;
