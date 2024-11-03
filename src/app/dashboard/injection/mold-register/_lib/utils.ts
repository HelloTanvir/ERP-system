import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IMoldRegisterItem {
    cavity_number: number;
    cavity_name: string;
    net_cavity_weight: number;
    calculation: number;
    barcode: string;
    status: string;
}

export interface IMoldRegister {
    id: number;
    cavity: IMoldRegisterItem[];
    number: string;
    item_number: string;
    name: string;
    net_cycle_time: number;
    average_cycle_time: number;
    hourly_production_rate: number;
    resin_type: string;
    capacity_range_from: number;
    capacity_range_to: number;
    product_linkage: number;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Mold Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter mold name',
            required: true,
        },
        {
            label: 'Mold Number',
            name: 'number',
            type: 'text',
            placeholder: 'Enter mold number',
            required: true,
        },
        {
            label: 'Mold Item Number',
            name: 'item_number',
            type: 'text',
            placeholder: 'Enter mold number',
            required: true,
        },
        {
            label: 'Production Linkage',
            name: 'product_linkage',
            type: 'dropdown',
            placeholder: 'Select a product',
            required: false,
            creatable: true,
            optionsGetUrl: 'inventory/item/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/inventory/inventory-item',
        },
        {
            label: 'Avarage Cycle Time',
            name: 'average_cycle_time',
            type: 'number',
            placeholder: 'Give a narration for the transfer',
            required: false,
        },
        {
            label: 'Hourly Production',
            name: 'hourly_production_rate',
            type: 'number',
            placeholder: 'Conter/Hour',
            required: false,
        },
        {
            label: 'Net Cycle Time',
            name: 'net_cycle_time',
            type: 'number',
            placeholder: 'Enter net cycle time',
            required: false,
        },
        {
            label: 'Resin Type',
            name: 'resin_type',
            type: 'text',
            placeholder: 'Enter resin type',
            required: true,
        },

        {
            label: 'Machine Capacity Range From',
            name: 'capacity_range_from',
            type: 'number',
            placeholder: 'Enter machine capacity range from',
            required: false,
        },
        {
            label: 'Machine Capacity Range To',
            name: 'capacity_range_to',
            type: 'number',
            placeholder: 'Enter machine capacity range to',
            required: false,
        },
    ];
};

export const getSearchFields = (): SearchField[] => {
    return [
        {
            type: 'dropdown',
            name: 'status',
            options: ['todo', 'pending', 'completed'],
            label: 'Status',
        },
    ];
};
