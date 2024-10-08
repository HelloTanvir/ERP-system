'use client';

import Modal from '@/app/dashboard/_components/Modal';
import useModal from '@/app/dashboard/_hooks/useModal';
import { LuImport, LuPlus } from 'react-icons/lu';
import { InventoryCreationDropdownOptions } from '../_lib/utils';
import ImportInventoryFromFile from './ImportInventoryFromFile';
import ItemForm from './ItemForm';

interface Props {
    itemFormDropdownOptions: InventoryCreationDropdownOptions;
}

function Actions({ itemFormDropdownOptions }: Readonly<Props>) {
    const { modalRef, openModal, closeModal } = useModal();

    return (
        <div className="flex gap-2">
            <button
                type="button"
                className="btn btn-sm rounded-md border-purple-700 text-purple-700 transition-all duration-500 hover:border-yellow-600 hover:text-yellow-600"
                onClick={openModal}
            >
                <LuImport /> Import
            </button>

            <Modal ref={modalRef}>
                <div className="mb-6">
                    <h1 className="text-xl text-purple-700 mb-2">Import csv, xls document</h1>
                    <hr />
                </div>
                <ImportInventoryFromFile closeModal={closeModal} />
            </Modal>

            <button
                type="button"
                className="btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
                onClick={openModal}
            >
                <LuPlus /> Create
            </button>

            <Modal ref={modalRef}>
                <div className="mb-6">
                    <h1 className="text-xl text-purple-700 mb-2">
                        Create Inventory or Non Inventory Item
                    </h1>
                    <hr />
                </div>
                <ItemForm dropdownOptions={itemFormDropdownOptions} closeModal={closeModal} />
            </Modal>
        </div>
    );
}

export default Actions;
