import { DropdownSelectOption, InputField } from '@/app/_lib/utils';

export interface IInventoryTransferItem {
    id: number;
    quantity: number;
    rate_per_unit: number;
    amount: number;
    item: number; // Item ID
    source_warehouse: number; // Warehouse ID
}

export interface IInventoryTransfer {
    id: number;
    items: IInventoryTransferItem[];
    voucher_no: string;
    voucher_date: string;
    created_at: string;
    updated_at: string;
    narration: string;
    total_value: number;
    destination_warehouse: number; // Warehouse ID
    status: string;
}

export const getInputFields = (dropdownOptions?: DropdownSelectOption[]): InputField[] => {
    /*

    {
  "items": [
        {
        "quantity": 0,
        "rate_per_unit": 0,
        "item": 0,
        "source_warehouse": 0
        }
    ],
    "voucher_date": "2024-10-17",
    "narration": "string",
    "destination_warehouse": 0
    }

    */
    return [
        {
            label: 'Destination Warehouse',
            name: 'destination_warehouse',
            type: 'dropdown',
            placeholder: 'Select Destination Warehouse',
            options: dropdownOptions || [],
            required: true,
        },
        {
            label: 'Narration',
            name: 'narration',
            type: 'textarea',
            placeholder: 'Give a narration for the transfer',
            required: false,
            fullWidth: true,
        },
    ];
};
