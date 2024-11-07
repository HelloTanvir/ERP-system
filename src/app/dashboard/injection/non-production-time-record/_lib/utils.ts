import { InputField } from '@/app/_lib/utils';

export interface INonProductionTimeRecord {
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
            label: 'Machine',
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
            label: 'Inactive From(Date/Time)',
            name: 'inactive_from',
            type: 'date',
            placeholder: 'Enter mold name',
            required: true,
        },
        {
            label: 'Inactive To(Date/Time)',
            name: 'inactive_to',
            type: 'date',
            placeholder: 'Enter mold name',
            required: true,
        },
    ];
};
