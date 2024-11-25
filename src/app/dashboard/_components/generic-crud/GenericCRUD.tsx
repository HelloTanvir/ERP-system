'use client';

import { FormState, InputField } from '@/app/_lib/utils';
import { ElementType, ReactNode, useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import useModal from '../../_hooks/useModal';
import { GenericItem, SearchField } from '../../_lib/utils';
import Modal from '../Modal';
import ItemDetailView from './ItemDetailView';
import ItemForm from './ItemForm';
import ItemTable from './ItemTable';
import Pagination from './Pagination';
import SearchInTable from './SearchInTable';

type SearchConfig =
    | {
          withoutSearch: true;
      }
    | {
          withoutSearch?: false;
          fields: SearchField[];
      };

type FormConfig<T extends GenericItem> =
    | { noAction: true }
    | ({ noAction?: false } & {
          createItem: (item: Omit<T, 'id'>) => Promise<FormState>;
          additionalActions?: ReactNode;
          maxWidth?: number;
      } & (
              | {
                    fields: InputField[];
                }
              | {
                    fields?: never;
                    CustomItemForm: ElementType;
                    customItemFormProps?: {
                        [key: string]: any;
                    };
                }
          ));

type TableConfig<T extends GenericItem> = {
    tableColumns: string[];
    tableRows: ReactNode[][];
    items: T[];
    totalItemsCount: number;
} & (
    | { noTableAction: true }
    | {
          noTableAction?: false;
          noView?: boolean;
          CustomDetailView?: ElementType;
          customDetailViewProps?: {
              [key: string]: any;
          };
          updateItem: (item: T) => Promise<FormState>;
          deleteItem: (id: T['id']) => Promise<void>;
      }
);

interface ModalTitles {
    create: string;
    edit: string;
}

interface GenericCRUDProps<T extends GenericItem> {
    pageTitle: string;
    width?: number;
    searchConfig?: SearchConfig;
    tableConfig: TableConfig<T>;
    formConfig: FormConfig<T>;
    modalTitles?: ModalTitles;
}

function GenericCRUD<T extends GenericItem>({
    pageTitle,
    width,
    searchConfig,
    tableConfig,
    formConfig,
    modalTitles,
}: Readonly<GenericCRUDProps<T>>) {
    const { modalRef, openModal, closeModal: _closeModal, isOpen } = useModal();
    const [currentItem, setCurrentItem] = useState<T | null>(null);
    const [isViewing, setIsViewing] = useState<boolean>(false);

    const cleanUpCurrentItem = () => {
        setCurrentItem(null);
        setIsViewing(false);
    };

    const closeModal = () => _closeModal(cleanUpCurrentItem);

    useEffect(() => {
        if (!isOpen) {
            cleanUpCurrentItem();
        }
    }, [isOpen]);

    const handleViewItem = (item: T) => {
        if (tableConfig.noView) return;
        setCurrentItem(item);
        setIsViewing(true);
        openModal();
    };

    const handleAddItem = () => {
        setCurrentItem(null);
        openModal();
    };

    const handleEditItem = (item: T) => {
        setCurrentItem(item);
        openModal();
    };

    const handleDeleteItem = async (formData: FormData) => {
        if (tableConfig.noTableAction) return;

        const id: T['id'] = formData.get('id') as unknown as string;

        // eslint-disable-next-line no-alert, no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
            await tableConfig.deleteItem(id);
        }
    };

    const handleSubmit = async (item: T, endpoint?: string): Promise<FormState> => {
        let formState: FormState | undefined;

        if (currentItem) {
            if (tableConfig.noTableAction) return { success: false, errors: null };
            formState = await tableConfig.updateItem(item, endpoint);
        } else {
            if (formConfig.noAction) return { success: false, errors: null };
            formState = await formConfig.createItem(item as Omit<T, 'id'>, endpoint);
        }

        return formState;
    };

    const renderModalContent = () => {
        if (isViewing && currentItem) {
            if (tableConfig.CustomDetailView) {
                return (
                    <tableConfig.CustomDetailView
                        currentItem={currentItem}
                        {...tableConfig.customDetailViewProps}
                    />
                );
            }

            return <ItemDetailView currentItem={currentItem} />;
        }

        return (
            <>
                <div className="mb-6">
                    <h1 className="text-xl text-purple-700 mb-2">
                        {currentItem ? modalTitles?.edit : modalTitles?.create}
                    </h1>
                    <hr />
                </div>
                {!formConfig.noAction && !formConfig.fields && formConfig.CustomItemForm ? (
                    <formConfig.CustomItemForm
                        key={`${isOpen}`}
                        currentItem={currentItem}
                        handleSubmit={handleSubmit}
                        closeModal={closeModal}
                        {...formConfig.customItemFormProps}
                    />
                ) : (
                    !formConfig.noAction &&
                    formConfig.fields && (
                        <ItemForm
                            key={`${isOpen}`}
                            fields={
                                currentItem
                                    ? formConfig.fields.map((field) => ({
                                          ...field,
                                          defaultValue: currentItem[field.name],
                                      }))
                                    : formConfig.fields
                            }
                            currentItem={currentItem}
                            handleSubmit={handleSubmit}
                            closeModal={closeModal}
                        />
                    )
                )}
            </>
        );
    };

    return (
        <>
            <div className="flex flex-col gap-6" style={{ width }}>
                <div className="flex justify-between border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg ">
                    <h3 className="text-2xl text-purple-700  font-semibold">{pageTitle}</h3>

                    {!formConfig.noAction && (
                        <div className="flex gap-2">
                            {formConfig.additionalActions}

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

                {!searchConfig?.withoutSearch && <SearchInTable fields={searchConfig?.fields} />}

                <div className="overflow-x-auto">
                    <ItemTable
                        items={tableConfig.items}
                        tableColumns={tableConfig.tableColumns}
                        tableRows={tableConfig.tableRows}
                        noTableAction={tableConfig.noTableAction}
                        noView={tableConfig.noView}
                        handleViewItem={handleViewItem}
                        handleEditItem={handleEditItem}
                        handleDeleteItem={handleDeleteItem}
                    />
                </div>

                <Pagination totalItemsCount={tableConfig.totalItemsCount} />
            </div>

            {(!formConfig.noAction || !tableConfig.noTableAction) && (
                <Modal ref={modalRef} maxWidth={!formConfig.noAction && formConfig.maxWidth}>
                    {renderModalContent()}
                </Modal>
            )}
        </>
    );
}

export default GenericCRUD;
