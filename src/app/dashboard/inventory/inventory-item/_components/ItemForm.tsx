'use client';

import Input from '@/app/_components/Input';
import { useFormState } from 'react-dom';
import { addInventoryItem } from '../_lib/actions';
import { getInputFields, InventoryCreationDropdownOptions, InventoryItem } from '../_lib/utils';
import InventoryOnlyFields from './InventoryOnlyFields';

interface Props {
    dropdownOptions: InventoryCreationDropdownOptions;
    selectedItem?: InventoryItem;
    closeModal: () => void;
}

interface FormState {
    errors: {
        [key: string]: string;
    } | null;
    success: boolean;
}

function ItemForm({ dropdownOptions, selectedItem, closeModal }: Readonly<Props>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const currentFormState = await addInventoryItem(formData);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className="overflow-y-auto max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {getInputFields({ dropdownOptions, selectedItem }).map((field) => (
                    <div
                        key={field.name}
                        className={
                            ['description', 'remarks'].includes(field.name) ? 'col-span-2' : ''
                        }
                    >
                        <Input field={field} error={itemFormState.errors?.[field.name]} />
                    </div>
                ))}
                <InventoryOnlyFields
                    warehouseOptions={dropdownOptions?.warehouseOptions || []}
                    selectedItem={selectedItem}
                    errors={itemFormState.errors}
                />
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    onClick={closeModal}
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

export default ItemForm;
