import { InputField } from '@/app/_lib/utils';

export interface IInputProductionItem {
    id: number;
    total_counter: number;
    rejected_counter: number;
    pushing_weight: number;
    actual_pushing_weight: number;
    consumption_variance: number;
    resin_name_one: string;
    resin_name_two: string;
    color: string;
    production: number;
}

export interface IInputProduction {
    id: number;
    production_details: IInputProductionItem[];
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
            label: 'Voucher Date',
            name: 'voucher_date',
            type: 'date',
            placeholder: 'Select voucher date',
            required: false,
            disabled: true,
        },
        {
            label: 'Mold Time Sheet',
            name: 'mold_time_sheet',
            type: 'dropdown',
            placeholder: 'Select machine',
            required: true,
            creatable: true,
            optionsGetUrl: 'injection/mold-timesheet/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/injection/input-production',
        },
        {
            label: 'Select Mold',
            name: 'selected_mold',
            type: 'text',
            placeholder: 'Select mold',
            required: true,
        },
        {
            label: 'Mold Name',
            name: 'mold_name',
            type: 'text',
            placeholder: 'Enter mold name',
            required: true,
        },
        {
            label: 'Mold Item Number',
            name: 'mold_item_number',
            type: 'text',
            placeholder: 'Enter mold item number',
            required: true,
        },
        {
            label: 'Machine Name',
            name: 'machine',
            type: 'text',
            placeholder: 'Select machine',
            required: true,
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
            label: 'Production End (Date-Time)',
            name: 'production_end',
            type: 'text',
            placeholder: 'Enter production end time',
            required: false,
        },
        {
            label: 'Revised Target',
            name: 'revised_target',
            type: 'number',
            placeholder: 'Enter revised target',
            required: false,
            disabled: true,
        },
    ];
};
