import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import PurchaseJournalForm from './_components/PurchaseJournalForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IPurchaseJournal } from './_lib/utils';

export default async function PurchaseOrder({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IPurchaseJournal>({
            endpoint: `${process.env.API_URL}/finance/purchase/received/`,
            revalidatePath: '/dashboard/purchase/purchase-journal',
        });

    const { results: purchaseJournalItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Journal Data:', purchaseJournalItems);
    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Purchase Journal"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Accounts', 'Voucher No', 'Warehouse', 'Status'],
                    tableRows: purchaseJournalItems.map((item) => [
                        item.voucher_date || '',
                        '',
                        item.voucher_no || '',
                        item.delivery_deadline || '',
                        '',
                    ]),
                    items: purchaseJournalItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: PurchaseJournalForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                    maxWidth: 1300,
                }}
                modalTitles={{
                    create: 'Purchase Journal',
                    edit: 'Edit  Purchase Journal Item',
                }}
            />
        </Suspense>
    );
}
