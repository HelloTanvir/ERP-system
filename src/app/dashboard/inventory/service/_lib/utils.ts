import { DropdownSelectOption, InputField } from '@/app/_lib/utils';

export interface IService {
    id: string;
    name: string;
    description: string;
    measure_unit: string;
}

export const getInputFields = (dropdownOptions?: DropdownSelectOption[]): InputField[] => {
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
            options: dropdownOptions || [],
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
