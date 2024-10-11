import { InputField } from '@/app/_lib/utils';

export interface MeasurementUnit {
    id: string;
    name: string;
    symbol: string;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Unit Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter unit name',
            required: true,
        },
        {
            label: 'Symbol',
            name: 'symbol',
            type: 'text',
            placeholder: 'Enter symbol',
            required: true,
        },
    ];
};
