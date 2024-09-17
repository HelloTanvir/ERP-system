'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { authFormSubmit } from '../_lib/actions';
import { getFormFields, PageType } from '../_lib/utils';
import { SubmitButton } from './SubmitButton';

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
                return { error: currentFormState.error };
            }

            return { success: currentFormState.success };
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

            <form
                action={formSubmitAction}
                className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8"
            >
                {getFormFields(page).map((field) => (
                    <div key={field.name} className="relative">
                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                            {field.label}
                        </p>
                        <input
                            placeholder={field.placeholder}
                            type={field.type}
                            name={field.name}
                            minLength={field.minLength}
                            required={field.required}
                            className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md text-black autofill:text-black"
                        />
                        {authFormState.error?.[field.name] && (
                            <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">
                                {authFormState.error?.[field.name]}
                            </p>
                        )}
                    </div>
                ))}
                <div className="relative">
                    {page === 'login' && (
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none flex mb-2 -mt-2"
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
                                    Remember me for 30 days
                                </label>
                            </div>
                        )}

                        {page === 'login' && (
                            <Link
                                href="/auth/signup"
                                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none"
                            >
                                Create an account
                            </Link>
                        )}

                        {page === 'signup' && (
                            <Link
                                href="/auth/login"
                                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none ml-auto"
                            >
                                Already have an account?
                            </Link>
                        )}

                        {page === 'forgot-password' && (
                            <Link
                                href="/auth/login"
                                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none ml-auto"
                            >
                                Back to login
                            </Link>
                        )}
                    </div>

                    <SubmitButton label={page[0].toUpperCase() + page.slice(1).toLowerCase()} />
                </div>
            </form>
        </>
    );
}

export default Form;
