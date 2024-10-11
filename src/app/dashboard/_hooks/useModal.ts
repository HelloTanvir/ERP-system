'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';

const useModal = (): {
    modalRef: MutableRefObject<HTMLDialogElement | null>;
    isOpen: boolean;
    openModal: () => void;
    closeModal: (cleanUpFn?: () => void) => void;
} => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                (event.target === modalRef.current ||
                    event.target === modalRef.current.querySelector('button[data-modal-close]'))
            ) {
                modalRef.current.close();
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (modalRef?.current) {
            modalRef.current.style.height = isOpen ? 'auto' : '0';
        }
    }, [isOpen]);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
            setIsOpen(true);
        }
    };

    const closeModal = (cleanUpFn?: () => void) => {
        if (modalRef && typeof modalRef !== 'function' && modalRef.current) {
            cleanUpFn?.();
            modalRef.current.close();
            setIsOpen(false);
        }
    };

    return {
        modalRef,
        isOpen,
        openModal,
        closeModal,
    };
};

export default useModal;
