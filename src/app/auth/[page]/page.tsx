/* eslint-disable jsx-a11y/label-has-associated-control */
import { redirect } from 'next/navigation';
import Form from './_components/Form';
import OTPVerificationForm from './_components/OTPVerificationForm';
import { getFormTitle, PageType } from './_lib/utils';

function Auth({ params }) {
    const {
        page,
    }: {
        page: PageType;
    } = params;

    const validPages: PageType[] = [
        'login',
        'signup',
        'forgot-password',
        'reset-password',
        'otp-verification',
    ];

    if (!validPages.includes(page)) {
        redirect('/auth/login');
        return null;
    }

    return (
        <div className="relative mx-auto w-full max-w-xl lg:my-20 my-10 bg-form rounded-form-radius shadow-2xl py-14 px-16">
            <p
                className={`w-full text-4xl font-medium leading-snug font-serif text-primary mb-2 ${page === 'otp-verification' ? 'text-center' : ''}`}
            >
                {getFormTitle(page)}
            </p>
            {page === 'otp-verification' ? <OTPVerificationForm /> : <Form page={page} />}
        </div>
    );
}

export default Auth;
