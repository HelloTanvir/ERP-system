'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useFormState } from 'react-dom';
import { Allocation, InventoryItem } from '../_lib/utils';
import CategoryAndSubCategorySelect from './CategoryAndSubCategorySelect';
import InventoryOnlyFields from './InventoryOnlyFields';

interface ItemFormProps {
    fields: InputField[];
    currentItem: InventoryItem | null;
    handleSubmit: (item: InventoryItem) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function InventoryItemForm({
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
            const inventoryItem = {} as InventoryItem;
            if (currentItem?.id) inventoryItem.id = currentItem.id;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;

                if (!key.includes('$ACTION_ID_') && !['warehouse', 'quantity'].includes(key))
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    inventoryItem[key] = value;
            });

            inventoryItem.is_inventory_item = !!inventoryItem.is_inventory_item;

            if (inventoryItem.is_inventory_item) {
                const allocations: Allocation[] = [];
                const allocationWarehouses = formData.getAll('warehouse');
                const allocationQuantities = formData.getAll('quantity');
                if (
                    allocationWarehouses.length > 0 &&
                    allocationWarehouses.length === allocationQuantities.length
                ) {
                    for (let i = 0; i < allocationWarehouses.length; i++) {
                        allocations.push({
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            warehouse: allocationWarehouses[i] as unknown as number,
                            quantity: allocationQuantities[i] as unknown as number,
                        });
                    }
                }

                if (allocations.length > 0) inventoryItem.allocations = allocations;
            }

            console.log({ inventoryItem });
            return { success: true, errors: null };

            const currentFormState = await handleSubmit(inventoryItem);

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
            <div className="max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof InventoryItem]
                                    ? {
                                          defaultValue:
                                              currentItem[field.name as keyof InventoryItem],
                                      }
                                    : {}),
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
                    </div>
                ))}
                <CategoryAndSubCategorySelect selectedItem={currentItem} />
                <InventoryOnlyFields selectedItem={currentItem} errors={itemFormState.errors} />
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

export default InventoryItemForm;
