import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { getUnitOfMeasureDropdownOptions } from './_lib/actions';
import { getInputFields, IService } from './_lib/utils';

const { createItem, updateItem, deleteItem, getItems } = await createGenericServerActions<IService>(
    {
        endpoint: `${process.env.API_URL}/inventory/service/`,
        revalidatePath: '/dashboard/inventory/service',
    }
);

export default async function Service() {
    const serviceItems = await getItems();

    const unitOfMeasureDropdownOptions = await getUnitOfMeasureDropdownOptions();
    const itemFields = getInputFields(unitOfMeasureDropdownOptions);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Services"
                width={700}
                tableColumns={['Name', 'Description']}
                tableRows={serviceItems.map((item) => [item.name, item.description])}
                items={serviceItems}
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
