import { FC } from 'react';
import { InputField } from '../_lib/utils';

interface Props {
    field: InputField;
    error?: string;
}

const dropdownIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
            d="M19.5827 8.0995L12.0857 15.4075L4.58869 8.0995C4.45474 7.96867 4.27493 7.89542 4.08769 7.89542C3.90044 7.89542 3.72063 7.96867 3.58669 8.0995C3.52183 8.16305 3.4703 8.2389 3.43513 8.3226C3.39995 8.40631 3.38184 8.4962 3.38184 8.587C3.38184 8.6778 3.39995 8.76769 3.43513 8.8514C3.4703 8.9351 3.52183 9.01095 3.58669 9.0745L11.5622 16.8505C11.7022 16.987 11.8901 17.0634 12.0857 17.0634C12.2813 17.0634 12.4691 16.987 12.6092 16.8505L20.5847 9.076C20.65 9.01241 20.7019 8.93637 20.7374 8.85238C20.7728 8.7684 20.7911 8.67816 20.7911 8.587C20.7911 8.49584 20.7728 8.4056 20.7374 8.32162C20.7019 8.23763 20.65 8.16159 20.5847 8.098C20.4507 7.96717 20.2709 7.89392 20.0837 7.89392C19.8964 7.89392 19.7166 7.96717 19.5827 8.098V8.0995Z"
            fill="black"
        />
    </svg>
);

function PhoneNumberInput({ field, error }: Props) {
    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <div className="flex gap-6">
                <div className="relative w-[160px]">
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none scale-75">
                        {dropdownIcon}
                    </div>

                    <select
                        defaultValue="+880"
                        name="countryCode"
                        className="w-full p-2 text-sm border border-gray-300 rounded-input-radius text-black focus:outline-none focus:border-black appearance-none"
                    >
                        <option value="+880">+880 (BAN)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+91">+91 (IN)</option>
                    </select>
                </div>

                <input
                    id={field.name}
                    placeholder={field.placeholder}
                    type={field.type}
                    name={field.name}
                    minLength={field.minLength}
                    required={field.required}
                    className="flex-1 border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                />
            </div>

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default PhoneNumberInput as FC<Props>;
