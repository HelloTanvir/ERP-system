'use client';

import { ChangeEvent, FC, useRef, useState } from 'react';
import { InputField } from '../_lib/utils';

interface Props {
    field: InputField;
    error?: string;
}

function PhoneNumberInput({ field, error }: Props) {
    // TODO: implement this component properly

    const [countryCode, setCountryCode] = useState('+880');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCountryCode((prev) => {
            console.log({ prev });

            if (inputRef.current) {
                inputRef.current.value = e.target.value + inputRef.current.value.replace(prev, '');
            }

            return e.target.value;
        });
    };

    return (
        <div className="relative">
            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                {field.label}
            </p>

            <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-2 border-r-2 border-gray-300"
            >
                <option value="+880">+880 (BAN)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (IN)</option>
            </select>

            <input
                ref={inputRef}
                placeholder={field.placeholder}
                type={field.type}
                name={field.name}
                minLength={field.minLength}
                required={field.required}
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 pl-36 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md text-black autofill:text-black"
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default PhoneNumberInput as FC<Props>;
