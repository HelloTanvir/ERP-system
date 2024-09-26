'use client';

import { ReactNode, useRef } from 'react';

interface ModalProps {
    modalOpenerTitle: ReactNode;
    modalTitle: string;
    modalBody: ReactNode;
}

function Modal({ modalOpenerTitle, modalTitle, modalBody }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef && typeof modalRef !== 'function' && modalRef.current) {
            modalRef.current.close();
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
            >
                {modalOpenerTitle}
            </button>

            <div>
                <dialog className="modal md:relative" ref={modalRef}>
                    <div className="modal-box md:absolute md:right-10 md:top-10 max-w-[44rem] rounded-lg p-6">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
                        >
                            ✕
                        </button>

                        <div>
                            <h1 className="text-xl text-purple-700 mb-2">{modalTitle}</h1>
                            <hr />
                        </div>

                        {modalBody}

                        <div className="flex gap-2 justify-end text-center mt-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn  btn-sm transition duration-500 text-purple-600 hover:bg-purple-500 hover:text-white hover:purple-cyan-300 btn-outline font-bold  px-6 rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn  btn-sm transition duration-500 bg-purple-500  text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md  px-8"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default Modal;
