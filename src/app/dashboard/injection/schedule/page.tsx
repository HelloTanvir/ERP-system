import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import Report from './_components/Report';
import ScheduleForm from './_components/ScheduleForm';
import { getInputFields, ISchedule } from './_lib/utils';

export default async function Schedule({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<ISchedule>({
            endpoint: `${process.env.API_URL}/injection/downtime/`,
            revalidatePath: '/dashboard/injection/schedule',
        });

    const { results: scheduleItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Test', scheduleItems);

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Schedule"
                tableConfig={{
                    tableColumns: ['Date', 'Mold Name', 'Mold Number', 'Status'],
                    tableRows: scheduleItems.map((item) => [
                        item.created_at.split('T')[0],
                        item.machine.length,
                        '',
                        'Voucher No',
                    ]),
                    items: scheduleItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: ScheduleForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                }}
                modalTitles={{
                    create: 'Create Schedule',
                    edit: 'Edit Schedule',
                }}
            />
        </Suspense>
    );
}
