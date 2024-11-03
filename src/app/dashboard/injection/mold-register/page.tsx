import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import MoldRegisterForm from './_components/MoldRegisterForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IMoldRegister } from './_lib/utils';

export default async function MoldRegister({ searchParams }: { searchParams?: SearchParams }) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IMoldRegister>({
            endpoint: `${process.env.API_URL}/injection/mold-registration/`,
            revalidatePath: '/dashboard/injection/mold-register',
        });

    const { results: moldRegisterItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Test', moldRegisterItems);
    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Mold Register"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: [
                        'Date',
                        'Mold Name',
                        'Mold Number ',
                        'Hourly Production',
                        'Status',
                    ],
                    tableRows: moldRegisterItems.map((item) => [
                        '',
                        item.name,
                        item.number,
                        item.hourly_production_rate,
                        item.cavity.map((cavity) => cavity.status),
                    ]),
                    items: moldRegisterItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: MoldRegisterForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                    maxWidth: 1200,
                }}
                modalTitles={{
                    create: 'Mold Register',
                    edit: 'Edit Mold Register Items',
                }}
            />
        </Suspense>
    );
}
