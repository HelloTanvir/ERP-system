import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { getInputFields, MeasurementUnit } from './_lib/utils';

const { createItem, updateItem, deleteItem, getItems } =
    await createGenericServerActions<MeasurementUnit>({
        endpoint: `${process.env.API_URL}/inventory/measurement-unit/`,
        revalidatePath: '/dashboard/inventory/unit-of-measure',
    });

export default async function UnitOfMeasure() {
    const measurementUnitItems = await getItems();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Unit of Measure"
                width={700}
                tableColumns={['Unit Name', 'Symbol']}
                tableRows={measurementUnitItems.map((item) => [item.name, item.symbol])}
                items={measurementUnitItems}
                fields={itemFields}
                modalTitles={{
                    create: 'Create Unit of Measure',
                    edit: 'Edit Unit of Measure',
                }}
                createItem={createItem}
                updateItem={updateItem}
                deleteItem={deleteItem}
            />
        </Suspense>
    );
}
