import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IPurchaseRequisitionItem {
    id: number;
    quantity: number;
    remarks: string;
    item: number;
    warehouse: number;
    requested_by: number;
}

export interface IPurchaseRequisition {
    id: number;
    preq_items: IPurchaseRequisitionItem[];
    voucher_date: string;
    delivery_deadline: string;
    created_by: number;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Auto Generated',
            required: true,
            disabled: true,
        },
        {
            label: 'Voucher Date',
            name: 'date',
            type: 'date',
            placeholder: 'Select Voucher Date',
            required: true,
            disabled: true,
            defaultValue: new Date().toISOString(),
        },
        {
            label: 'Delivery Deadline',
            name: 'date',
            type: 'date',
            placeholder: 'Select delivery deadline',
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
    ];
};
