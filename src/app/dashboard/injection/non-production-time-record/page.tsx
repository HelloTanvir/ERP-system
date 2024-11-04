import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import NonProductionTimeRecordForm from './_components/NonProductionTimeRecordForm';

import Report from './_components/Report';
import { getInputFields, INonProductionTimeRecord } from './_lib/utils';

export default async function MoldRegister({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<INonProductionTimeRecord>({
            endpoint: `${process.env.API_URL}/injection/downtime/`,
            revalidatePath: '/dashboard/injection/non-production-time-record',
        });

    const { results: nonProductionItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Test', nonProductionItems);

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle=" Non Production Time Record"
                tableConfig={{
                    tableColumns: ['Date', 'Machine', 'Voucher Number'],
                    tableRows: nonProductionItems.map((item) => [
                        item.created_at.split('T')[0],
                        item.machine.length,
                        'Voucher No',
                    ]),
                    items: nonProductionItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: NonProductionTimeRecordForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                }}
                modalTitles={{
                    create: 'Create NPTR ',
                    edit: 'Edit NPTR',
                }}
            />
        </Suspense>
    );
}
