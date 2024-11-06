import { InputField } from '@/app/_lib/utils';

export interface IMoldTimeSheet {
    id: number;
    voucher_no: string;
    voucher_date: string;
    mold_name: string;
    mold_item_number: string;
    downtime_from: string;
    production_from: string;
    production_end: string;
    revised_target: number;
    target_production: number;
    is_timesheet: boolean;
    machine: number;
    mold_register: number;
    downtime: number;
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
            required: true,
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
            required: true,
        },
        {
            label: 'Inactive From',
            name: 'inactive_from',
            type: 'text',
            placeholder: 'Enter mold name',
            required: true,
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
            required: true,
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
