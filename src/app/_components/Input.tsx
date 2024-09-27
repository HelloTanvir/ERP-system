import { FC } from 'react';
import { InputProps } from '../_lib/utils';
import DropdownInput from './DropdownInput';
import MultipleDragDropFile from './MultipleDragDropFile';
import PhoneNumberInput from './PhoneNumberInput';
import TextareaInput from './TextareaInput';

function Input({ field, error }: InputProps) {
    if (field.type === 'tel') {
        return <PhoneNumberInput field={field} error={error} />;
    }

    if (field.type === 'dropdown') {
        return <DropdownInput field={field} error={error} />;
    }

    if (field.type === 'textarea') {
        return <TextareaInput field={field} error={error} />;
    }

    if (field.type === 'multiple-drag-drop-file') {
        return <MultipleDragDropFile field={field} error={error} />;
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
