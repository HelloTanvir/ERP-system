import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import AdditionalActions from './_components/AdditionalActions';
import InventoryItemForm from './_components/InventoryItemForm';
import { getInventoryItemFormDropdownOptions } from './_lib/actions';
import { getInputFields, InventoryItem as IInventoryItem } from './_lib/utils';

export default async function InventoryItem() {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IInventoryItem>({
            endpoint: `${process.env.API_URL}/inventory/item/`,
            revalidatePath: '/dashboard/inventory/inventory-item',
        });

    const { results: inventoryItems } = await getItems();

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
                    <AdditionalActions categoryOptions={itemFormDropdownOptions.categoryOptions} />
                }
                items={inventoryItems}
                fields={[]}
                CustomItemForm={InventoryItemForm}
                customItemFormProps={{
                    fields: itemFields,
                    warehouseOptions: itemFormDropdownOptions.warehouseOptions,
                }}
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
