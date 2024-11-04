import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IMachine {
    id: number;
    voucher_no: string;
    voucher_date: string;
    name: string;
    number: string;
    serial_number: string;
    capacity_ounce: number;
    capacity_tons: number;
    purchase_cost: number;
    purchase_date: string;
    location: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Machine Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter machine name',
            required: true,
        },
        {
            label: 'Machine Number',
            name: 'number',
            type: 'text',
            placeholder: 'Enter machine number',
            required: true,
        },
        {
            label: 'Voucher Number',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Enter voucher number',
            required: true,
        },
        {
            label: 'Maximum Capacity (Ounce)',
            name: 'capacity_ounce',
            type: 'text',
            placeholder: 'Enter maximum capacity in ounce',
        },
        {
            label: 'Maximum Capacity (Tons)',
            name: 'capacity_tons',
            type: 'text',
            placeholder: 'Enter maximum capacity in tons',
        },
        {
            label: 'Machine Serial Number',
            name: 'serial_number',
            type: 'number',
            placeholder: 'Give a serial number',
            required: true,
        },
        {
            label: 'Purchase Cost',
            name: 'purchase_cost',
            type: 'number',
            placeholder: 'Enter net cycle time',
            required: true,
        },
        {
            label: 'Purchase Date',
            name: 'purchase_date',
            type: 'date',
            placeholder: 'Enter purchase date',
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
            label: 'Depreciation Rate',
            name: 'depreciation_rate',
            type: 'number',
            placeholder: 'Enter depreciation rate',
        },
    ];
};

export const getSearchFields = (): SearchField[] => {
    return [
        {
            type: 'text',
            name: 'name__icontains',
        },
        {
            type: 'dropdown',
            name: 'is_active',
            options: ['true', 'false'],
            label: 'Active',
        },
    ];
};
