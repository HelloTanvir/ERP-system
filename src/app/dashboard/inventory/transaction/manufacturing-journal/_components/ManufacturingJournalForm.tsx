'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import InventoryItemsSelect from '../../_components/InventoryItemsSelect';
import { IManufacturingJournal } from '../_lib/utils';

interface ItemFormProps {
    manufacturingTemplateFields: InputField[];
    billOfMaterialFields: InputField[];
    currentItem: IManufacturingJournal | null;
    handleSubmit: (item: IManufacturingJournal) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

type JournalType = 'manufacturing_template' | 'bill_of_material';

function ManufacturingJournalForm({
    manufacturingTemplateFields,
    billOfMaterialFields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const fields = {
        manufacturing_template: manufacturingTemplateFields,
        bill_of_material: billOfMaterialFields,
    };
    const [journalType, setJournalType] = useState<JournalType>('manufacturing_template');

    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const manufacturingJournal = {} as IManufacturingJournal;
            if (currentItem?.id) manufacturingJournal.id = currentItem.id;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;

                if (!key.includes('$ACTION_ID_'))
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    manufacturingJournal[key] = value;
            });

            if (journalType === 'manufacturing_template') {
                manufacturingJournal.is_template = true;
            }

            const currentFormState = await handleSubmit(manufacturingJournal);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    return (
        <div>
            <div className="flex rounded-md p-1 mb-3 bg-gray-200">
                <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none ${journalType === 'manufacturing_template' ? 'bg-white rounded-md' : 'bg-transparent rounded-none'}`}
                    onClick={() => setJournalType('manufacturing_template')}
                >
                    Manufacturing Template
                </button>

                <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none ${journalType === 'bill_of_material' ? 'bg-white rounded-md' : 'bg-transparent rounded-none'}`}
                    onClick={() => setJournalType('bill_of_material')}
                >
                    Bill of Material
                </button>
            </div>

            <form action={formSubmitAction} className="flex flex-col gap-6">
                <div className="max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                    {fields[journalType].map((field) => (
                        <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                            <Input
                                field={{
                                    ...field,
                                    ...(currentItem?.[field.name as keyof IManufacturingJournal]
                                        ? {
                                              defaultValue:
                                                  currentItem[
                                                      field.name as keyof IManufacturingJournal
                                                  ],
                                          }
                                        : {}),
                                }}
                                error={itemFormState.errors?.[field.name]}
                            />
                        </div>
                    ))}

                    <div className="col-span-2">
                        <InventoryItemsSelect title="Consumed Item" />
                    </div>

                    <div className="col-span-2">
                        <InventoryItemsSelect title="Manufactured Item" />
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
        </div>
    );
}

export default ManufacturingJournalForm;
