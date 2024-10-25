import { InputField, NestedItem } from '@/app/_lib/utils';

export interface IService {
    id: string;
    name: string;
    description: string;
    measure_unit: NestedItem;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter inventory name',
            required: true,
        },
        {
            label: 'Unit of Measure',
            name: 'measure_unit',
            type: 'dropdown',
            placeholder: 'Select Unit of Measure',
            creatable: true,
            optionsGetUrl: 'inventory/measurement-unit/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/inventory/unit-of-measure',
            required: true,
        },
        {
            label: 'Description',
            name: 'description',
            type: 'textarea',
            placeholder: 'Give a short description..',
            required: false,
            fullWidth: true,
        },
    ];
};
