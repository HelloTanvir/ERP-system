import Input from '@/app/_components/Input';
import { InputField } from '@/app/_lib/utils';

const inputFields: InputField[] = [
    {
        label: 'Service Name',
        name: 'service',
        type: 'text',
        placeholder: 'Enter Service name',
        required: true,
    },
    {
        label: 'SKU/SAC',
        name: 'sku',
        type: 'text',
        placeholder: 'Enter sku/sac',
        required: true,
    },
    {
        label: 'Service Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Give a short description..',
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
        label: 'Default Tax Account',
        name: 'taxAccount',
        type: 'dropdown',
        placeholder: 'Select Default Tax Account',
        options: ['Account 1', 'Account 2'],
        required: true,
    },
    {
        label: 'Remarks',
        name: 'remarks',
        type: 'text',
        placeholder: 'Enter remarks',
        required: true,
    },
];

function AddServiceForm() {
    return (
        <form className="flex flex-col gap-6">
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
                    type="button"
                    className="btn btn-sm transition duration-500 bg-purple-500  text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md  px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default AddServiceForm;
