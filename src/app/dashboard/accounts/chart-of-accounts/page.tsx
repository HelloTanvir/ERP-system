import { Suspense } from 'react';
import GenericCRUD from '../../_components/generic-crud/GenericCRUD';
import { createGenericServerActions } from '../../_lib/actions';
import { ITEMS_PER_PAGE, SearchParams } from '../../_lib/utils';
import ChartOfAccountsForm from './_components/ChartOfAccountsForm';
import Report from './_components/Report';
import { getInputFields, getSearchFields, IChartOfAccount } from './_lib/utils';

export default async function ChartOfAccounts({
    searchParams,
}: Readonly<{ searchParams?: SearchParams }>) {
    const { createItem, updateItem, deleteItem, getItems } =
        await createGenericServerActions<IChartOfAccount>({
            endpoint: `${process.env.API_URL}/finance/accounts/`,
            revalidatePath: '/dashboard/accounts/chart-of-accounts',
        });

    const { results: chartOfAccountsItems, count } = await getItems({
        ...searchParams,
        page: searchParams?.page || '1',
        records: ITEMS_PER_PAGE,
    });

    console.log('Chart of Accounts', chartOfAccountsItems);

    const searchFields = getSearchFields();
    const itemFields = getInputFields();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GenericCRUD
                pageTitle="Chart of Accounts"
                searchConfig={{
                    fields: searchFields,
                }}
                tableConfig={{
                    tableColumns: [
                        'Account Creation Date',
                        'Account Name',
                        'Account Type',
                        'Vat No',
                        'Status',
                        'Remarks',
                    ],
                    tableRows: chartOfAccountsItems.map((item) => [
                        item.as_of_date,
                        item.name,
                        item.category.account_type,
                        item.vat,
                        item.purchase_cost,
                        item.is_active > 0 ? (
                            <span className="text-[#038F65]">Active</span>
                        ) : (
                            <span className="text-[#E9000E]">Inactive</span>
                        ),
                        item.remarks,
                    ]),
                    items: chartOfAccountsItems,
                    totalItemsCount: count,
                    updateItem,
                    deleteItem,
                }}
                formConfig={{
                    createItem,
                    additionalActions: <Report />,
                    CustomItemForm: ChartOfAccountsForm,
                    customItemFormProps: {
                        fields: itemFields,
                    },
                }}
                modalTitles={{
                    create: 'Create Account',
                    edit: 'Edit Account',
                }}
            />
        </Suspense>
    );
}
