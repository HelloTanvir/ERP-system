import { DropdownSelectOption, InputField } from '@/app/_lib/utils';

export interface MManufacturingJournalItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    item: number; // Item ID
    source_warehouse: number; // Warehouse ID
}

export interface MManufacturingJournal {
    id: number;
    items: MManufacturingJournalItem[];
    voucher_no: string;
    date: string;
    created_at: string;
    updated_at: string;
    total_value: number;
    destination_warehouse: number; // Warehouse ID
    status: 'todo' | 'pending' | 'completed';
}

export const getInputFields = (dropdownOptions?: DropdownSelectOption[]): InputField[] => {
    return [
        {
            label: 'Destination Warehouse',
            name: 'destination_warehouse',
            type: 'dropdown',
            placeholder: 'Select Destination Warehouse',
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
