import { formatDateTimestamp } from '@/app/_lib/utils';
import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import Report from './_components/Report';
import ShiftForm from './_components/ShiftForm';
import { getInputFields, IShift } from './_lib/utils';

export default async function Shift({ searchParams }: Readonly<{ searchParams?: SearchParams }>) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IShift>({
            endpoint: `${process.env.API_URL}/injection/working-shift/`,
            revalidatePath: '/dashboard/injection/shift',
        });

    const { results: shiftItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Working Shift"
                tableConfig={{
                    tableColumns: [
                        'Voucher No.',
                        'Voucher Date',
                        'Shift Name',
                        'Starting Time',
                        'Ending Time',
                        'Total Time (sec)',
                    ],
                    tableRows: shiftItems.map((item) => [
                        item.voucher_no,
                        formatDateTimestamp(item.voucher_date),
                        item.name,
                        item.start_time,
                        item.end_time,
                        item.total_time,
                    ]),
                    items: shiftItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: ShiftForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                }}
                modalTitles={{
                    create: 'Create Shift ',
                    edit: 'Edit Shift',
                }}
            />
        </Suspense>
    );
}
