import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

interface IAccountGroup {
    id: string;
    name: string;
}

export interface IChartOfAccount {
    id: number;
    category: number;
    group: IAccountGroup;
    name: string;
    remarks: string;
    is_active: boolean;
    opening_balance: number;
    as_of_date: string;
    vat: number;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Account Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter account name',
            required: true,
        },
        {
            label: 'Opening Balance',
            name: 'opening_balance',
            type: 'number',
            placeholder: 'Enter opening balance',
        },
        {
            label: 'Account Type',
            name: 'category',
            type: 'dropdown',
            placeholder: 'Select account type',
            creatable: true,
            optionsGetUrl: 'finance/account-cateogy/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/accounts/chart-of-accounts',
        },
        {
            label: 'Account Group',
            name: 'group',
            type: 'dropdown',
            placeholder: 'Select account group',
            creatable: true,
            optionsGetUrl: 'finance/account-group/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/accounts/chart-of-accounts',
        },
        {
            label: 'Detail Type',
            name: 'detail_type',
            type: 'dropdown',
            placeholder: 'Select detail type',
            creatable: true,
            options: [
                {
                    label: 'Debit Account',
                    value: 'debit_account',
                },
                {
                    label: 'Student Account',
                    value: 'student_account',
                },
                {
                    label: 'Business Account',
                    value: 'business_account',
                },
            ],
        },
        {
            label: 'Account Creation Date',
            name: 'as_of_date',
            type: 'date',
            placeholder: 'Select account creation date',
            required: true,
        },
        {
            label: 'Vat No',
            name: 'vat',
            type: 'number',
            placeholder: 'Enter vat no',
        },
        {
            label: 'Remarks',
            name: 'remarks',
            type: 'text',
            placeholder: 'Enter remarks',
        },
    ];
};

export const getSearchFields = (): SearchField[] => {
    return [
        {
            type: 'dropdown',
            name: 'is_active',
            options: ['true', 'false'],
            label: 'Active',
        },
    ];
};
