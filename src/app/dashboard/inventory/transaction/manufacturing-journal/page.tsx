import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '@/app/dashboard/_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '@/app/dashboard/_lib/utils';
import { Suspense } from 'react';
import Report from '../transfer/_components/Report';
import ManufacturingJournalForm from './_components/ManufacturingJournalForm';
import {
    getBillOfMaterialInputFields,
    getManufacturingTemplateInputFields,
    getSearchFields,
    IManufacturingJournal,
} from './_lib/utils';

export default async function ManufacturingJournal({
    searchParams,
}: Readonly<{
    searchParams?: SearchParams;
}>) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IManufacturingJournal>({
            endpoint: `${process.env.API_URL}/manufacturing/manufacture/`,
            revalidatePath: '/dashboard/inventory/transaction/manufacturing-journal',
        });

    const { results: manufacturingJournalItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page ?? '1',
        records: ITEMS_PER_PAGE,
    });

    const manufacturingTemplateFields = getManufacturingTemplateInputFields();
    const billOfMaterialFields = getBillOfMaterialInputFields();
    const searchFields = getSearchFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Manufacturing Journal"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: ['Date', 'Accounts', 'Narration', 'Amount', 'Status'],
                    tableRows: manufacturingJournalItems.map((item) => [
                        item.voucher_date,
                        '', // TODO: Add accounts later
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
                    CustomItemForm: ManufacturingJournalForm,
                    customItemFormProps: {
                        manufacturingTemplateFields,
                        billOfMaterialFields,
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
