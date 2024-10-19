import { createGenericServerActions } from '../../_lib/actions';
import { InventoryItem } from '../inventory-item/_lib/utils';
import TableWrapper from './_components/TableWrapper';
import { getInputFields, IWarehouse } from './_lib/utils';

export default async function Warehouse() {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IWarehouse>({
            endpoint: `${process.env.API_URL}/inventory/warehouse/`,
            revalidatePath: '/dashboard/inventory/warehouse',
        });

    const { getItems: getInventoryItems } = await createGenericServerActions<InventoryItem>({
        endpoint: `${process.env.API_URL}/inventory/item/`,
        revalidatePath: '/dashboard/inventory/warehouse',
    });

    const { results: warehouseItems } = await getItems();
    const itemFields = getInputFields();

    return (
        <TableWrapper
            warehouseItems={warehouseItems}
            itemFields={itemFields}
            createItem={createItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
            getInventoryItems={getInventoryItems}
        />
    );
}
