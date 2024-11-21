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
    status: 'upcoming' | 'running' | 'completed';
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher Number',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Auto generated',
            disabled: true,
        },
        {
            label: 'Machine',
            name: 'machine',
            type: 'dropdown',
            placeholder: 'Select machine',
            required: true,
            creatable: true,
            optionsGetUrl: 'injection/machine/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/injection/machine',
        },
        {
            label: 'Mold',
            name: 'mold_register',
            type: 'dropdown',
            placeholder: 'Select mold',
            required: true,
            creatable: true,
            optionsGetUrl: 'injection/mold-registration/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/injection/mold-register',
        },
        {
            label: 'Inactive From',
            name: 'downtime',
            type: 'dropdown',
            optionsGetUrl: 'injection/downtime/',
            optionsFilterQuery: '',
            placeholder: 'Enter inactive from',
            required: true,
            disabled: true,
        },
        {
            label: 'Production Start  (Date-Time)',
            name: 'production_from',
            type: 'text',
            placeholder: 'Enter production start time',
            required: true,
            disabled: true,
        },
        {
            label: 'Mold Item Number',
            name: 'mold_item_number',
            type: 'text',
            placeholder: 'Enter mold item number',
            required: true,
            disabled: true,
        },
        {
            label: 'Production End (Date-Time)',
            name: 'production_end',
            type: 'date-time',
            placeholder: 'Enter production end time',
            required: true,
        },
        {
            label: 'Target Production(As of schedule)',
            name: 'target_production',
            type: 'text',
            placeholder: 'Enter target production',
            disabled: true,
            required: true,
        },
    ];
};
