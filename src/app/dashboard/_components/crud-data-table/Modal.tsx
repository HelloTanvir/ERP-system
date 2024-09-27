'use client';

import { ReactNode, useEffect, useRef } from 'react';

export interface ModalProps {
    modalOpenerTitle: {
        text: string;
        icon?: ReactNode;
        className?: string;
    };
    modalTitle: string;
    modalBody: ReactNode;
}

function Modal({ modalOpenerTitle, modalTitle, modalBody }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                (event.target === modalRef.current ||
                    event.target === modalRef.current.querySelector('button[data-modal-close]'))
            ) {
                modalRef.current.close();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
            <button type="button" onClick={openModal} className={modalOpenerTitle.className}>
                {modalOpenerTitle.icon}
                {modalOpenerTitle.text}
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

                        <div className="mb-6">
                            <h1 className="text-xl text-purple-700 mb-2">{modalTitle}</h1>
                            <hr />
                        </div>

                        {modalBody}
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default Modal;
