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

    console.log('Test', purchaseRequisitionItems);
    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    console.log(itemFields);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Purchase Requisition"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Accounts', 'Voucher No', 'Warehouse', 'Status'],
                    tableRows: purchaseRequisitionItems.map((item) => [
                        '',
                        item.name,
                        item.number,
                        item.voucher_no,
                        item.cavity.map((cavity) => cavity.status),
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
