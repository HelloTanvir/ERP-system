import { DropdownSelectOption, InputField } from '@/app/_lib/utils';

export interface MManufacturingJournalItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    manufacture: number;
    item: number;
    source_warehouse: number;
}

export interface MManufacturingJournal {
    id: number;
    manufactured_items: MManufacturingJournalItem[];
    consumed_items: MManufacturingJournalItem[];
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

export const getInputFields = (dropdownOptions?: DropdownSelectOption[]): InputField[] => {
    return [
        {
            label: 'Destination Warehouse',
            name: 'destination_warehouse',
            type: 'text',
            placeholder: 'Select Destination Warehouse',
            required: true,
        },
        {
            label: 'Manufactured Items',
            name: 'manufactured_items',
            type: 'dropdown',
            placeholder: 'Select Destination',
            options: dropdownOptions || [],
            required: true,
        },
        {
            label: 'Narration',
            name: 'narration',
            type: 'textarea',
            placeholder: 'Give a narration for the transfer',
            required: false,
            fullWidth: true,
        },
    ];
};
