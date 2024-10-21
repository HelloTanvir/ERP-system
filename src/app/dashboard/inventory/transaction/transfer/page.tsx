import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '@/app/dashboard/_lib/actions';
import { Suspense } from 'react';
import { InventoryItem } from '../../inventory-item/_lib/utils';
import InventoryTransferForm from './_components/InventoryTransferForm';
import Report from './_components/Report';
import { getWarehouseDropdownOptions } from './_lib/actions';
import { getInputFields, IInventoryTransfer } from './_lib/utils';

export default async function InventoryTransfer() {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IInventoryTransfer>({
            endpoint: `${process.env.API_URL}/inventory/stock-transfer/`,
            revalidatePath: '/dashboard/inventory/transaction/transfer',
        });

    const { getItems: getInventoryItems } = await createGenericServerActions<InventoryItem>({
        endpoint: `${process.env.API_URL}/inventory/item/`,
        revalidatePath: '/dashboard/inventory/transaction/transfer',
    });

    const { results: inventoryTransferItems } = await getItems();
    const warehouseOptions = await getWarehouseDropdownOptions();
    const itemFields = getInputFields(warehouseOptions);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Inventory Transfer"
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
                    create: 'Inventory Items Transfer',
                    edit: 'Edit Inventory Items Transfer',
                }}
            />
        </Suspense>
    );
}
