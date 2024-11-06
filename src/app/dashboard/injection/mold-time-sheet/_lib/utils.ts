import { InputField } from '@/app/_lib/utils';

export interface IMoldTimeSheetItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    item: number; // Item ID
    source_warehouse: number; // Warehouse ID
}

export interface IMoldTimeSheet {
    id: number;
    items: IMoldTimeSheetItem[];
    voucher_no: string;
    voucher_date: string;
    created_at: string;
    updated_at: string;
    narration: string;
    total_value: number;
    destination_warehouse: number;
    status: 'todo' | 'pending' | 'completed';
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher Number',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Auto generated',
            required: true,
            disabled: true,
        },
        {
            label: 'Machine Name',
            name: 'machine',
            type: 'dropdown',
            placeholder: 'Select machine',
            required: true,
            creatable: true,
            optionsGetUrl: 'injection/machine/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/injection/mold-time-sheet',
        },
        {
            label: 'Select Mold',
            name: 'selected_mold',
            type: 'dropdown',
            placeholder: 'Select mold',
            required: true,
            creatable: true,
            optionsGetUrl: 'injection/mold-registration/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/injection/mold-time-sheet',
        },
        {
            label: 'Inactive From',
            name: 'inactive_from',
            type: 'text',
            placeholder: 'Enter mold name',
            required: false,
            disabled: true,
        },
        {
            label: 'Mold Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter mold name',
            required: false,
            disabled: true,
        },
        {
            label: 'Production Start  (Date-Time)',
            name: 'start_time',
            type: 'text',
            placeholder: 'Enter production start time',
            required: false,
            disabled: true,
        },
        {
            label: 'Mold Item Number',
            name: 'item_number',
            type: 'text',
            placeholder: 'Enter mold item number',
            required: false,
            disabled: true,
        },
        {
            label: 'Production End (Date-Time)',
            name: 'production_end',
            type: 'text',
            placeholder: 'Enter production end time',
            required: false,
        },
        {
            label: 'Target Production(As of schedule)',
            name: 'target_production',
            type: 'number',
            placeholder: 'Enter target production',
            required: false,
            disabled: true,
        },
    ];
};
