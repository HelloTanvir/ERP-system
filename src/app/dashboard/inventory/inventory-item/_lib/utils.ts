import { DropdownSelectOption, InputField } from '@/app/_lib/utils';

export interface InventoryCreationDropdownOptions {
    unitOfMeasureOptions: DropdownSelectOption[];
    categoryOptions: DropdownSelectOption[];
    subCategoryOptions: DropdownSelectOption[];
    warehouseOptions: DropdownSelectOption[];
}

interface Allocation {
    warehouse: number;
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

export const getInputFields = ({
    dropdownOptions,
    selectedItem,
}: {
    dropdownOptions?: InventoryCreationDropdownOptions;
    selectedItem?: InventoryItem;
}): InputField[] => {
    return [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter inventory name',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.name } : {}),
        },
        {
            label: 'SKU',
            name: 'code',
            type: 'text',
            placeholder: 'Enter sku',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.code } : {}),
        },
        {
            label: 'Barcode',
            name: 'barcode',
            type: 'text',
            placeholder: 'Enter barcode',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.barcode } : {}),
        },
        {
            label: 'Unit of Measure',
            name: 'measure_unit',
            type: 'dropdown',
            placeholder: 'Select Unit of Measure',
            options: dropdownOptions?.unitOfMeasureOptions || [],
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.measure_unit } : {}),
        },
        {
            label: 'Items Description',
            name: 'description',
            type: 'textarea',
            placeholder: 'Give a short description..',
            required: false,
            ...(selectedItem ? { defaultValue: selectedItem.description } : {}),
        },
        {
            label: 'Remarks',
            name: 'remarks',
            type: 'textarea',
            placeholder: 'Give remarks for the item',
            required: false,
            ...(selectedItem ? { defaultValue: selectedItem.remarks } : {}),
        },
        {
            label: 'Initial Cost Per Unit',
            name: 'initial_item_cost',
            type: 'number',
            placeholder: 'Enter cost per unit',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.initial_item_cost } : {}),
        },
        {
            label: 'Initial Total Cost',
            name: 'initial_total_cost',
            type: 'number',
            placeholder: 'Enter total cost',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.initial_total_cost } : {}),
        },
        {
            label: 'Minimum Order Quantity',
            name: 'minimum_order_quantity',
            type: 'number',
            placeholder: 'Enter minimum order quantity',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.minimum_order_quantity } : {}),
        },
        {
            label: 'Item Category',
            name: 'category',
            type: 'dropdown',
            placeholder: 'Select Item Category',
            options: dropdownOptions?.categoryOptions || [],
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.category } : {}),
        },
        {
            label: 'Item Subcategory',
            name: 'subcategory',
            type: 'dropdown',
            placeholder: 'Select Item Subcategory',
            options: dropdownOptions?.subCategoryOptions || [],
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.subcategory } : {}),
        },
        {
            label: 'Purchase Price (Exclusive Tax)',
            name: 'purchase_price',
            type: 'number',
            placeholder: 'Enter purchase price',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.purchase_price } : {}),
        },
        {
            label: 'Purchase Price (Inclusive Tax)',
            name: 'purchase_price_tax',
            type: 'number',
            placeholder: 'Enter purchase price',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.purchase_price_tax } : {}),
        },
        {
            label: 'Sale Price (Exclusive Tax)',
            name: 'sale_price',
            type: 'number',
            placeholder: 'Enter sale price',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.sale_price } : {}),
        },
        {
            label: 'Sale Price (Inclusive Tax)',
            name: 'sale_price_tax',
            type: 'number',
            placeholder: 'Enter sale price',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.sale_price_tax } : {}),
        },
        {
            label: 'Default Discount %',
            name: 'discount_percent',
            type: 'number',
            placeholder: 'Enter discount %',
            required: true,
            ...(selectedItem ? { defaultValue: selectedItem.discount_percent } : {}),
        },
        {
            label: 'As of Date',
            name: 'as_of_date',
            type: 'date',
            placeholder: 'Set as of date',
            required: false,
            defaultValue: new Date(selectedItem?.as_of_date || Date()).toJSON().slice(0, 10),
        },
    ];
};
