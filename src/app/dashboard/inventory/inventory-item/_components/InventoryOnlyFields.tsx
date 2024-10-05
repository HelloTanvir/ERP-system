'use client';

import Input from '@/app/_components/Input';
import { DropdownSelectOption, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';

interface Props {
    warehouseOptions: DropdownSelectOption[];
}

const getFields = (warehouseOptions: DropdownSelectOption[]) => [
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
];

function InventoryOnlyFields({ warehouseOptions }: Props) {
    const [checked, setChecked] = useState<boolean>(false);
    const [fields, setFields] = useState<InputField[]>(getFields(warehouseOptions));

    const handleAddMoreFields = () => {
        setFields((prev) => [...prev, ...getFields(warehouseOptions)]);
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

                    {fields.map((field, index) => (
                        <Input
                            // eslint-disable-next-line react/no-array-index-key
                            key={`inventory_only_field-${field.name}-${index}`}
                            field={field}
                            error=""
                        />
                    ))}

                    <div className="col-span-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 text-sm rounded-btn-radius px-2 py-1 border border-primary bg-primary bg-opacity-15 hover:bg-opacity-30 duration-75"
                            onClick={handleAddMoreFields}
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
