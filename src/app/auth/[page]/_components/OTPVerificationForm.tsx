'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { authFormSubmit, sendOtp } from '../_lib/actions';
import { ACTION_BUTTON_LABEL, getFormFields, OTP_RESEND_TIME } from '../_lib/utils';
import ActionButton from './ActionButton';
import OtpInput from './OtpInput';
import SecondaryButton from './SecondaryButton';

interface FormState {
    error: {
        [key: string]: string;
    } | null;
    success: boolean;
}

function OTPVerificationForm() {
    const page = 'otp-verification';
    const [timeLeft, setTimeLeft] = useState(OTP_RESEND_TIME);

    const initialFormState: FormState = {
        error: null,
        success: false,
    };

    const initialOtpResendState: {
        success: boolean;
    } = {
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
        initialFormState
    );

    const [otpResendState, sendOtpAction] = useFormState(async () => {
        await sendOtp();
        setTimeLeft(OTP_RESEND_TIME);

        return { success: true };
    }, initialOtpResendState);

    useEffect(() => {
        // Timer countdown logic
        const timerInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 0) return prev - 1;
                clearInterval(timerInterval); // Stop the timer when it reaches zero
                return 0;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [otpResendState]);

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
                    <OtpInput
                        key={field.name}
                        field={field}
                        error={authFormState.error?.[field.name]}
                        timeLeft={timeLeft}
                    />
                ))}

                <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            href="/auth/login"
                            className="text-xs text-link hover:text-indigo-700 focus:outline-none ml-auto"
                        >
                            Back to login
                        </Link>
                    </div>

                    <ActionButton label={ACTION_BUTTON_LABEL[page]} disabled={timeLeft <= 0} />
                </div>
            </form>

            <form action={sendOtpAction} className="mt-4">
                <SecondaryButton label="Send again" disabled={timeLeft > 0} />
            </form>
        </>
    );
}

export default OTPVerificationForm;
