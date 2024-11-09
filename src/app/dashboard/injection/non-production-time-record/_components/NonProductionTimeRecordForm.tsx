'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { differenceInMinutes } from 'date-fns';
import { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import AsyncSelect from 'react-select/async';
import { INonProductionTimeRecord } from '../_lib/utils';
import SelectInactiveFromOrTo from './SelectInactiveFromOrTo';

interface ItemFormProps {
    fields: InputField[];
    currentItem: INonProductionTimeRecord | null;
    handleSubmit: (item: INonProductionTimeRecord) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

type MachineType = 'single_machine' | 'multiple_machine';

function NonProductionTimeRecordForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [selectedReason, setSelectedReason] = useState([]);
    const [machineType, setMachineType] = useState<MachineType>('single_machine');
    const [inactiveFrom, setInactiveFrom] = useState<Date | null>(null);
    const [inactiveTo, setInactiveTo] = useState<Date | null>(null);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const nonProductionTimeRecord = {} as INonProductionTimeRecord;
            if (currentItem?.id) nonProductionTimeRecord.id = currentItem.id;

            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) nonProductionTimeRecord[key] = value;
            });

            nonProductionTimeRecord.inactive_from = inactiveFrom?.toISOString();
            nonProductionTimeRecord.inactive_to = inactiveTo?.toISOString();
            nonProductionTimeRecord.reason = selectedReason;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            nonProductionTimeRecord.machine = nonProductionTimeRecord.machine?.split(',');

            console.log(nonProductionTimeRecord);

            const currentFormState = await handleSubmit(nonProductionTimeRecord);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const loadStatusOptions = (inputValue) => {
        const options = [
            { label: 'Electricity Unavailable', value: 'electricity_unavailable' },
            { label: 'No Worker to Operate', value: 'no_worker' },
            { label: 'Machine Trouble', value: 'machine_trouble' },
            { label: 'Mold Trouble', value: 'mold_trouble' },
            { label: 'Holiday', value: 'holiday' },
            { label: 'No Production Plan', value: 'no_production_plan' },
            { label: 'Unoccupied', value: 'unoccupied' },
            { label: 'Machine Heating Time', value: 'machine_heating' },
        ];

        return new Promise((resolve) => {
            const filteredOptions = options.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            resolve(filteredOptions);
        });
    };

    const columnNames = ['Reason', 'Hours', 'Minutes'];

    const renderInput = (field: InputField) => {
        if (['inactive_from', 'inactive_to'].includes(field.name))
            return (
                <SelectInactiveFromOrTo
                    field={field}
                    error={itemFormState.errors?.[field.name]}
                    dateTime={field.name === 'inactive_from' ? inactiveFrom : inactiveTo}
                    setDateTime={field.name === 'inactive_from' ? setInactiveFrom : setInactiveTo}
                />
            );

        return (
            <Input
                field={{
                    ...field,
                    ...(currentItem?.[field.name as keyof INonProductionTimeRecord]
                        ? {
                              defaultValue:
                                  currentItem[field.name as keyof INonProductionTimeRecord],
                          }
                        : {}),
                    ...(field.type === 'dropdown'
                        ? {
                              isMulti:
                                  field.name === 'machine' && machineType === 'multiple_machine',
                          }
                        : {}),
                }}
                error={itemFormState.errors?.[field.name]}
            />
        );
    };

    const calculateMinutes = useCallback(() => {
        const minutes = differenceInMinutes(inactiveTo || new Date(), inactiveFrom || new Date());

        return minutes;
    }, [inactiveFrom, inactiveTo]);

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

                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                        {renderInput(field)}
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <table className="table border-collapse w-full">
                    <thead>
                        <tr className="text-purple-700">
                            {columnNames.map((column, index) => (
                                <th
                                    key={column}
                                    className={`border border-t-0 border-gray-300 ${index === 0 ? 'border-l-0' : ''} ${index === columnNames.length - 1 ? 'border-r-0' : ''}`}
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border w-1/2 border-gray-300 border-l-0">
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={loadStatusOptions}
                                    placeholder="Select Reason"
                                    onChange={(option) => setSelectedReason(option.value)}
                                    className="w-full"
                                    required
                                />
                            </td>
                            <td className="border border-gray-300 border-l-0">
                                <p>{Math.floor(calculateMinutes() / 60) || 0} hr</p>
                            </td>
                            <td className="border border-gray-300 border-l-0">
                                <p>{calculateMinutes() % 60 || 0} min</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

export default NonProductionTimeRecordForm;
