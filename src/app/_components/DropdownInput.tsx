import { FC } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { getPromiseOptionsForDropdown, redirectTo } from '../_lib/actions';
import { InputProps } from '../_lib/utils';

function DropdownInput({ field, error }: Readonly<InputProps>) {
    let defaultValue;
    if (field.defaultValue) {
        defaultValue = {
            label: field.defaultValue?.label || field.defaultValue?.name,
            value: field.defaultValue?.value || field.defaultValue?.id,
        };
    }

    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            {field.creatable ? (
                <AsyncCreatableSelect
                    id={field.name}
                    name={field.name}
                    defaultValue={defaultValue}
                    isDisabled={field.disabled}
                    cacheOptions
                    defaultOptions
                    loadOptions={(inputValue) => getPromiseOptionsForDropdown(inputValue, field)}
                    onCreateOption={() =>
                        field.redirectURLOnCreate && redirectTo(field.redirectURLOnCreate)
                    }
                />
            ) : (
                <AsyncSelect
                    id={field.name}
                    name={field.name}
                    defaultValue={defaultValue}
                    isDisabled={field.disabled}
                    cacheOptions
                    defaultOptions
                    loadOptions={(inputValue) => getPromiseOptionsForDropdown(inputValue, field)}
                />
            )}

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default DropdownInput as FC<InputProps>;
