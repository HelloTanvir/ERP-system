import { FC } from 'react';
import { InputProps } from '../_lib/utils';

function CheckboxInput({ field, error }: InputProps) {
    return (
        <div>
            <div className="flex items-center gap-2">
                <label className="font-medium text-gray-600" htmlFor={field.name}>
                    {field.label}
                </label>

                <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    disabled={field.disabled}
                    defaultChecked={!!field.defaultValue}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                />
            </div>

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default CheckboxInput as FC<InputProps>;
