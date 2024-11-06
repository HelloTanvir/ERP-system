'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useFormState } from 'react-dom';
import { IMoldTimeSheet } from '../_lib/utils';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IMoldTimeSheet | null;
    handleSubmit: (item: IMoldTimeSheet) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function MoldTimeSheetForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const moldRegister = {} as IMoldTimeSheet;
            if (currentItem?.id) moldRegister.id = currentItem.id;

            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;
                if (!key.includes('$ACTION_ID_')) moldRegister[key] = value;
            });

            console.log(moldRegister);

            const currentFormState = await handleSubmit(moldRegister);

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
            <div className=" max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
                        <Input
                            field={{
                                ...field,
                                placeholder: field.label, // Placeholder only
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-sm text-purple-600 hover:bg-purple-500 hover:text-white btn-outline font-bold px-6 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-sm bg-purple-500 text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default MoldTimeSheetForm;
