import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import Report from './_components/Report.tsx';
import { getInputFields, getSearchFields, IMachine } from './_lib/utils';

export default async function Machine({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IMachine>({
            endpoint: `${process.env.API_URL}/injection/machine/`,
            revalidatePath: '/dashboard/injection/machine',
        });

    const { results: machineItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Machine"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Machine Number', 'Machine Name ', 'Amount', 'Status'],
                    tableRows: machineItems.map((item) => [
                        item.voucher_date,
                        item.number,
                        item.name,
                        item.purchase_cost,
                        item.is_active > 0 ? (
                            <span className="text-[#038F65]">Active</span>
                        ) : (
                            <span className="text-[#E9000E]">Inactive</span>
                        ),
                    ]),
                    items: machineItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    fields: itemFields,
                    maxWidth: 1200,
                }}
                modalTitles={{
                    create: 'Create a new Machine',
                    edit: 'Edit Machine',
                }}
            />
        </Suspense>
    );
}
