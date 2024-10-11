'use client';

import { forwardRef, ReactNode } from 'react';

export interface ModalProps {
    children: ReactNode;
    maxWidth?: number;
}

const Modal = forwardRef<HTMLDialogElement, Readonly<ModalProps>>(({ children, maxWidth }, ref) => {
    return (
        <dialog className="modal md:relative" ref={ref}>
            <div
                className="modal-box md:absolute md:right-10 md:top-10 max-w-[44rem] rounded-lg p-6"
                style={maxWidth ? { maxWidth } : {}}
            >
                <button
                    type="button"
                    data-modal-close
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
                >
                    ✕
                </button>

                {children}
            </div>
        </dialog>
    );
});

export default Modal;
