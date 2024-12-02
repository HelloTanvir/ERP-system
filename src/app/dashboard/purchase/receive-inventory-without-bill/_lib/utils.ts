import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';
import { IPurchaseRequisition } from '../../purchase-requisition/_lib/utils';

export interface IReceiveInventoryWithoutBillItem {
    item_id: number;
    received_quantity: number;
}

export interface IReceiveInventoryWithoutBill {
    id: number;
    voucher_no: string;
    voucher_date: string;
    received_warehouse: {
        id: number;
        name: string;
    };
    purchase_requisition: IPurchaseRequisition;
    created_by: number;
    created_by_name: string;
    items: IReceiveInventoryWithoutBillItem[];
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
            disabled: true,
        },
        {
            label: 'Purchase Requisition',
            name: 'purchase_requisition',
            type: 'dropdown',
            creatable: true,
            optionsGetUrl: 'finance/purchase/requisition/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/purchase/purchase-requisition',
            required: true,
        },
        {
            label: 'Receiving Warehouse',
            name: 'received_warehouse',
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
