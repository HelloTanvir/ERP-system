import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { getInputFields, IWarehouse } from './_lib/utils';

const { createItem, updateItem, deleteItem, getItems } =
    await createGenericServerActions<IWarehouse>({
        endpoint: `${process.env.API_URL}/inventory/warehouse/`,
        revalidatePath: '/dashboard/inventory/warehouse',
    });

export default async function Warehouse() {
    const warehouseItems = await getItems();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Warehouse"
                width={700}
                tableColumns={['Name', 'Location', 'Description']}
                tableRows={warehouseItems.map((item) => [
                    item.name,
                    item.location,
                    item.description,
                ])}
                items={warehouseItems}
                fields={itemFields}
                modalTitles={{
                    create: 'Create service',
                    edit: 'Edit service',
                }}
                createItem={createItem}
                updateItem={updateItem}
                deleteItem={deleteItem}
            />
        </Suspense>
    );
}
