import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IPurchaseOrderItem {
    id: number;
    quantity: number;
    item: number;
    warehouse: number;
    requested_by: number;
    rate_per_unit: number;
    remarks: string;
}

export interface IPurchaseOrder {
    id: number;
    preq_items: IPurchaseOrderItem[];
    purchase_order_no: string;
    supplier: string;
    purchase_requisition_no: number;
    record_date: string;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Purchase Order No',
            name: 'purchase_order_no',
            type: 'text',
            placeholder: 'Auto Generated',
            required: true,
            disabled: true,
        },
        {
            label: 'Supplier/Creditor',
            name: 'supplier',
            type: 'text',
            placeholder: 'Select supplier/creditor',
            required: true,
        },
        {
            label: 'Purchase Requisition No',
            name: 'purchase_requisition_no',
            type: 'dropdown',
            placeholder: 'Select supplier/creditor',
            creatable: true,
            optionsGetUrl: 'finance/purchase/requisition/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/purchase/purchase-requisition',
            required: true,
        },
        {
            label: 'Record Date',
            name: 'record_date',
            type: 'date',
            placeholder: 'Select record date',
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
