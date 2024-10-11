import { FC } from 'react';
import { InputProps } from '../_lib/utils';

function DropdownInput({ field, error }: InputProps) {
    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <select
                id={field.name}
                name={field.name}
                defaultValue={field.defaultValue}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
            >
                {field.options?.map((option) => (
                    <option key={option.label} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default DropdownInput as FC<InputProps>;
