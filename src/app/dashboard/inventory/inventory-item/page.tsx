import Actions from './_components/Actions';
import ItemTable from './_components/ItemTable';
import { getInventoryItemFormDropdownOptions, getInventoryItems } from './_lib/actions';

export default async function InventoryItem() {
    const inventoryItems = await getInventoryItems();
    const itemFormDropdownOptions = await getInventoryItemFormDropdownOptions();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg ">
                <h3 className="text-2xl text-purple-700  font-semibold">Inventory Item</h3>
                <Actions itemFormDropdownOptions={itemFormDropdownOptions} />
            </div>

            <div className="overflow-x-auto">
                <ItemTable
                    inventoryItems={inventoryItems}
                    itemFormDropdownOptions={itemFormDropdownOptions}
                />
            </div>
        </div>
    );
}
