'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { MeasurementUnit } from '../_lib/utils';

interface ItemFormProps {
    fields: InputField[];
    currentItem: MeasurementUnit | null;
    handleSubmit: (item: MeasurementUnit) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function UnitOfMeasureForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const [isCompound, setIsCompound] = useState(false);

    useEffect(() => {
        setIsCompound(!!currentItem?.is_compound);
    }, [currentItem]);

    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const measurementUnitItem = {} as MeasurementUnit;
            if (currentItem?.id) measurementUnitItem.id = currentItem.id;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;

                if (!key.includes('$ACTION_ID_'))
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    measurementUnitItem[key as keyof MeasurementUnit] = value;
            });

            const currentFormState = await handleSubmit(measurementUnitItem);

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
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof MeasurementUnit]
                                    ? {
                                          defaultValue:
                                              currentItem[field.name as keyof MeasurementUnit],
                                      }
                                    : {}),
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
                    </div>
                ))}

                <div className="col-span-2 flex items-center gap-2">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="font-medium text-gray-600" htmlFor="is_compound">
                        Is compound measurement?
                    </label>

                    <input
                        id="is_compound"
                        type="checkbox"
                        name="is_compound"
                        required={false}
                        checked={isCompound}
                        onChange={(e) => setIsCompound(e.target.checked)}
                    />
                </div>

                {isCompound && (
                    <>
                        <div>
                            <Input
                                field={
                                    {
                                        label: 'Conversion Rate',
                                        name: 'conversion_rate',
                                        type: 'text',
                                        placeholder: 'Enter Conversion Rate',
                                        required: true,
                                        ...(currentItem?.conversion_rate
                                            ? {
                                                  defaultValue: currentItem.conversion_rate,
                                              }
                                            : {}),
                                    } as InputField
                                }
                                error={itemFormState.errors?.conversion_rate}
                            />
                        </div>

                        <div>
                            <Input
                                field={
                                    {
                                        label: 'Parent Unit',
                                        name: 'parent_unit',
                                        type: 'text',
                                        placeholder: 'Enter Parent Unit',
                                        required: true,
                                        ...(currentItem?.parent_unit
                                            ? {
                                                  defaultValue: currentItem.parent_unit,
                                              }
                                            : {}),
                                    } as InputField
                                }
                                error={itemFormState.errors?.parent_unit}
                            />
                        </div>
                    </>
                )}
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

export default UnitOfMeasureForm;
