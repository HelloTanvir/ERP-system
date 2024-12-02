import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';
import { IPurchaseRequisition } from '../../purchase-requisition/_lib/utils';

export interface IPurchaseOrderItem {
    item_id: number;
    rate_per_unit: number;
    remarks: string;
}

export interface IPurchaseOrder {
    id: number;
    voucher_no: string;
    voucher_date: string;
    purchase_requisition: IPurchaseRequisition;
    supplier: {
        id: number;
        name: string;
    };
    created_by: number;
    created_by_name: string;
    items: IPurchaseOrderItem[];
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
            placeholder: 'Select record date',
            required: true,
            defaultValue: new Date().toISOString().split('T')[0],
        },
        {
            label: 'Supplier/Creditor',
            name: 'supplier',
            type: 'dropdown',
            creatable: true,
            optionsGetUrl: 'finance/customer/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/sales/customer',
            required: true,
        },
        {
            label: 'Purchase Requisition No',
            name: 'purchase_requisition',
            type: 'dropdown',
            creatable: true,
            optionsGetUrl: 'finance/purchase/requisition/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/purchase/purchase-requisition',
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
