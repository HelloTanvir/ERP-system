import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

interface IAccountGroup {
    id: string;
    name: string;
}

interface ICategory {
    id: string;
    account_type: string;
    detail_type: string;
}

export interface IChartOfAccount {
    id: number;
    category: ICategory;
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
            label: 'Account Group',
            name: 'group_name',
            type: 'dropdown',
            placeholder: 'Select account group',
            optionsGetUrl: 'finance/account-group/',
            optionsFilterQuery: 'name__icontains',
            required: true,
        },
        {
            label: 'Account Creation Date',
            name: 'as_of_date',
            type: 'date',
            placeholder: 'Select account creation date',
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
            type: 'textarea',
            placeholder: 'Enter remarks',
            fullWidth: true,
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
