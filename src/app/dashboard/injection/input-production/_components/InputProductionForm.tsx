'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { IInputProduction, IInputProductionItem } from '../_lib/utils';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IInputProduction | null;
    handleSubmit: (item: IInputProduction) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function InputProductionForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [tableRows, setTableRows] = useState<IInputProductionItem[]>([]);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const inputProduction = {} as IInputProduction;
            if (currentItem?.id) inputProduction.id = currentItem.id;

            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) inputProduction[key] = value;
            });

            inputProduction.production_details = tableRows;
            console.log(inputProduction);

            const currentFormState = await handleSubmit(inputProduction);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const addRow = () => {
        setTableRows((prevRows) => [
            ...prevRows,
            {
                id: Date.now(),
                total_counter: 0,
                rejected_counter: 0,
                pushing_weight: 0,
                actual_pushing_weight: 0,
                consumption_variance: 0,
                resin_name_one: '',
                resin_name_two: '',
                color: '',
                production: 0,
            },
        ]);
    };

    const removeRow = (id: number) => {
        setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const updateRow = (id: number, field: keyof IInputProduction, value: any) => {
        setTableRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const columnNames = [
        'Total Counter',
        'Reject Counter',
        'Pushing Weight',
        'Actual Avg Pushing Weight',
        'Consumption Variance',
        'Resin Name 1',
        'Resin Name 2',
        'Color',
        'Action',
    ];

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className="max-h-[40rem] grid grid-cols-3 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof IInputProduction]
                                    ? {
                                          defaultValue:
                                              currentItem[field.name as keyof IInputProduction],
                                      }
                                    : {}),
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
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
                        {tableRows.map((row) => (
                            <tr key={row.id}>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="total counter"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'total_counter', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="rejected counter"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'rejected_counter', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="pushing weight"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'pushing_weight', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="actual pushing weight"
                                        onBlur={(e) =>
                                            updateRow(
                                                row.id,
                                                'actual_pushing_weight',
                                                e.target.value
                                            )
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="consumption variance"
                                        onBlur={(e) =>
                                            updateRow(
                                                row.id,
                                                'consumption_variance',
                                                e.target.value
                                            )
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="resin name 1"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'resin_name_one', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>

                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="resin  name 2"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'resin_name_two', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="color"
                                        onBlur={(e) => updateRow(row.id, 'color', e.target.value)}
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>

                                <td className="border border-gray-300 border-l-0 border-r-0">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(row.id)}
                                        className="btn btn-sm text-red-500 text-xl"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={addRow} className="btn btn-sm mt-2 text-purple-500">
                    Add Row
                </button>
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

export default InputProductionForm;
