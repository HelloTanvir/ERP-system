'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ label }: Readonly<{ label?: string }>) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
        >
            {label ?? 'Submit'}
        </button>
    );
}
