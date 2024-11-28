import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IPurchaseRequisitionItem {
    id: number;
    quantity: number;
    remarks: string;
    item: {
        id: number;
        code: string;
        name: string;
        measure_unit: string;
        is_inventory_item: boolean;
    };
    warehouse: number;
    requested_by: number;
}

export interface IPurchaseRequisition {
    id: number;
    preq_items: IPurchaseRequisitionItem[];
    voucher_no: string;
    voucher_date: string;
    delivery_deadline: string;
    created_by: number;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher No',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Auto Generated',
            disabled: true,
        },
        {
            label: 'Voucher Date',
            name: 'voucher_date',
            type: 'date',
            placeholder: 'Select Voucher Date',
            required: true,
            defaultValue: new Date().toISOString().split('T')[0],
        },
        {
            label: 'Delivery Deadline',
            name: 'delivery_deadline',
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
