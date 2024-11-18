import { format } from 'date-fns';
import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import { getInputFields, ICustomer } from './_lib/utils';

export default async function Customer({
    searchParams,
}: Readonly<{ searchParams?: SearchParams }>) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<ICustomer>({
            endpoint: `${process.env.API_URL}/finance/customer/`,
            revalidatePath: '/dashboard/sales/customer',
        });

    const { results: customers, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Customers', customers);

    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Customers"
                tableConfig={{
                    tableColumns: [
                        'Name',
                        'Title',
                        'Company',
                        'Email',
                        'Phone',
                        'As of Date',
                        'Opening Balance',
                    ],
                    tableRows: customers.map((item) => [
                        item.name,
                        item.title,
                        item.company,
                        item.email,
                        item.phone,
                        format(item.as_of_date, 'PPpp'),
                        item.opening_balance,
                    ]),
                    items: customers,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    fields: itemFields,
                }}
                modalTitles={{
                    create: 'Create Customer',
                    edit: 'Edit Customer',
                }}
            />
        </Suspense>
    );
}
