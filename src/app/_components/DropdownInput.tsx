import { FC } from 'react';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { getPromiseOptionsForDropdown, redirectTo } from '../_lib/actions';
import { formatNestedItemToDropdownOption, InputProps } from '../_lib/utils';

function DropdownInput({ field, error }: Readonly<InputProps>) {
    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            {field.creatable ? (
                <AsyncCreatableSelect
                    id={field.name}
                    name={field.name}
                    defaultValue={formatNestedItemToDropdownOption(field.defaultValue)}
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
                    defaultValue={formatNestedItemToDropdownOption(field.defaultValue)}
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
