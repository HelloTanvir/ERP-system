import Input from '@/app/_components/Input';
import { ChangeEvent, useState } from 'react';
import { InventoryItem } from '../../../inventory-item/_lib/utils';

interface Props {
    inventoryItems: InventoryItem[];
}

const columnNames = ['', 'Name', 'Source Warehouse', 'Quantity', 'Rate/Unit', 'Amount'];

function InventoryItemsSelect({ inventoryItems }: Props) {
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

    const handleItemSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const itemId = parseInt(value, 10);

        if (selectedItemIds.includes(itemId)) {
            setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
        } else {
            setSelectedItemIds([...selectedItemIds, itemId]);
        }
    };

    return (
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
                            <input
                                id={`item_id-${item.id}`}
                                type="checkbox"
                                name="item_id"
                                value={item.id}
                                onChange={handleItemSelect}
                                className="placeholder-gray-400 focus:outline-none rounded-input-radius text-black autofill:text-black"
                            />
                        </td>

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
                                    disabled: !selectedItemIds.includes(item.id),
                                }}
                                error=""
                            />
                        </td>

                        <td className="border border-gray-300 border-l-0">
                            <Input
                                field={{
                                    type: 'number',
                                    label: '',
                                    name: 'item_quantity',
                                    placeholder: item.quantity_on_warehouse?.toString(),
                                    disabled: !selectedItemIds.includes(item.id),
                                }}
                                error=""
                            />
                        </td>

                        <td className="border border-gray-300 border-l-0">
                            {item.initial_item_cost}
                        </td>

                        <td className="border border-gray-300 border-l-0 border-r-0">
                            {item.initial_total_cost}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InventoryItemsSelect;
