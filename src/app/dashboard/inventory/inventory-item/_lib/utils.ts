import { DropdownSelectOption } from '@/app/_lib/utils';

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
}
