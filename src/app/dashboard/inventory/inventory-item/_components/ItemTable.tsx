import { InventoryCreationDropdownOptions, InventoryItem } from '../_lib/utils';
import TableActions from './TableActions';

interface Props {
    inventoryItems: InventoryItem[];
    itemFormDropdownOptions: InventoryCreationDropdownOptions;
}

const columns = ['Name', 'Units left', 'Code/SKU', 'Description', 'Active/Inactive'];

async function ItemTable({ inventoryItems, itemFormDropdownOptions }: Readonly<Props>) {
    return (
        <table className="table border-collapse w-full">
            <thead>
                <tr className="text-purple-700">
                    {columns.map((column, index) => (
                        <th
                            key={column}
                            className={`border border-t-0  border-gray-300 ${index === 0 ? 'border-l-0' : ''}`}
                        >
                            {column}
                        </th>
                    ))}

                    <th className="border border-t-0 border-r-0  border-gray-300 text-right pr-8">
                        Action
                    </th>
                </tr>
            </thead>

            <tbody>
                {inventoryItems.map((item) => (
                    <tr key={item.id}>
                        {[
                            item.name,
                            item.quantity_on_warehouse,
                            item.code,
                            item.description,
                            item.quantity_on_warehouse > 0 ? 'True' : 'False',
                        ].map((itemProperty) => (
                            <td key={itemProperty} className="border border-gray-300 border-l-0">
                                {itemProperty}
                            </td>
                        ))}

                        <td className="border border-r-0 border-gray-300">
                            <TableActions item={item} dropdownOptions={itemFormDropdownOptions} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ItemTable;
