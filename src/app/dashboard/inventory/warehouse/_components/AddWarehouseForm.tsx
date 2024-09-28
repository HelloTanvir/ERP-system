import Input from '@/app/_components/Input';
import { InputField } from '@/app/_lib/utils';
import { addWarehouseItem } from '../_lib/action';

const inputFields: InputField[] = [
    {
        label: 'Warehouse Name',
        name: 'warehouse',
        type: 'text',
        placeholder: 'Enter warehouse name',
        required: true,
    },
    {
        label: 'Warehouse Address/Other Details',
        name: 'wareAddress',
        type: 'textarea',
        placeholder: 'Enter warehouse address/other details',
        required: true,
    },
];

function AddWarehouseForm() {
    return (
        <form action={addWarehouseItem} className="flex flex-col gap-6">
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

export default AddWarehouseForm;
