'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import Modal from '@/app/dashboard/_components/Modal';
import useModal from '@/app/dashboard/_hooks/useModal';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { LuPlus } from 'react-icons/lu';
import { createCategoryOrSubCategory } from '../_lib/actions';
import { ActionType } from '../_lib/utils';

enum MODAL_TITLES {
    'category-create' = 'Create Item Category',
    'subcategory-create' = 'Create Item Subcategory',
}

function AdditionalActions() {
    const { modalRef, openModal, closeModal } = useModal();
    const [actionType, setActionType] = useState<ActionType>('category-create');
    const fields: {
        'category-create': InputField[];
        'subcategory-create': InputField[];
    } = {
        'category-create': [
            {
                label: 'Category Name',
                name: 'name',
                type: 'text',
                placeholder: 'Enter category name',
                required: true,
            },
        ],
        'subcategory-create': [
            {
                label: 'Category',
                name: 'category',
                type: 'dropdown',
                placeholder: 'Select Item Category',
                optionsGetUrl: 'inventory/category/',
                optionsFilterQuery: 'name__icontains',
                required: true,
            },
            {
                label: 'Subcategory Name',
                name: 'name',
                type: 'text',
                placeholder: 'Enter subcategory name',
                required: true,
            },
        ],
    };

    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [formState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const currentFormState = await createCategoryOrSubCategory(actionType, formData);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const handleCreateCategory = () => {
        openModal();
        setActionType('category-create');
    };

    const handleCreateSubCategory = () => {
        openModal();
        setActionType('subcategory-create');
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-sm border border-[#682FE6] rounded-btn text-principal px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
                onClick={handleCreateCategory}
            >
                <LuPlus className="text-principal" /> Create Category
            </button>

            <button
                type="button"
                className="btn btn-sm border border-[#682FE6] rounded-btn text-principal px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
                onClick={handleCreateSubCategory}
            >
                <LuPlus className="text-principal" /> Create Subcategory
            </button>

            <Modal ref={modalRef} maxWidth={400}>
                <div className="mb-6">
                    <h1 className="text-xl text-purple-700 mb-2">{MODAL_TITLES[actionType]}</h1>
                    <hr />
                </div>

                <form action={formSubmitAction} className="flex flex-col gap-6">
                    <div className="overflow-y-auto max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                        {fields[actionType].map((field) => (
                            <div key={field.label} className="col-span-2">
                                <Input field={field} error={formState.errors?.[field.name]} />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 justify-end text-center">
                        <button
                            type="button"
                            onClick={() => closeModal()}
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
            </Modal>
        </>
    );
}

export default AdditionalActions;
