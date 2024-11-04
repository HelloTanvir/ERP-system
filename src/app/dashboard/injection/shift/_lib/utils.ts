import { InputField } from '@/app/_lib/utils';

export interface IShift {
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
            label: 'Voucher Ref',
            name: 'voucher_ref',
            type: 'text',
            placeholder: 'Enter voucher ref',
            required: false,
        },
        {
            label: 'Start Time',
            name: 'start_time',
            type: 'text',
            placeholder: 'Enter start time',
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
            label: 'End Time',
            name: 'end_time',
            type: 'text',
            placeholder: 'Enter end time',
            required: false,
        },
        {
            label: 'Shift Name',
            name: 'shift_name',
            type: 'text',
            placeholder: 'Enter shift name',
            required: false,
        },
        {
            label: 'Shift Type',
            name: 'shift_type',
            type: 'dropdown',
            placeholder: 'Select shift type',
            options: [
                {
                    label: 'Day',
                    value: 'day',
                },
                {
                    label: 'Evening',
                    value: 'evening',
                },
                {
                    label: 'Night',
                    value: 'night',
                },
            ],
            required: false,
        },
        {
            label: 'Total time calculated (sec)',
            name: 'total_time_calculated',
            type: 'text',
            placeholder: 'Enter total time calculated',
            required: false,
        },
    ];
};
