import { InputField } from '@/app/_lib/utils';

export interface ISchedule {
    id: number;
    date: string;
    mold_name: string;
    mold_number: string;
    status: string;
    machine: number[];
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Select Machine',
            name: 'machine',
            type: 'dropdown',
            placeholder: 'Select machine',
            creatable: true,
            optionsGetUrl: 'injection/machine/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/injection/machine',
            required: true,
        },

        {
            label: 'Target Production',
            name: 'target_production',
            type: 'number',
            placeholder: 'Enter target production',
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
            label: 'Mold Code',
            name: 'mold_code',
            type: 'text',
            placeholder: 'Enter mold code',
            required: true,
        },
    ];
};
