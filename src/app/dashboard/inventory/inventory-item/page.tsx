import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import AdditionalActions from './_components/AdditionalActions';
import { getInventoryItemFormDropdownOptions } from './_lib/actions';
import { getInputFields, InventoryItem } from './_lib/utils';

const { createItem, updateItem, deleteItem, getItems } =
    await createGenericServerActions<InventoryItem>({
        endpoint: `${process.env.API_URL}/inventory/item/`,
        revalidatePath: '/dashboard/inventory/inventory-item',
    });

export default async function InventoryItem() {
    const inventoryItems = await getItems();
    const itemFormDropdownOptions = await getInventoryItemFormDropdownOptions();
    const itemFields = getInputFields(itemFormDropdownOptions);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Inventory Item"
                tableColumns={['Name', 'Units left', 'Code/SKU', 'Description', 'Active/Inactive']}
                tableRows={inventoryItems.map((item) => [
                    item.name,
                    item.quantity_on_warehouse,
                    item.code,
                    item.description,
                    item.quantity_on_warehouse > 0 ? (
                        <span className="text-[#038F65]">True</span>
                    ) : (
                        <span className="text-[#E9000E]">False</span>
                    ),
                ])}
                additionalActions={
                    <AdditionalActions categoryOptions={itemFormDropdownOptions?.categoryOptions} />
                }
                items={inventoryItems}
                fields={itemFields}
                modalTitles={{
                    create: 'Create Inventory or Non Inventory Item',
                    edit: 'Edit Inventory or Non Inventory Item',
                }}
                createItem={createItem}
                updateItem={updateItem}
                deleteItem={deleteItem}
            />
        </Suspense>
    );
}
