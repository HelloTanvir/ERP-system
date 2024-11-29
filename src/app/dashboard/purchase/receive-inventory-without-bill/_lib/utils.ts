import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IReceiveInventoryWithoutBillItem {
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
    warehouse: {
        id: number;
        name: string;
    };
    requested_by: {
        id: number;
        name: string;
    };
    rate_per_unit: number;
    remarks: string;
}

export interface IReceiveInventoryWithoutBill {
    id: number;
    preq_items: IReceiveInventoryWithoutBillItem[];
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
