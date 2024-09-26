import { FC } from 'react';
import { InputProps } from '../_lib/utils';

function TextareaInput({ field, error }: InputProps) {
    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <textarea
                id={field.name}
                name={field.name}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default TextareaInput as FC<InputProps>;
