'use client';

import { useFormStatus } from 'react-dom';

interface ActionButtonProps {
    label?: string;
    disabled?: boolean;
}

function ActionButton({ label, disabled }: ActionButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || disabled}
            className="w-full inline-block py-2 px-4 text-lg font-medium text-center text-white bg-primary rounded-btn-radius transition duration-200 hover:bg-indigo-600 ease disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
            {label ?? 'Submit'}
        </button>
    );
}

export default ActionButton;
