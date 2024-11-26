import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import Report from '../purchase-requisition/_components/Report';
import PurchaseOrderForm from './_components/PurchaseOrderForm';
import { getInputFields, getSearchFields, IPurchaseOrder } from './_lib/utils';

export default async function PurchaseOrder({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IPurchaseOrder>({
            endpoint: `${process.env.API_URL}/finance/purchase/requisition/`,
            revalidatePath: '/dashboard/purchase/purchase-requisition',
        });

    const { results: purchaseOrderItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Test', purchaseOrderItems);
    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Purchase Order"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Accounts', 'Voucher No', 'Warehouse', 'Status'],
                    tableRows: purchaseOrderItems.map((item) => [
                        '',
                        item.name,
                        item.number,
                        item.voucher_no,
                        item.cavity.map((cavity) => cavity.status),
                    ]),
                    items: purchaseOrderItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: PurchaseOrderForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                    maxWidth: 1300,
                }}
                modalTitles={{
                    create: 'Purchase Order',
                    edit: 'Edit  Purchase Order Item',
                }}
            />
        </Suspense>
    );
}
