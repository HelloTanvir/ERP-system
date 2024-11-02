'use client';

import Input from '@/app/_components/Input';
import { getPromiseOptionsForDropdown } from '@/app/_lib/actions';
import { InputField } from '@/app/_lib/utils';
import { useCallback, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import AsyncSelect from 'react-select/async';
import { InventoryItem } from '../../inventory-item/_lib/utils';
import { getInventoryItem } from '../_lib/actions';

const columnNames = ['Name', 'Source Warehouse', 'Quantity', 'Rate/Unit', 'Amount', '']; // last column is for remove button

interface Props {
    title?: string;
}

function InventoryItemsSelect({ title = 'Select Inventory Item' }: Props) {
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

    const handleItemSelect = useCallback(async (itemId?: number) => {
        const item = await getInventoryItem(itemId);

        if (item) {
            setInventoryItems((prevItems) => {
                const newItems = [...prevItems];
                const itemIndex = newItems.findIndex((i) => i.id === item.id);

                if (itemIndex === -1) {
                    newItems.push(item);
                }

                return newItems;
            });
        }
    }, []);

    const handleQuantityChange = useCallback((itemId: number, quantity: number) => {
        setInventoryItems((prevItems) => {
            const newItems = [...prevItems];
            const itemIndex = newItems.findIndex((i) => i.id === itemId);

            if (itemIndex !== -1) {
                newItems[itemIndex].initial_total_cost =
                    quantity * newItems[itemIndex].initial_item_cost;
            }

            return newItems;
        });
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <span className="text-gray-600 -mb-1">{title}</span>
            <AsyncSelect
                className="w-[300px]"
                cacheOptions
                defaultOptions
                loadOptions={(inputValue) =>
                    getPromiseOptionsForDropdown(inputValue, {
                        optionsGetUrl: 'inventory/item-name/',
                        optionsFilterQuery: 'name__icontains',
                    } as InputField)
                }
                onChange={(e) => {
                    if (e?.value) handleItemSelect(Number(e.value));
                }}
            />

            <table className="table border-collapse w-full">
                <thead>
                    <tr className="text-purple-700">
                        {columnNames.map((column, index) => (
                            <th
                                key={column}
                                className={`border border-t-0  border-gray-300 ${index === 0 ? 'border-l-0' : ''} ${index === columnNames.length - 1 ? 'border-r-0' : ''}`}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {inventoryItems.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 border-l-0">
                                <p className="font-medium text-gray-600 text-sm">{item.name}</p>
                            </td>

                            <td className="border border-gray-300 border-l-0">
                                <Input
                                    field={{
                                        label: '',
                                        placeholder: '',
                                        type: 'dropdown',
                                        name: 'item_source_warehouse',
                                        options: (item.allocations || []).map((allocation) => ({
                                            label: allocation.warehouse.name,
                                            value: allocation.warehouse.id?.toString(),
                                        })),
                                    }}
                                    error=""
                                />
                            </td>

                            <td className="border border-gray-300 border-l-0">
                                <div>
                                    <input
                                        type="number"
                                        name="item_quantity"
                                        required
                                        defaultValue={item.quantity_on_warehouse}
                                        onChange={(e) =>
                                            handleQuantityChange(item.id, Number(e.target.value))
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </div>
                            </td>

                            <td className="border border-gray-300 border-l-0">
                                {item.initial_item_cost}
                            </td>

                            <td className="border border-gray-300 border-l-0">
                                {item.initial_total_cost}
                            </td>

                            <td className="border border-gray-300 border-l-0 border-r-0">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setInventoryItems((prevItems) =>
                                            prevItems.filter((i) => i.id !== item.id)
                                        )
                                    }
                                    className="p-1 rounded-btn backdrop-blur-sm bg-black/10 hover:bg-black/30 duration-75"
                                >
                                    <TiDeleteOutline size={18} color="#e95a5a" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryItemsSelect;
