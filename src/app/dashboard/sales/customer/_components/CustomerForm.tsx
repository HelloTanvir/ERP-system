'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ICustomer } from '../_lib/utils';

interface CustomerFormProps {
    fields: InputField[];
    currentItem: ICustomer | null;
    handleSubmit: (item: ICustomer) => Promise<FormState>;
    closeModal: () => void;
}

function CustomerForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<CustomerFormProps>) {
    const [isShippingSameAsBilling, setIsShippingSameAsBilling] = useState<boolean>(true);

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

            if (isShippingSameAsBilling) {
                formObject.shipping_address = { ...formObject.billing_address };
            }

            const currentFormState = await handleSubmit(formObject as ICustomer);

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
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {field.sectionLabel === 'Shipping Address' ? (
                            <>
                                <Input field={field} error={itemFormState.errors?.[field.name]} />
                                <div className="flex items-center gap-2 my-2">
                                    <input
                                        id="shipping_address_same_as_billing"
                                        type="checkbox"
                                        checked={isShippingSameAsBilling}
                                        onChange={() =>
                                            setIsShippingSameAsBilling(!isShippingSameAsBilling)
                                        }
                                    />
                                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                    <label htmlFor="shipping_address_same_as_billing">
                                        Same as billing address
                                    </label>
                                </div>
                                {isShippingSameAsBilling && (
                                    <div className="text-sm text-gray-500">
                                        Shipping address is same as billing address
                                    </div>
                                )}
                            </>
                        ) : field.name.includes('shipping_address') &&
                          isShippingSameAsBilling ? null : (
                            <Input field={field} error={itemFormState.errors?.[field.name]} />
                        )}
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

export default CustomerForm;
