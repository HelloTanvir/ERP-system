import { InputField } from '@/app/_lib/utils';

export interface IInputProduction {
    id: number;
    revised_target: number;
    total_counter: number;
    rejected_counter: number;
    pushing_weight: number;
    avg_pushing_weight: number;
    consumption_variance: number;
    resin_one: string; // Resin name is InventoryItem
    resin_one_used: number;
    resin_two: string; // Resin name is InventoryItem
    resin_two_used: number;
    resin_three: string; // Resin name is InventoryItem
    resin_three_used: number;
    production: number;
    color: number; // id of Color
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
            label: 'Voucher Date',
            name: 'voucher_date',
            type: 'date',
            placeholder: 'Select voucher date',
            disabled: true,
        },
        {
            label: 'Mold Time Sheet',
            name: 'mold_time_sheet',
            type: 'dropdown',
            placeholder: 'Select mold time sheet',
            creatable: true,
            optionsGetUrl: 'injection/mold-timesheet/',
            optionsFilterQuery: 'mold_register__name__icontains',
            redirectURLOnCreate: '/dashboard/injection/mold-time-sheet',
            required: true,
        },
        {
            label: 'Mold Name',
            name: 'mold_name',
            type: 'text',
            placeholder: 'Enter mold name',
            disabled: true,
        },
        {
            label: 'Mold Item Number',
            name: 'mold_item_number',
            type: 'text',
            placeholder: 'Enter mold item number',
            disabled: true,
        },
        {
            label: 'Machine Name',
            name: 'machine',
            type: 'text',
            placeholder: 'Select machine',
            disabled: true,
        },

        {
            label: 'Production Start  (Date-Time)',
            name: 'start_time',
            type: 'text',
            placeholder: 'Enter production start time',
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
            label: 'Revised Target',
            name: 'revised_target',
            type: 'number',
            placeholder: '(End time - Start time) / Average Cycle Time',
            disabled: true,
        },
        {
            label: 'Total Counter',
            name: 'total_counter',
            type: 'number',
            placeholder: 'Enter total counter',
            required: true,
        },
        {
            label: 'Reject Counter',
            name: 'rejected_counter',
            type: 'number',
            placeholder: 'Enter reject counter',
            required: true,
        },
        {
            label: 'QC Passed Counter',
            name: 'qc_passed_counter',
            type: 'number',
            placeholder: 'Total Counter - Reject Counter',
            disabled: true,
        },
        {
            label: 'Pushing Weight',
            name: 'pushing_weight',
            type: 'number',
            placeholder: 'Enter pushing weight',
            disabled: true,
        },
        {
            label: 'Actual Average Pushing Weight',
            name: 'avg_pushing_weight',
            type: 'number',
            placeholder: 'Enter actual average pushing weight',
            required: true,
        },
        {
            label: 'Consumption Variance',
            name: 'consumption_variance',
            type: 'number',
            placeholder: '(Pushing Weight - Actual Average Pushing Weight) * QC Passed Counter',
            disabled: true,
        },
        {
            label: 'Color',
            name: 'color',
            type: 'dropdown',
            placeholder: 'Enter color',
            optionsGetUrl: 'injection/color/',
            optionsFilterQuery: 'name',
        },
    ];
};
