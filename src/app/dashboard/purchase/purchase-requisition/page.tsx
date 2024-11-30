import { formatDateTimestamp } from '@/app/_lib/utils';
import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import PurchaseRequisitionForm from './_components/PurchaseRequisitionForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IPurchaseRequisition } from './_lib/utils';

export default async function MoldRegister({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IPurchaseRequisition>({
            endpoint: `${process.env.API_URL}/finance/purchase/requisition/`,
            revalidatePath: '/dashboard/purchase/purchase-requisition',
        });

    const { results: purchaseRequisitionItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    console.log(purchaseRequisitionItems);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Purchase Requisition"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: [
                        'Voucher No',
                        'Voucher Date',
                        'Accounts',
                        'Delivery Deadline',
                        'Status',
                    ],
                    tableRows: purchaseRequisitionItems.map((item) => [
                        item.voucher_no,
                        item.voucher_date,
                        '', // accounts is empty for now, as it is not yet implemented in the backend
                        formatDateTimestamp(item.delivery_deadline),
                        '', // status is empty for now, as it is not yet implemented in the backend
                    ]),
                    items: purchaseRequisitionItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: PurchaseRequisitionForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                    maxWidth: 1300,
                }}
                modalTitles={{
                    create: 'Purchase Requisition',
                    edit: 'Edit  Purchase Requisition Item',
                }}
            />
        </Suspense>
    );
}
