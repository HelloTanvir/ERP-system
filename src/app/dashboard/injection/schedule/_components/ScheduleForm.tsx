'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ISchedule } from '../_lib/utils';

interface ItemFormProps {
    fields: InputField[];
    currentItem: ISchedule | null;
    handleSubmit: (item: ISchedule) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

type MachineType = 'single_machine' | 'multiple_machine';

function ScheduleForm({ fields, currentItem, handleSubmit, closeModal }: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [machineType, setMachineType] = useState<MachineType>('single_machine');
    const [showStockQuantity, setShowStockQuantity] = useState(false);

    console.log(showStockQuantity);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const schedule = {} as ISchedule;
            if (currentItem?.id) schedule.id = currentItem.id;

            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) schedule[key] = value;
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            schedule.machine = schedule.machine?.split(',');

            console.log(schedule);

            const currentFormState = await handleSubmit(schedule);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className="max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                <div className="flex flex-col justify-end">
                    {['single_machine', 'multiple_machine'].map((type) => (
                        <div key={type}>
                            <input
                                id={type}
                                className="mr-2"
                                type="radio"
                                value={type}
                                name="machine_type"
                                checked={machineType === type}
                                onChange={() => setMachineType(type as MachineType)}
                            />
                            <label htmlFor={type}>
                                {type === 'single_machine' ? 'Single Machine' : 'Multiple Machine'}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-start gap-2 items-center">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-xs checkbox-info"
                        onClick={() => setShowStockQuantity(!showStockQuantity)}
                    />
                    <span className="text-[16px]">Show stock quantity</span>
                </div>
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof ISchedule]
                                    ? {
                                          defaultValue: currentItem[field.name as keyof ISchedule],
                                      }
                                    : {}),
                                ...(field.type === 'dropdown'
                                    ? {
                                          isMulti:
                                              field.name === 'machine' &&
                                              machineType === 'multiple_machine',
                                      }
                                    : {}),
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
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

export default ScheduleForm;
