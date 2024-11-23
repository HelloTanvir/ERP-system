import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import { getInputFields, IColor } from './_lib/utils';

export default async function InputProduction({
    searchParams,
}: Readonly<{ searchParams?: SearchParams }>) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IColor>({
            endpoint: `${process.env.API_URL}/injection/color/`,
            revalidatePath: '/dashboard/injection/color',
        });

    const { results: colors, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Color"
                tableConfig={{
                    tableColumns: ['Id', 'Barcode', 'Color Name', 'Code'],
                    tableRows: colors.map((item) => [item.id, item.barcode, item.name, item.code]),
                    items: colors,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    fields: itemFields,
                    // maxWidth: 1300,
                }}
                modalTitles={{
                    create: 'Create Color',
                    edit: 'Edit Color',
                }}
            />
        </Suspense>
    );
}
