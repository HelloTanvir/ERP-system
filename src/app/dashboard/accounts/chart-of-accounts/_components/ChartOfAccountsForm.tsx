'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useFormState } from 'react-dom';
import { IChartOfAccount } from '../_lib/utils';
import SelectAccountTypeAndDetailType from './SelectAccountTypeAndDetailType';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IChartOfAccount | null;
    handleSubmit: (item: IChartOfAccount) => Promise<FormState>;
    closeModal: () => void;
}

function ChartOfAccountsForm({
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
            const account = {} as IChartOfAccount;

            if (currentItem?.id) account.id = currentItem.id;
            formData.forEach((value, key) => {
                if (!['account_type', 'detail_type', 'group_name'].includes(key))
                    account[key] = value;
            });

            const detailType = formData.get('detail_type') as string;
            account.category = detailType as unknown as IChartOfAccount['category']; // id of the detail type is the same as the category id

            const groupName = formData.get('group_name') as string;
            account.group = { ...currentItem?.group, name: groupName };

            const currentFormState = await handleSubmit(account);

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
                <SelectAccountTypeAndDetailType />
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
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

export default ChartOfAccountsForm;
