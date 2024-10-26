import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import UnitOfMeasureForm from './_components/UnitOfMeasureForm';
import { getInputFields, getSearchFields, MeasurementUnit } from './_lib/utils';

export default async function UnitOfMeasure({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<MeasurementUnit>({
            endpoint: `${process.env.API_URL}/inventory/measurement-unit/`,
            revalidatePath: '/dashboard/inventory/unit-of-measure',
        });

    const { results: measurementUnitItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const itemFields = getInputFields();
    const searchFields = getSearchFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Unit of Measure"
                width={700}
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Unit Name', 'Symbol'],
                    tableRows: measurementUnitItems.map((item) => [item.name, item.symbol]),
                    items: measurementUnitItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    CustomItemForm: UnitOfMeasureForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                }}
                modalTitles={{
                    create: 'Create Unit of Measure',
                    edit: 'Edit Unit of Measure',
                }}
            />
        </Suspense>
    );
}
