'use client';

import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { InputField } from '../_lib/utils';
import Input from './Input';

type MultipleFieldsProps = {
    isArray: boolean;
    initialFields: InputField[];
};

type SingleFieldProps = {
    initialField: InputField;
};

type Props = SingleFieldProps & MultipleFieldsProps;

function DynamicInput({ isArray, initialField, initialFields }: Props) {
    const [fields, setFields] = useState<InputField[]>(isArray ? initialFields : [initialField]);

    const addNewFields = () => {
        if (isArray) {
            const newFields = initialFields.map((field) => ({ ...field }));
            setFields([...fields, newFields]);
        } else {
            const newField = { ...initialField };
            setFields([...fields, newField]);
        }
    };

    return (
        <div>
            {fields.map((field, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`dynamic_input_${field.name}_${index}`}>
                    <Input field={field} />
                </div>
            ))}

            <button
                type="button"
                className="flex items-center gap-2 text-sm rounded-btn-radius px-2 py-1 border border-primary bg-primary bg-opacity-15 hover:bg-opacity-30 duration-75"
                onClick={addNewFields}
            >
                <GoPlus /> More
            </button>
        </div>
    );
}

export default DynamicInput;
