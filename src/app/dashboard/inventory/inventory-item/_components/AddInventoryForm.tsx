import Input from '@/app/_components/Input';
import { InputField } from '@/app/_lib/utils';
import { addInventoryItem } from '../_lib/actions';

const inputFields: InputField[] = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter inventory name',
        required: true,
    },
    {
        label: 'SKU',
        name: 'sku',
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
        name: 'unit',
        type: 'dropdown',
        placeholder: 'Select Unit of Measure',
        options: [
            'Grams (g)',
            'Kilograms (kg)',
            'Pounds (lb)',
            'Ounces (oz)',
            'Milliliters (ml)',
            'Liters (L)',
        ],
        required: true,
    },
    {
        label: 'Items Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Give a short description..',
        required: true,
    },
    {
        label: 'Initial Quantity on Hand',
        name: 'initial',
        type: 'number',
        placeholder: 'Enter initial quantity',
        required: true,
    },
    {
        label: 'As of Date',
        name: 'asDate',
        type: 'date',
        placeholder: 'Enter as of date',
        required: true,
    },
    {
        label: 'Initial Cost Per Unit',
        name: 'costPerUnit',
        type: 'number',
        placeholder: 'Enter cost per unit',
        required: true,
    },
    {
        label: 'Value',
        name: 'value',
        type: 'number',
        placeholder: 'Enter value',
        required: true,
    },
    {
        label: 'Minimum Order Quantity',
        name: 'quantity',
        type: 'number',
        placeholder: 'Enter quantity',
        required: true,
    },
    {
        label: 'Item Category',
        name: 'category',
        type: 'dropdown',
        placeholder: 'Select Item Category',
        options: ['Category 1', 'Category 2'],
        required: true,
    },
    {
        label: 'Item Subcategory',
        name: 'subcategory',
        type: 'dropdown',
        placeholder: 'Select Item Subcategory',
        options: ['Subcategory 1', 'Subcategory 2'],
        required: true,
    },
    {
        label: 'Default Tax Account',
        name: 'taxAccount',
        type: 'dropdown',
        placeholder: 'Select Default Tax Account',
        options: ['Account 1', 'Account 2'],
        required: true,
    },
    {
        label: 'Additional Cess',
        name: 'additional',
        type: 'number',
        placeholder: 'Enter quantity',
        required: true,
    },
    {
        label: 'Exclusive Tax',
        name: 'exTax',
        type: 'number',
        placeholder: 'Enter Exclusive Tax',
        required: true,
    },
    {
        label: 'Inclusive Tax',
        name: 'inTax',
        type: 'number',
        placeholder: 'Enter inclusive tax',
        required: true,
    },
    {
        label: 'Purchase Price',
        name: 'purPrice',
        type: 'number',
        placeholder: 'Enter purchase price',
        required: true,
    },
    {
        label: 'Sale Price',
        name: 'salePrice',
        type: 'number',
        placeholder: 'Enter sale price',
        required: true,
    },
    {
        label: 'Default Discount %',
        name: 'discount',
        type: 'number',
        placeholder: 'Enter discount %',
        required: true,
    },
];

function AddInventoryForm() {
    return (
        <form action={addInventoryItem} className="flex flex-col gap-6">
            <div className="overflow-y-auto max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {inputFields.map((field) => (
                    <div key={field.name}>
                        <Input field={field} error="" />
                    </div>
                ))}
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
