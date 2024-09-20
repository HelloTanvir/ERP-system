'use client';

import { useFormStatus } from 'react-dom';

interface SecondaryButtonProps {
    label?: string;
    disabled?: boolean;
}

function SecondaryButton({ label, disabled }: SecondaryButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || disabled}
            className="w-full inline-block py-2 px-4 text-lg font-medium text-center border border-primary text-primary rounded-btn-radius transition duration-200 hover:text-indigo-600 hover:border-indigo-600 ease disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-400"
        >
            {label ?? 'Submit'}
        </button>
    );
}

export default SecondaryButton;
