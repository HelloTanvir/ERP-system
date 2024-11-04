import { InputField } from '@/app/_lib/utils';

export interface IInputProduction {
    id: number;
    reason: string;
    inactive_from: string;
    inactive_to: string;
    created_at: string;
    updated_at: string;
    machine: number[];
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher Number',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Auto generated',
            required: false,
        },
        {
            label: 'Voucher Date',
            name: 'voucher_date',
            type: 'date',
            placeholder: 'Select voucher date',
            required: false,
        },
        {
            label: 'Select Mold',
            name: 'mold_item',
            type: 'dropdown',
            placeholder: 'Select mold',
            required: false,
            creatable: true,
            optionsGetUrl: 'inventory/item/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/inventory/inventory-item',
        },
        {
            label: 'Start Time',
            name: 'start_time',
            type: 'text',
            placeholder: 'Select start time',
            required: false,
        },
        {
            label: 'End Time',
            name: 'end_time',
            type: 'text',
            placeholder: 'Select end time',
            required: false,
        },

        {
            label: 'Revised Target',
            name: 'revised_target',
            type: 'text',
            placeholder: '(End Time-Start Tine)/[Avg Cycle Time]',
            required: false,
        },
    ];
};
