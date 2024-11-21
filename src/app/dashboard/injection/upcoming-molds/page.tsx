import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import MoldTimeSheetForm from '../mold-time-sheet/_components/MoldTimeSheetForm';
import Report from '../mold-time-sheet/_components/Report';
import { getInputFields, IMoldTimeSheet } from '../mold-time-sheet/_lib/utils';

export default async function MoldTimeSheet({
    searchParams,
}: Readonly<{ searchParams?: SearchParams }>) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IMoldTimeSheet>({
            endpoint: `${process.env.API_URL}/injection/mold-timesheet/?status=upcoming`,
            revalidatePath: '/dashboard/injection/upcoming-molds',
        });

    const { results: moldTimeSheetItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log(moldTimeSheetItems);
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Upcoming Molds"
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
                        status: 'upcoming',
                    },
                }}
                modalTitles={{
                    create: 'Create Upcoming Mold',
                    edit: 'Edit Upcoming Mold',
                }}
            />
        </Suspense>
    );
}
