'use client';

/* eslint-disable jsx-a11y/label-has-associated-control, react/no-array-index-key */

import { DropdownSelectOption } from '@/app/_lib/utils';
import { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { TiDeleteOutline } from 'react-icons/ti';
import { Allocation, InventoryItem } from '../_lib/utils';

interface Props {
    warehouseOptions: DropdownSelectOption[];
    selectedItem?: InventoryItem | null;
    errors?: Record<string, string> | null;
}

function InventoryOnlyFields({ warehouseOptions, selectedItem, errors }: Readonly<Props>) {
    const [isInventoryItem, setIsInventoryItem] = useState(false);
    const [initialQuantity, setInitialQuantity] = useState(
        selectedItem?.quantity_on_warehouse || 0
    );
    const [allocations, setAllocations] = useState<Allocation[]>(
        selectedItem?.allocations?.length
            ? selectedItem?.allocations
            : [
                  {
                      warehouse: {
                          id: 0,
                          name: '',
                      },
                      quantity: 0,
                  },
              ]
    );

    useEffect(() => {
        if (selectedItem?.allocations?.length) {
            setIsInventoryItem(true);
            setInitialQuantity(selectedItem.quantity_on_warehouse);
            setAllocations(selectedItem.allocations);
        }

        return () => {
            setIsInventoryItem(false);
            setInitialQuantity(0);
            setAllocations([
                {
                    warehouse: {
                        id: 0,
                        name: '',
                    },
                    quantity: 0,
                },
            ]);
        };
    }, [selectedItem]);

    const handleAddAllocation = () => {
        setAllocations([
            ...allocations,
            {
                warehouse: {
                    id: 0,
                    name: '',
                },
                quantity: 0,
            },
        ]);
    };

    const handleRemoveAllocation = (index: number) => {
        const newAllocations = allocations.filter((_, i) => i !== index);
        setAllocations(newAllocations);
    };

    const handleAllocationChange = (index: number, field: keyof Allocation, value: number) => {
        const newAllocations = [...allocations];

        if (field === 'warehouse') {
            const warehouse = warehouseOptions.find(
                (option) => option.value?.toString() === value?.toString()
            )!;
            newAllocations[index][field] = {
                id: parseInt(warehouse.value, 10),
                name: warehouse.label,
            };
        } else {
            newAllocations[index][field] = value;
        }

        setAllocations(newAllocations);
    };

    return (
        <>
            <div className="col-span-2 flex items-center gap-2">
                <label className="font-medium text-gray-600" htmlFor="is_inventory_item">
                    Is the item an inventory item?
                </label>

                <input
                    id="is_inventory_item"
                    type="checkbox"
                    name="is_inventory_item"
                    required={false}
                    checked={isInventoryItem}
                    onChange={(e) => setIsInventoryItem(e.target.checked)}
                />
            </div>

            {isInventoryItem && (
                <>
                    <div className="col-span-2">
                        <div className="w-1/2">
                            <label
                                className="font-medium text-gray-600"
                                htmlFor="quantity_on_warehouse"
                            >
                                Initial Quantity on Hand
                            </label>

                            <input
                                id="quantity_on_warehouse"
                                placeholder="Enter initial quantity"
                                type="number"
                                name="quantity_on_warehouse"
                                required
                                value={initialQuantity}
                                onChange={(e) => setInitialQuantity(Number(e.target.value))}
                                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                            />

                            {errors?.allocations && (
                                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">
                                    {errors.allocations}
                                </p>
                            )}
                        </div>
                    </div>

                    {allocations.map((allocation, index) => (
                        <div
                            key={`inventory_only_field-allocations-${index}`}
                            className="col-span-2 flex gap-x-5 items-center"
                        >
                            <div className="flex-1">
                                <label
                                    className="font-medium text-gray-600"
                                    htmlFor={`warehouse-${index}`}
                                >
                                    Warehouse
                                </label>

                                <select
                                    id={`warehouse-${index}`}
                                    name="warehouse"
                                    value={allocation.warehouse?.id}
                                    onChange={(e) =>
                                        handleAllocationChange(
                                            index,
                                            'warehouse',
                                            Number(e.target.value)
                                        )
                                    }
                                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                >
                                    <option value="">Select a warehouse</option>
                                    {warehouseOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label
                                    htmlFor={`quantity-${index}`}
                                    className="font-medium text-gray-600"
                                >
                                    Quantity on Warehouse
                                </label>
                                <input
                                    type="number"
                                    id={`quantity-${index}`}
                                    name="quantity"
                                    value={allocation.quantity}
                                    onChange={(e) =>
                                        handleAllocationChange(
                                            index,
                                            'quantity',
                                            Number(e.target.value)
                                        )
                                    }
                                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                />
                            </div>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAllocation(index)}
                                    className="mt-5 mr-1 p-1 rounded-btn backdrop-blur-sm bg-black/10 hover:bg-black/30 duration-75"
                                >
                                    <TiDeleteOutline size={18} color="#e95a5a" />
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddAllocation}
                        className="w-max flex items-center gap-2 text-sm rounded-btn-radius px-2 py-1 border border-principal bg-principal bg-opacity-15 hover:bg-opacity-30 duration-75"
                    >
                        <GoPlus /> Allocate more
                    </button>
                </>
            )}
        </>
    );
}

export default InventoryOnlyFields;
