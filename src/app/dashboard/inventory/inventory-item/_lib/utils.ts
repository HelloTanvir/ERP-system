import { DropdownSelectOption, InputField } from '@/app/_lib/utils';

export interface InventoryCreationDropdownOptions {
    unitOfMeasureOptions: DropdownSelectOption[];
    categoryOptions: DropdownSelectOption[];
    subCategoryOptions: DropdownSelectOption[];
    warehouseOptions: DropdownSelectOption[];
}

export interface Allocation {
    warehouse: {
        id: number;
        name: string;
    };
    quantity: number;
}

export interface InventoryItem {
    id: number;
    name: string;
    allocations?: Allocation[];
    code: string;
    barcode: string;
    description: string;
    remarks: string;
    quantity_on_warehouse: number;
    initial_item_cost: number;
    initial_total_cost: number;
    minimum_order_quantity: number;
    purchase_price: number;
    purchase_price_tax: number;
    sale_price: number;
    sale_price_tax: number;
    discount_percent: number;
    measure_unit: null | number;
    category: null | number;
    subcategory: null | number;
    as_of_date: string | Date;
}

export const getInputFields = (
    dropdownOptions?: InventoryCreationDropdownOptions
): InputField[] => {
    return [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter inventory name',
            required: true,
        },
        {
            label: 'SKU',
            name: 'code',
            type: 'text',
            placeholder: 'Enter sku',
            required: true,
        },
        {
            label: 'Barcode',
            name: 'barcode',
            type: 'text',
            placeholder: 'Enter barcode',
            required: true,
        },
        {
            label: 'Unit of Measure',
            name: 'measure_unit',
            type: 'dropdown',
            placeholder: 'Select Unit of Measure',
            options: dropdownOptions?.unitOfMeasureOptions || [],
            required: true,
        },
        {
            label: 'Items Description',
            name: 'description',
            type: 'textarea',
            placeholder: 'Give a short description..',
            required: false,
            fullWidth: true,
        },
        {
            label: 'Remarks',
            name: 'remarks',
            type: 'textarea',
            placeholder: 'Give remarks for the item',
            required: false,
            fullWidth: true,
        },
        {
            label: 'Initial Cost Per Unit',
            name: 'initial_item_cost',
            type: 'number',
            placeholder: 'Enter cost per unit',
            required: true,
        },
        {
            label: 'Initial Total Cost',
            name: 'initial_total_cost',
            type: 'number',
            placeholder: 'Enter total cost',
            required: true,
        },
        {
            label: 'Item Category',
            name: 'category',
            type: 'dropdown',
            placeholder: 'Select Item Category',
            options: dropdownOptions?.categoryOptions || [],
            required: true,
        },
        {
            label: 'Item Subcategory',
            name: 'subcategory',
            type: 'dropdown',
            placeholder: 'Select Item Subcategory',
            options: dropdownOptions?.subCategoryOptions || [],
            required: true,
        },
        {
            label: 'Purchase Price (Exclusive Tax)',
            name: 'purchase_price',
            type: 'number',
            placeholder: 'Enter purchase price',
            required: true,
        },
        {
            label: 'Purchase Price (Inclusive Tax)',
            name: 'purchase_price_tax',
            type: 'number',
            placeholder: 'Enter purchase price',
            required: true,
        },
        {
            label: 'Sale Price (Exclusive Tax)',
            name: 'sale_price',
            type: 'number',
            placeholder: 'Enter sale price',
            required: true,
        },
        {
            label: 'Sale Price (Inclusive Tax)',
            name: 'sale_price_tax',
            type: 'number',
            placeholder: 'Enter sale price',
            required: true,
        },
        {
            label: 'Default Discount %',
            name: 'discount_percent',
            type: 'number',
            placeholder: 'Enter discount %',
            required: true,
        },
        {
            label: 'Minimum Order Quantity',
            name: 'minimum_order_quantity',
            type: 'number',
            placeholder: 'Enter minimum order quantity',
            required: true,
        },
        {
            label: 'As of Date',
            name: 'as_of_date',
            type: 'date',
            placeholder: 'Set as of date',
            required: false,
            defaultValue: new Date(Date()).toJSON().slice(0, 10),
        },
    ];
};

export type ActionType = 'category-create' | 'subcategory-create';
