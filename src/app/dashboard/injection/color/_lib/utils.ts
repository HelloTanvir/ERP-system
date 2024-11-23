import { InputField } from '@/app/_lib/utils';

export interface IColor {
    id: number;
    barcode: string;
    name: string;
    code: string;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Barcode',
            name: 'barcode',
            type: 'text',
            placeholder: 'Enter barcode',
            required: true,
        },
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter name',
            required: true,
        },
        {
            label: 'Code',
            name: 'code',
            type: 'text',
            placeholder: 'Enter code',
            required: true,
        },
    ];
};
