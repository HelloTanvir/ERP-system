import { InputField } from '@/app/_lib/utils';
import { SearchField } from '@/app/dashboard/_lib/utils';

export interface IPurchaseJournalItem {
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

export interface IPurchaseJournal {
    id: number;
    preq_items: IPurchaseJournalItem[];
    purchase_order_no: string;
    supplier: string;
    purchase_requisition_no: number;
    record_date: string;
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
            label: 'Purchase Account',
            name: 'purchase_account',
            type: 'dropdown',
            placeholder: 'Auto Generated',
            creatable: true,
            optionsGetUrl: 'finance/customer/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/sales/customer',
            required: true,
        },
        {
            label: 'Supplier/Cash',
            name: 'purchase_account',
            type: 'dropdown',
            placeholder: 'Select supplier/cash',
            creatable: true,
            optionsGetUrl: 'finance/customer/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/sales/customer',
            required: true,
        },
        {
            label: 'Voucher Date',
            name: 'voucher_date',
            type: 'date',
            placeholder: 'Select voucher date',
            required: true,
        },
        {
            label: 'Due Date',
            name: 'due_date',
            type: 'date',
            placeholder: 'Select due date',
            required: true,
        },
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
            label: 'Purchase Received',
            name: 'purchase_received',
            type: 'dropdown',
            creatable: true,
            optionsGetUrl: 'finance/purchase/received/',
            optionsFilterQuery: 'name__icontains',
            redirectURLOnCreate: '/dashboard/purchase/receive-inventory-without-bill',
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
