import Input from '@/app/_components/Input';
import { InputField } from '@/app/_lib/utils';
import { addInventoryItem, getInventoryAddFormDropdownOptions } from '../_lib/actions';
import { InventoryCreationDropdownOptions } from '../_lib/utils';
import InventoryOnlyFields from './InventoryOnlyFields';

const getInputFields = ({
    unitOfMeasureOptions,
    categoryOptions,
    subCategoryOptions,
}: InventoryCreationDropdownOptions): InputField[] => [
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
        options: unitOfMeasureOptions,
        required: true,
    },
    {
        label: 'Items Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Give a short description..',
        required: false,
    },
    {
        label: 'Remarks',
        name: 'remarks',
        type: 'textarea',
        placeholder: 'Give remarks for the item',
        required: false,
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
        label: 'Minimum Order Quantity',
        name: 'minimum_order_quantity',
        type: 'number',
        placeholder: 'Enter minimum order quantity',
        required: true,
    },
    {
        label: 'Item Category',
        name: 'category',
        type: 'dropdown',
        placeholder: 'Select Item Category',
        options: categoryOptions,
        required: true,
    },
    {
        label: 'Item Subcategory',
        name: 'subcategory',
        type: 'dropdown',
        placeholder: 'Select Item Subcategory',
        options: subCategoryOptions,
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
        label: 'As of Date',
        name: 'as_of_date',
        type: 'date',
        placeholder: 'Set as of date',
        required: false,
        defaultValue: new Date().toLocaleDateString('en-CA'),
    },
];

async function AddInventoryForm() {
    const dropdownOptions = await getInventoryAddFormDropdownOptions();

    return (
        <form action={addInventoryItem} className="flex flex-col gap-6">
            <div className="overflow-y-auto max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {getInputFields(dropdownOptions).map((field) => (
                    <div
                        key={field.name}
                        className={
                            ['description', 'remarks'].includes(field.name) ? 'col-span-2' : ''
                        }
                    >
                        <Input field={field} error="" />
                    </div>
                ))}
                <InventoryOnlyFields warehouseOptions={dropdownOptions.warehouseOptions} />
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    data-modal-close
                    className="btn btn-sm transition duration-500 text-purple-600 hover:bg-purple-500 hover:text-white hover:purple-cyan-300 btn-outline font-bold  px-6 rounded-md"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-sm transition duration-500 bg-purple-500  text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md  px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default AddInventoryForm;
