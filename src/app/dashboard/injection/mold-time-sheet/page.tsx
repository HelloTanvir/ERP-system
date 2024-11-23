import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import MoldTimeSheetForm from './_components/MoldTimeSheetForm';
import Report from './_components/Report';
import { getInputFields, IMoldTimeSheet } from './_lib/utils';

export default async function MoldTimeSheet({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IMoldTimeSheet>({
            endpoint: `${process.env.API_URL}/injection/mold-timesheet/`,
            revalidatePath: '/dashboard/injection/mold-time-sheet',
        });

    const { results: moldTimeSheetItems, count } = await getItems({
        ...searchParams,
        status: 'running',
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log(moldTimeSheetItems);
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Mold Time Sheet"
                tableConfig={{
                    tableColumns: ['Production From', 'Production To', 'Mold Name', 'Mold Number '],
                    tableRows: moldTimeSheetItems.map((item) => [
                        item.production_from.split('T')[0],
                        item.production_end.split('T')[0],
                        item.mold_name,
                        item.mold_item_number,
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
                        status: 'running',
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
