import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import InputProductionForm from './_components/InputProductionForm';

import Report from './_components/Report';
import { getInputFields, IInputProduction } from './_lib/utils';

export default async function InputProduction({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IInputProduction>({
            endpoint: `${process.env.API_URL}/injection/production/`,
            revalidatePath: '/dashboard/injection/input-production',
        });

    const { results: inputProductionItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Test', inputProductionItems);

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Input Production"
                tableConfig={{
                    tableColumns: ['Date', 'Mold Number', 'Voucher Number'],
                    tableRows: inputProductionItems.map((item) => [
                        item.voucher_date.split('T')[0],
                        item.mold_item_number,
                        item.voucher_no,
                    ]),
                    items: inputProductionItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: InputProductionForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                    maxWidth: 1300,
                }}
                modalTitles={{
                    create: 'Create Production',
                    edit: 'Edit Production',
                }}
            />
        </Suspense>
    );
}
