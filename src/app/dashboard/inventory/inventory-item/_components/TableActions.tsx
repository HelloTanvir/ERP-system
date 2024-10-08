'use client';

import Modal from '@/app/dashboard/_components/Modal';
import useModal from '@/app/dashboard/_hooks/useModal';
import { deleteInventoryItem } from '../_lib/actions';
import { InventoryCreationDropdownOptions, InventoryItem } from '../_lib/utils';
import ItemForm from './ItemForm';

interface Props {
    item: InventoryItem;
    dropdownOptions: InventoryCreationDropdownOptions;
}

function TableActions({ item, dropdownOptions }: Readonly<Props>) {
    const { modalRef, isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <div className="flex gap-2 justify-end">
                <button
                    type="button"
                    className="btn btn-ghost btn-sm text-blue-400"
                    onClick={openModal}
                >
                    Edit
                </button>

                <form action={deleteInventoryItem}>
                    <input hidden name="id" value={item.id} readOnly />
                    <button type="submit" className="btn btn-ghost btn-sm text-red-400">
                        Delete
                    </button>
                </form>
            </div>

            <Modal ref={modalRef}>
                <div className="mb-6">
                    <h1 className="text-xl text-purple-700 mb-2">
                        Create Inventory or Non Inventory Item
                    </h1>
                    <hr />
                </div>
                <ItemForm
                    selectedItem={isOpen ? item : null}
                    dropdownOptions={dropdownOptions}
                    closeModal={closeModal}
                />
            </Modal>
        </>
    );
}

export default TableActions;
