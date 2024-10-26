import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '@/app/dashboard/_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '@/app/dashboard/_lib/utils';
import { Suspense } from 'react';
import { InventoryItem } from '../../inventory-item/_lib/utils';
import InventoryTransferForm from '../transfer/_components/InventoryTransferForm';
import Report from '../transfer/_components/Report';
import { getInputFields, getSearchFields, MManufacturingJournal } from './_lib/utils';

export default async function ManufacturingJournal({
    searchParams,
}: {
    searchParams?: SearchParams;
}) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<MManufacturingJournal>({
            endpoint: `${process.env.API_URL}/manufacturing/manufacture/`,
            revalidatePath: '/dashboard/inventory/transaction/manufacturing-journal',
        });

    const { getItems: getInventoryItems } = await createGenericServerActions<InventoryItem>({
        endpoint: `${process.env.API_URL}/inventory/item/`,
        revalidatePath: '/dashboard/inventory/transaction/manufacturing-journal',
    });

    const { results: manufacturingJournalItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log(manufacturingJournalItems);

    const itemFields = getInputFields();
    const searchFields = getSearchFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Manufacturing Journal"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Accounts', 'Description', 'Amount', 'Status'],
                    tableRows: manufacturingJournalItems.map((item) => [
                        item.voucher_date,
                        '',
                        item.narration,
                        item.total_value,
                        item.status,
                    ]),
                    items: manufacturingJournalItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: InventoryTransferForm,
                    customItemFormProps: {
                        fields: itemFields,
                        getInventoryItems,
                    },
                }}
                modalTitles={{
                    create: 'Create Journal',
                    edit: 'Edit Manufacturing Journal Item',
                }}
            />
        </Suspense>
    );
}
