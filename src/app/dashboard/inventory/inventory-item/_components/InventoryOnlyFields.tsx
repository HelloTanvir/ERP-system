'use client';

import Input from '@/app/_components/Input';
import { DropdownSelectOption, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { TiDeleteOutline } from 'react-icons/ti';

interface Props {
    warehouseOptions: DropdownSelectOption[];
}

const getFieldRows = (warehouseOptions: DropdownSelectOption[]): InputField[][] => [
    [
        {
            label: 'Warehouse',
            name: 'warehouse',
            type: 'dropdown',
            placeholder: 'Select Warehouse to Store',
            options: warehouseOptions,
            required: true,
        },
        {
            label: 'Quantity on Warehouse',
            name: 'quantity',
            type: 'number',
            placeholder: 'Enter quantity on warehouse',
            required: true,
        },
    ],
];

function InventoryOnlyFields({ warehouseOptions }: Props) {
    const [checked, setChecked] = useState<boolean>(false);
    const [fieldRows, setFieldRows] = useState<InputField[][]>(getFieldRows(warehouseOptions));

    const handleAddMoreRow = () => {
        setFieldRows((prev) => [...prev, ...getFieldRows(warehouseOptions)]);
    };

    const handleRemoveRow = (rowIndex: number) => {
        setFieldRows((prev) => [...prev].filter((_, index) => index !== rowIndex));
    };

    return (
        <>
            <div className="col-span-2 flex items-center gap-2">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="font-medium text-gray-600" htmlFor="is_inventory_item">
                    Is the item an inventory item?
                </label>

                <input
                    id="is_inventory_item"
                    type="checkbox"
                    name="is_inventory_item"
                    required={false}
                    value={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
            </div>

            {checked && (
                <>
                    <div className="col-span-2">
                        <div className="w-1/2">
                            <Input
                                field={{
                                    label: 'Initial Quantity on Hand',
                                    name: 'quantity_on_warehouse',
                                    type: 'number',
                                    placeholder: 'Enter initial quantity',
                                    required: true,
                                }}
                                error=""
                            />
                        </div>
                    </div>

                    {fieldRows?.map((row, rowIndex) => (
                        <div className="col-span-2 flex gap-x-5 items-center">
                            {row?.map((field, fieldIndex) => (
                                <div className="flex-1">
                                    <Input
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={`inventory_only_field-${field.name}-${rowIndex}-${fieldIndex}`}
                                        field={field}
                                        error=""
                                    />
                                </div>
                            ))}

                            <button
                                type="button"
                                className="mt-5"
                                onClick={() => handleRemoveRow(rowIndex)}
                            >
                                <TiDeleteOutline size={24} color="#e95a5a" />
                            </button>
                        </div>
                    ))}

                    <div className="col-span-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 text-sm rounded-btn-radius px-2 py-1 border border-primary bg-primary bg-opacity-15 hover:bg-opacity-30 duration-75"
                            onClick={handleAddMoreRow}
                        >
                            <GoPlus /> Allocate more
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default InventoryOnlyFields;
