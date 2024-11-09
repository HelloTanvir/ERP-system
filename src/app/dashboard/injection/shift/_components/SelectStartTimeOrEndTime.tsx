import { InputField } from '@/app/_lib/utils';
import { Dispatch } from '@reduxjs/toolkit';
import { SetStateAction } from 'react';
import Select from 'react-select';

interface Props {
    field: InputField;
    error: string | null;
    dateTime: string | null;
    setDateTime: Dispatch<SetStateAction<string | null>>;
}

const timeOptions = [
    { label: '00:00', value: '00:00' },
    { label: '01:00', value: '01:00' },
    { label: '02:00', value: '02:00' },
    { label: '03:00', value: '03:00' },
    { label: '04:00', value: '04:00' },
    { label: '05:00', value: '05:00' },
    { label: '06:00', value: '06:00' },
    { label: '07:00', value: '07:00' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
    { label: '23:00', value: '23:00' },
];

function SelectStartTimeOrEndTime({ field, error, dateTime, setDateTime }: Readonly<Props>) {
    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <Select
                id={field.name}
                name={field.name}
                defaultValue={field.defaultValue}
                isDisabled={field.disabled}
                required={field.required}
                options={timeOptions}
                value={dateTime}
                onChange={(selectedOption) => {
                    setDateTime(selectedOption);
                }}
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default SelectStartTimeOrEndTime;
