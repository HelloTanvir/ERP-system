import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import Report from './_components/Report';
import { getInputFields, IShift } from './_lib/utils';

export default async function Shift({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IShift>({
            endpoint: `${process.env.API_URL}/injection/machine/`,
            revalidatePath: '/dashboard/injection/shift',
        });

    const { results: shiftItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Test', shiftItems);

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Shift"
                tableConfig={{
                    tableColumns: ['Date', 'Voucher Ref', 'Shift Name', 'Shift Type'],
                    tableRows: shiftItems.map((item) => [
                        item.voucher_date,
                        item.serial_number,
                        'Atashur',
                        'Day',
                    ]),
                    items: shiftItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    fields: itemFields,
                }}
                modalTitles={{
                    create: 'Create Shift ',
                    edit: 'Edit Shift',
                }}
            />
        </Suspense>
    );
}
