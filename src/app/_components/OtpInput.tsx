'use client';

import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { InputProps } from '../_lib/utils';
import { OTP_LENGTH } from '../auth/[page]/_lib/utils';

function OtpInput({ field, error }: InputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const [timeLeft, setTimeLeft] = useState<number>(120);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputRefs.current?.[0]?.focus();

        // Timer countdown logic
        const timerInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 0) return prev - 1;
                clearInterval(timerInterval); // Stop the timer when it reaches zero
                return 0;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    // Format time as MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        // Ensure only digits are allowed
        const value = e.target.value.replace(/\D/, '');
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            setOtp((prev) => {
                const newOtp = [...prev];
                newOtp[index] = '';
                return newOtp;
            });

            if (index > 0) inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-2 text-center">
                <p className="text-lg font-medium">Check your phone</p>
                <p className="text-sm text-gray-600">We have sent a code to your phone or email</p>
            </div>

            <div className="flex justify-center gap-3 my-4">
                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                    <input
                        // eslint-disable-next-line react/no-array-index-key
                        key={`otp-${index}`}
                        // name={`${field.name}-${index + 1}`}
                        name={field.name}
                        type="text"
                        maxLength={1}
                        required={field.required}
                        className="w-12 h-12 border border-gray-300 rounded-md text-center"
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>

            <p className="text-sm text-center text-gray-600">
                {timeLeft > 0 ? (
                    <>
                        Code expires in{' '}
                        <span className="font-bold text-gray-800">{formatTime(timeLeft)}</span>{' '}
                        seconds
                    </>
                ) : (
                    'Code has expired. Please resend code'
                )}
            </p>

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default OtpInput as FC<InputProps>;
