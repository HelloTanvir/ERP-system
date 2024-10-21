import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '@/app/dashboard/_lib/actions';
import { SearchParams } from '@/app/dashboard/_lib/utils';
import { Suspense } from 'react';
import { InventoryItem } from '../../inventory-item/_lib/utils';
import InventoryTransferForm from '../transfer/_components/InventoryTransferForm';
import Report from '../transfer/_components/Report';
import { getWarehouseDropdownOptions } from '../transfer/_lib/actions';
import { getInputFields, MManufacturingJournal } from './_lib/utils';

export default async function InventoryTransfer({ searchParams }: { searchParams?: SearchParams }) {
    const currentPage = Number(searchParams?.page) || 1;

    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<MManufacturingJournal>({
            endpoint: `${process.env.API_URL}/inventory/stock-transfer/`,
            revalidatePath: '/dashboard/inventory/transaction/transfer',
        });

    const { getItems: getInventoryItems } = await createGenericServerActions<InventoryItem>({
        endpoint: `${process.env.API_URL}/inventory/item/`,
        revalidatePath: '/dashboard/inventory/transaction/transfer',
    });

    // const { results: manufacturingJournalItems, count } = await getItems({
    //     page: currentPage,
    //     records: ITEMS_PER_PAGE,
    // });
    const count = 10;

    // dummy info
    const manufacturingJournalItems = [
        {
            date: '20-09-24',
            accounts: 'Muhammad',
            description: 'Nice phone',
            amount: 2000,
            status: 'available',
        },
        {
            date: '28-12-24',
            accounts: 'Tanvir',
            description: 'Awesome I phone',
            amount: 5000,
            status: 'unavailable',
        },
    ];
    const warehouseOptions = await getWarehouseDropdownOptions();
    const itemFields = getInputFields(warehouseOptions);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Manufacturing Journal"
                tableConfig={{
                    tableColumns: ['Date', 'Accounts', 'Description', 'Amount', 'Status'],
                    tableRows: manufacturingJournalItems.map((item) => [
                        item.date,
                        item.accounts,
                        item.description,
                        item.amount,
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
