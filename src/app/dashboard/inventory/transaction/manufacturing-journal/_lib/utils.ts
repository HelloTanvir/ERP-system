import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface ManufacturingJournalItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    manufacture: number;
    item: number;
    source_warehouse: number;
}

export interface IManufacturingJournal {
    id: number;
    manufactured_items: ManufacturingJournalItem[];
    consumed_items: ManufacturingJournalItem[];
    voucher_no: string;
    voucher_date: string;
    created_at: string;
    updated_at: string;
    narration: string;
    multiplier: number;
    total_value: number;
    status: 'todo' | 'pending' | 'completed';
    is_template: boolean;
    is_active: boolean;
}

export const getManufacturingTemplateInputFields = (): InputField[] => {
    return [
        {
            label: 'Narration',
            name: 'narration',
            type: 'textarea',
            placeholder: 'Give a narration for the template',
            required: false,
            fullWidth: true,
        },
    ];
};

export const getBillOfMaterialInputFields = (): InputField[] => {
    return [
        {
            label: 'Narration',
            name: 'narration',
            type: 'textarea',
            placeholder: 'Give a narration for the template',
            required: false,
            fullWidth: true,
        },
        {
            label: 'Select Template',
            name: 'template',
            type: 'dropdown',
            placeholder: 'Select Template',
            optionsGetUrl: 'manufacturing/manufacture/?is_template=true',
            optionsFilterQuery: 'name__name__icontains',
            required: true,
            fullWidth: true,
        },
    ];
};

export const getSearchFields = (): SearchField[] => {
    return [
        {
            type: 'dropdown',
            name: 'status',
            options: ['todo', 'pending', 'completed'],
            label: 'Status',
        },
    ];
};
