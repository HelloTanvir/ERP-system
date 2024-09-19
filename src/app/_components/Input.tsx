import { FC } from 'react';
import { InputProps } from '../_lib/utils';
import OtpInput from './OtpInput';
import PhoneNumberInput from './PhoneNumberInput';

function Input({ field, error }: InputProps) {
    if (field.type === 'otp') {
        return <OtpInput field={field} error={error} />;
    }

    if (field.type === 'tel') {
        return <PhoneNumberInput field={field} error={error} />;
    }

    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <input
                id={field.name}
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                minLength={field.minLength}
                required={field.required}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default Input as FC<InputProps>;
