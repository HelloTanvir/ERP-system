import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IInventoryAdjustmentItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    item: number; // Item ID
    source_warehouse: number; // Warehouse ID
}

export interface IInventoryAdjustment {
    id: number;
    items: IInventoryAdjustmentItem[];
    voucher_no: string;
    voucher_date: string;
    created_at: string;
    updated_at: string;
    narration: string;
    type: 'add' | 'reduce' | 'manual';
    status: 'todo' | 'pending' | 'completed';
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Narration',
            name: 'narration',
            type: 'textarea',
            placeholder: 'Give a narration for the transfer',
            required: false,
            fullWidth: true,
        },
        {
            label: 'Type',
            name: 'type',
            type: 'dropdown',
            placeholder: 'Select Adjustment Type',
            options: [
                {
                    label: 'Add',
                    value: 'add',
                },
                {
                    label: 'Reduce',
                    value: 'reduce',
                },
                {
                    label: 'Manual',
                    value: 'manual',
                },
            ],
            required: true,
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
        {
            type: 'dropdown',
            name: 'type',
            options: ['add', 'reduce', 'manual'],
            label: 'Type',
        },
    ];
};
