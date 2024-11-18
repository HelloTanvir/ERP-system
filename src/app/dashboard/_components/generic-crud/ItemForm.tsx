'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useFormState } from 'react-dom';
import { GenericItem } from '../../_lib/utils';

interface ItemFormProps<T extends GenericItem> {
    fields: InputField[];
    currentItem: T | null;
    handleSubmit: (item: T) => Promise<FormState>;
    closeModal: () => void;
}

function ItemForm<T extends GenericItem>({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps<T>>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const formObject: {
                [key: string]: FormDataEntryValue;
            } = {};
            if (currentItem?.id) formObject.id = currentItem.id as FormDataEntryValue;
            formData.forEach((value, key) => {
                if (key.includes('.')) {
                    const [objectKey, objectField] = key.split('.');
                    if (!formObject[objectKey]) formObject[objectKey] = {};
                    formObject[objectKey][objectField] = value;
                } else {
                    formObject[key] = value;
                }
            });

            const currentFormState = await handleSubmit(formObject as unknown as T);

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
                {fields.map((field) => (
                    <div
                        key={field.name}
                        className={field.fullWidth || field.sectionLabel ? 'col-span-2' : ''}
                    >
                        <Input field={field} error={itemFormState.errors?.[field.name]} />
                    </div>
                ))}
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
