'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import Input from '@/app/_components/Input';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { authFormSubmit } from '../_lib/actions';
import { ACTION_BUTTON_LABEL, getFormFields, PageType } from '../_lib/utils';
import ActionButton from './ActionButton';

interface Props {
    page: PageType;
}

interface FormState {
    error: {
        [key: string]: string;
    } | null;
    success: boolean;
}

function Form({ page }: Readonly<Props>) {
    const initialState: FormState = {
        error: null,
        success: false,
    };

    const [authFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const currentFormState = await authFormSubmit(page, formData);

            if (currentFormState.error) {
                return { error: currentFormState.error, success: false };
            }

            return { success: currentFormState.success, error: null };
        },
        initialState
    );

    return (
        <>
            {authFormState.error?.global && (
                <div className="rounded-md py-3 px-5 bg-red-100 border border-red-500 w-full mt-3">
                    <p className="text-red-500 font-semibold text-sm">
                        {authFormState.error.global}
                    </p>
                </div>
            )}

            <form action={formSubmitAction} className="w-full mt-6 relative space-y-8">
                {getFormFields(page).map((field) => (
                    <Input
                        key={field.name}
                        field={field}
                        error={authFormState.error?.[field.name]}
                    />
                ))}
                <div className="relative">
                    {page === 'login' && (
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs text-link opacity-80 hover:opacity-100 focus:outline-none flex mb-2 -mt-2"
                        >
                            Forgot Password?
                        </Link>
                    )}

                    <div className="flex items-center justify-between mb-4">
                        {page === 'login' && (
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                >
                                    Remember me
                                </label>
                            </div>
                        )}

                        {page === 'login' && (
                            <Link
                                href="/auth/signup"
                                className="text-xs text-link hover:text-indigo-700 focus:outline-none"
                            >
                                Create an account
                            </Link>
                        )}

                        {page === 'signup' && (
                            <Link
                                href="/auth/login"
                                className="text-xs text-link hover:text-indigo-700 focus:outline-none ml-auto"
                            >
                                Already have an account?
                            </Link>
                        )}

                        {['forgot-password', 'reset-password'].includes(page) && (
                            <Link
                                href="/auth/login"
                                className="text-xs text-link hover:text-indigo-700 focus:outline-none ml-auto"
                            >
                                Back to login
                            </Link>
                        )}
                    </div>

                    <ActionButton label={ACTION_BUTTON_LABEL[page]} />
                </div>
            </form>
        </>
    );
}

export default Form;
