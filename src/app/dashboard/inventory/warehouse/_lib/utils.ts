import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IWarehouse {
    id: string;
    name: string;
    location: string;
    description: string;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Warehouse Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter warehouse name',
            required: true,
        },
        {
            label: 'Location',
            name: 'location',
            type: 'text',
            placeholder: 'Enter location',
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

export const getSearchFields = (): SearchField[] => {
    return [
        {
            type: 'text',
            name: 'name__icontains',
        },
    ];
};
