import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IMoldRegisterItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    item: number; // Item ID
    source_warehouse: number; // Warehouse ID
}

export interface IMoldRegister {
    id: number;
    items: IMoldRegisterItem[];
    voucher_no: string;
    voucher_date: string;
    created_at: string;
    updated_at: string;
    narration: string;
    total_value: number;
    destination_warehouse: number; // Warehouse ID
    status: 'todo' | 'pending' | 'completed';
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
            // labelPara: 'If No Product Linkage Selected, It will categorized as General',
            name: 'product_linkage',
            type: 'text',
            placeholder: 'Give a narration for the transfer',
            required: false,
        },
        {
            label: 'Avarage Cycle Time',
            name: 'average_cycle_time',
            type: 'number',
            placeholder: 'Give a narration for the transfer',
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
