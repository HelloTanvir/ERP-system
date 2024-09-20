'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
    label?: string;
    disabled?: boolean;
    variant?: 'filled' | 'outlined';
}

const variantClasses = {
    filled: 'w-full inline-block py-2 px-4 text-lg font-medium text-center text-white bg-primary rounded-btn-radius transition duration-200 hover:bg-indigo-600 ease disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-400',
    outlined:
        'w-full inline-block py-2 px-4 text-lg font-medium text-center border border-primary text-primary rounded-btn-radius transition duration-200 hover:text-indigo-600 hover:border-indigo-600 ease disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-400',
};

function Button({ label = 'Submit', disabled, variant = 'filled' }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending || disabled} className={variantClasses[variant]}>
            {label}
        </button>
    );
}

export default Button;
