import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import { getInputFields, getSearchFields, IService } from './_lib/utils';

export default async function Service({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IService>({
            endpoint: `${process.env.API_URL}/inventory/service/`,
            revalidatePath: '/dashboard/inventory/service',
        });

    const { results: serviceItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const itemFields = getInputFields();
    const searchFields = getSearchFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Services"
                width={700}
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Name', 'Description'],
                    tableRows: serviceItems.map((item) => [item.name, item.description]),
                    items: serviceItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    fields: itemFields,
                }}
                modalTitles={{
                    create: 'Create service',
                    edit: 'Edit service',
                }}
            />
        </Suspense>
    );
}
