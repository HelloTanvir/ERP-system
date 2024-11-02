import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '@/app/dashboard/_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '@/app/dashboard/_lib/utils';
import { Suspense } from 'react';
import InventoryTransferForm from './_components/InventoryTransferForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IInventoryTransfer } from './_lib/utils';

export default async function InventoryTransfer({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IInventoryTransfer>({
            endpoint: `${process.env.API_URL}/inventory/stock-transfer/`,
            revalidatePath: '/dashboard/inventory/transaction/transfer',
        });

    const { results: inventoryTransferItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const itemFields = getInputFields();
    const searchFields = getSearchFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Inventory Transfer"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: [
                        'Voucher No.',
                        'Voucher Date',
                        'Total Value',
                        'Narration',
                        'Status',
                    ],
                    tableRows: inventoryTransferItems.map((item) => [
                        item.voucher_no,
                        item.voucher_date,
                        item.total_value,
                        item.narration,
                        item.status,
                    ]),
                    items: inventoryTransferItems,
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
                    },
                }}
                modalTitles={{
                    create: 'Inventory Items Transfer',
                    edit: 'Edit Inventory Items Transfer',
                }}
            />
        </Suspense>
    );
}
