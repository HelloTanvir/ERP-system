import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import MoldTimeSheetForm from './_components/MoldTimeSheetForm';
import Report from './_components/Report.tsx';
import { getInputFields, getSearchFields, IMoldTimeSheet } from './_lib/utils';

export default async function MoldTimeSheet({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IMoldTimeSheet>({
            endpoint: `${process.env.API_URL}/injection/mold-registration/`,
            revalidatePath: '/dashboard/injection/mold-time-sheet',
        });

    const { results: moldTimeSheetItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log(moldTimeSheetItems);
    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Mold Time Sheet"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Mold Name', 'Mold Number ', 'Status'],
                    tableRows: moldTimeSheetItems.map((item) => [
                        item.id,
                        item.name,
                        item.number,
                        item.average_cycle_time,
                    ]),
                    items: moldTimeSheetItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: MoldTimeSheetForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                }}
                modalTitles={{
                    create: 'Mold Time Sheet',
                    edit: 'Edit Mold Time Sheet',
                }}
            />
        </Suspense>
    );
}
