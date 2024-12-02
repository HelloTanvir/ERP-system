import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import ReceiveInventoryWithoutBill from './_components/ReceiveInventoryWithoutBillForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IReceiveInventoryWithoutBill } from './_lib/utils';

export default async function MoldRegister({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IReceiveInventoryWithoutBill>({
            endpoint: `${process.env.API_URL}/finance/purchase/received/`,
            revalidatePath: '/dashboard/purchase/receive-inventory-without-bill',
        });

    const { results: purchaseReceivedItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Receive Inventory Without Bill"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Voucher Date', 'Voucher No', 'Accounts', 'Warehouse', 'Status'],
                    tableRows: purchaseReceivedItems.map((item) => [
                        item.voucher_date,
                        item.voucher_no,
                        '', // accounts is empty for now, as it is not yet implemented in the backend
                        '',
                        '', // status is empty for now, as it is not yet implemented in the backend
                    ]),
                    items: purchaseReceivedItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: ReceiveInventoryWithoutBill,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                    maxWidth: 1300,
                }}
                modalTitles={{
                    create: 'Receive Inventory Without Bill',
                    edit: 'Edit Receive Inventory Without Bill',
                }}
            />
        </Suspense>
    );
}
