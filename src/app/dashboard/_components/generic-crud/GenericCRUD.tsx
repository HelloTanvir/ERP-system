'use client';

import { InputField } from '@/app/_lib/utils';
import { ReactNode, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import useModal from '../../_hooks/useModal';
import { GenericItem } from '../../_lib/utils';
import Modal from '../Modal';
import ItemForm from './ItemForm';
import ItemTable from './ItemTable';

interface GenericCRUDProps<T extends GenericItem> {
    pageTitle: string;
    width?: number;
    items: T[];
    fields: InputField[];
    modalTitles: {
        create: string;
        edit: string;
    };
    tableColumns: string[];
    tableRows: ReactNode[][];
    noAction?: boolean;
    noTableAction?: boolean;
    additionalActions?: ReactNode;
    createItem: (item: Omit<T, 'id'>) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    updateItem: (item: T) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    deleteItem: (id: T['id']) => Promise<void>;
}

function GenericCRUD<T extends GenericItem>({
    pageTitle,
    width,
    items,
    fields,
    modalTitles,
    tableColumns,
    tableRows,
    noAction,
    noTableAction,
    additionalActions,
    createItem,
    updateItem,
    deleteItem,
}: Readonly<GenericCRUDProps<T>>) {
    const { modalRef, openModal, closeModal } = useModal();
    const [currentItem, setCurrentItem] = useState<T | null>(null);

    const handleAddItem = () => {
        setCurrentItem(null);
        openModal();
    };

    const handleEditItem = (item: T) => {
        setCurrentItem(item);
        openModal();
    };

    const handleDeleteItem = async (formData: FormData) => {
        const id: T['id'] = formData.get('id');

        // eslint-disable-next-line no-alert, no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
            await deleteItem(id);
        }
    };

    const handleSubmit = async (item: T) => {
        let formState:
            | {
                  success: boolean;
                  errors: {
                      [key: string]: string;
                  };
              }
            | undefined;

        if (currentItem) {
            formState = await updateItem(item);
        } else {
            formState = await createItem(item as Omit<T, 'id'>);
        }

        return formState;
    };

    return (
        <>
            <div className="flex flex-col gap-6" style={{ width }}>
                <div className="flex justify-between border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg ">
                    <h3 className="text-2xl text-purple-700  font-semibold">{pageTitle}</h3>

                    {!noAction && (
                        <div className="flex gap-2">
                            {additionalActions}

                            <button
                                type="button"
                                className="btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
                                onClick={handleAddItem}
                            >
                                <LuPlus /> Create
                            </button>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <ItemTable
                        items={items}
                        tableColumns={tableColumns}
                        tableRows={tableRows}
                        noTableAction={noTableAction}
                        handleEditItem={handleEditItem}
                        handleDeleteItem={handleDeleteItem}
                    />
                </div>
            </div>

            <Modal ref={modalRef}>
                <div className="mb-6">
                    <h1 className="text-xl text-purple-700 mb-2">
                        {currentItem ? modalTitles.edit : modalTitles.create}
                    </h1>
                    <hr />
                </div>
                <ItemForm
                    fields={
                        currentItem
                            ? fields.map((field) => ({
                                  ...field,
                                  defaultValue: currentItem[field.name],
                              }))
                            : fields
                    }
                    currentItem={currentItem}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            </Modal>
        </>
    );
}

export default GenericCRUD;
