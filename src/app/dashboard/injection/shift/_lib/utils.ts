import { InputField } from '@/app/_lib/utils';

export interface IShift {
    id: number;
    voucher_no: string;
    voucher_date: string;
    name: string;
    start_time: string;
    end_time: string;
    total_time: string;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher No.',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Enter voucher number',
            disabled: true,
            required: false,
        },
        {
            label: 'Voucher Date',
            name: 'voucher_date',
            type: 'text',
            placeholder: 'Enter voucher date',
            disabled: true,
            required: false,
        },
        {
            label: 'Shift Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter shift name',
            required: true,
        },
        {
            label: 'Start Time',
            name: 'start_time',
            type: 'date-time',
            placeholder: 'Enter start time',
            required: true,
        },
        {
            label: 'End Time',
            name: 'end_time',
            type: 'date-time',
            placeholder: 'Enter end time',
            required: true,
        },
        {
            label: 'Total time calculated (sec)',
            name: 'total_time',
            type: 'text',
            placeholder: 'Enter total time calculated',
            disabled: true,
            required: false,
        },
    ];
};
