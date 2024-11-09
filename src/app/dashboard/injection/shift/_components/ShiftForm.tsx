'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { differenceInSeconds } from 'date-fns';
import { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import { IShift } from '../_lib/utils';
import SelectStartTimeOrEndTime from './SelectStartTimeOrEndTime';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IShift | null;
    handleSubmit: (item: IShift) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function ShiftForm({ fields, currentItem, handleSubmit, closeModal }: Readonly<ItemFormProps>) {
    const [startTime, setStartTime] = useState<{ label: string; value: string } | null>(null);
    const [endTime, setEndTime] = useState<{ label: string; value: string } | null>(null);

    const calculateTotalTime = useCallback(() => {
        if (!startTime || !endTime) return 0;

        const _startTime = new Date();
        _startTime.setHours(parseInt(startTime.value.split(':')[0], 10));
        _startTime.setMinutes(parseInt(startTime.value.split(':')[1], 10));
        _startTime.setSeconds(0);

        const _endTime = new Date();
        _endTime.setHours(parseInt(endTime.value.split(':')[0], 10));
        _endTime.setMinutes(parseInt(endTime.value.split(':')[1], 10));
        _endTime.setSeconds(0);

        const shiftDuration = differenceInSeconds(_endTime, _startTime);

        return shiftDuration;
    }, [startTime, endTime]);

    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const shift = {} as IShift;
            if (currentItem?.id) shift.id = currentItem.id;

            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;
                if (!key.includes('$ACTION_ID_')) shift[key] = value;
            });

            shift.total_time = calculateTotalTime().toString();

            console.log({ shift });

            const currentFormState = await handleSubmit(shift);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const getSetter = (field: InputField) => {
        switch (field.name) {
            case 'start_time':
                return setStartTime;
            case 'end_time':
                return setEndTime;
            default:
                return () => {};
        }
    };

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className=" max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                        {['start_time', 'end_time'].includes(field.name) ? (
                            <SelectStartTimeOrEndTime
                                field={field}
                                error={itemFormState.errors?.[field.name]}
                                dateTime={field.name === 'start_time' ? startTime : endTime}
                                setDateTime={getSetter(field)}
                            />
                        ) : (
                            <Input
                                key={
                                    field.name === 'total_time'
                                        ? calculateTotalTime().toString()
                                        : field.name
                                }
                                field={{
                                    ...field,
                                    placeholder: field.label,
                                    ...(field.name === 'total_time'
                                        ? {
                                              defaultValue: calculateTotalTime().toString(),
                                          }
                                        : {}),
                                }}
                                error={itemFormState.errors?.[field.name]}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-sm text-purple-600 hover:bg-purple-500 hover:text-white btn-outline font-bold px-6 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-sm bg-purple-500 text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default ShiftForm;
