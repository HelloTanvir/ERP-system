import { FC } from 'react';
import { InputField } from '../_lib/utils';
import PhoneNumberInput from './PhoneNumberInput';

interface Props {
    field: InputField;
    error?: string;
}

function Input({ field, error }: Props) {
    if (field.type === 'tel') {
        return <PhoneNumberInput field={field} error={error} />;
    }

    return (
        <div className="relative">
            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                {field.label}
            </p>

            <input
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                minLength={field.minLength}
                required={field.required}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md text-black autofill:text-black"
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default Input as FC<Props>;
