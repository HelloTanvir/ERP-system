'use client';

function SecondaryButton({ label, action }: Readonly<{ label?: string; action: () => void }>) {
    return (
        <button
            type="button"
            onClick={action}
            className="w-full inline-block py-2 px-4 text-lg font-medium text-center border border-primary text-primary rounded-btn-radius transition duration-200 hover:text-indigo-600 hover:border-indigo-600 ease"
        >
            {label ?? 'Submit'}
        </button>
    );
}

export default SecondaryButton;
