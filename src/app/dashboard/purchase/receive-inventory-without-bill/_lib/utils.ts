import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IReceiveInventoryWithoutBillItem {
    id: number;
    quantity: number;
    receiving_quantity: number;
    remarks: string;
    item: {
        id: number;
        code: string;
        name: string;
        measure_unit: string;
        is_inventory_item: boolean;
    };
    warehouse: {
        id: number;
        name: string;
    };
    requested_by: {
        id: number;
        name: string;
    };
    remarks: string;
}

export interface IReceiveInventoryWithoutBill {
    id: number;
    preq_items: IReceiveInventoryWithoutBillItem[];
    voucher_date: string;
    purchase_requisition_no: number;
    receiving_warehouse: {
        id: number;
        name: string;
    };
    created_by: {
        id: number;
        name: string;
    };
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Voucher No',
            name: 'voucher_no',
            type: 'text',
            placeholder: 'Auto Generated',
            required: true,
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
            label: 'Created By',
            name: 'created_by',
            type: 'text',
            placeholder: 'Created by',
            defaultValue: '',
            disabled: true,
        },
        {
            label: 'Purchase Requisition No',
            name: 'purchase_requisition_no',
            type: 'dropdown',
            creatable: true,
            optionsGetUrl: 'finance/purchase/requisition/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/purchase/purchase-requisition',
            required: true,
        },
        {
            label: 'Receiving Warehouse',
            name: 'receiving_warehouse',
            type: 'dropdown',
            creatable: true,
            optionsGetUrl: 'inventory/warehouse/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/inventory/warehouse',
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
