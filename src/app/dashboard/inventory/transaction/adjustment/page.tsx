import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '@/app/dashboard/_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '@/app/dashboard/_lib/utils';
import { Suspense } from 'react';
import { InventoryItem } from '../../inventory-item/_lib/utils';
import InventoryAdjustmentForm from './_components/InventoryAdjustmentForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IInventoryAdjustment } from './_lib/utils';

export default async function InventoryAdjustment({
    searchParams,
}: {
    searchParams?: SearchParams;
}) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IInventoryAdjustment>({
            endpoint: `${process.env.API_URL}/inventory/stock-adjustment/`,
            revalidatePath: '/dashboard/inventory/transaction/adjustment',
        });

    const { getItems: getInventoryItems } = await createGenericServerActions<InventoryItem>({
        endpoint: `${process.env.API_URL}/inventory/item/`,
        revalidatePath: '/dashboard/inventory/transaction/adjustment',
    });

    const { results: inventoryAdjustmentItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const itemFields = getInputFields();
    const searchFields = getSearchFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Inventory Adjustment"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Voucher No.', 'Voucher Date', 'Type', 'Narration', 'Status'],
                    tableRows: inventoryAdjustmentItems.map((item) => [
                        item.voucher_no,
                        item.voucher_date,
                        item.type,
                        item.narration,
                        item.status,
                    ]),
                    items: inventoryAdjustmentItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: InventoryAdjustmentForm,
                    customItemFormProps: {
                        fields: itemFields,
                        getInventoryItems,
                    },
                }}
                modalTitles={{
                    create: 'Inventory Items Adjustment',
                    edit: 'Edit Inventory Items Adjustment',
                }}
            />
        </Suspense>
    );
}
