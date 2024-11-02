'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useFormState } from 'react-dom';
import InventoryItemsSelect from '../../_components/InventoryItemsSelect';
import { IInventoryTransfer, IInventoryTransferItem } from '../_lib/utils';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IInventoryTransfer | null;
    handleSubmit: (item: IInventoryTransfer) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function InventoryTransferForm({
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
            const inventoryTransfer = {} as IInventoryTransfer;
            if (currentItem?.id) inventoryTransfer.id = currentItem.id;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;

                if (!key.includes('$ACTION_ID_') && !['item_id', 'item_quantity'].includes(key))
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    inventoryTransfer[key] = value;
            });

            const items: IInventoryTransferItem[] = [];
            const itemIds = formData.getAll('item_id');
            const itemQuantities = formData.getAll('item_quantity');
            if (itemIds.length > 0 && itemIds.length === itemQuantities.length) {
                for (let i = 0; i < itemIds.length; i++) {
                    items.push({
                        id: itemIds[i] as unknown as number,
                        quantity: itemQuantities[i] as unknown as number,
                    } as IInventoryTransferItem);
                }
            }

            if (items.length > 0) inventoryTransfer.items = items;

            const currentFormState = await handleSubmit(inventoryTransfer);

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
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof IInventoryTransfer]
                                    ? {
                                          defaultValue:
                                              currentItem[field.name as keyof IInventoryTransfer],
                                      }
                                    : {}),
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
                    </div>
                ))}

                <div className="col-span-2">
                    <InventoryItemsSelect />
                </div>
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

export default InventoryTransferForm;
