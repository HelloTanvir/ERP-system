'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ label }: Readonly<{ label?: string }>) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full inline-block py-2 px-4 text-lg font-medium text-center text-white bg-primary rounded-btn-radius transition duration-200 hover:bg-indigo-600 ease"
        >
            {label ?? 'Submit'}
        </button>
    );
}
