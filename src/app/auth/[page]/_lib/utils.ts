import { InputField } from '@/app/_lib/utils';

export enum HeaderLinks {
    LOGIN = '/auth/login',
    ADMIN_DASHBOARD = '/',
}

export enum AuthPath {
    login = '/login',
    signup = '/register',
    logout = '/logout',
    'refresh-token' = '/token/refresh',
    'forgot-password' = '/forgot-password',
    'reset-password' = '/reset-password',
    'otp-verification' = '/token/verify', // TODO: change to actual path
}

export const ACTION_BUTTON_LABEL = {
    login: 'Sign in',
    signup: 'Register',
    'forgot-password': 'Send OTP',
    'reset-password': 'Reset password',
    'otp-verification': 'Verify OTP',
};

export type PageType =
    | 'login'
    | 'signup'
    | 'forgot-password'
    | 'reset-password'
    | 'otp-verification';

export const getFormTitle = (page: PageType) => {
    if (page === 'login') return 'Sign in to your account';
    if (page === 'signup') return 'Sign up for an account';
    if (page === 'forgot-password') return 'Forgot your password?';
    if (page === 'reset-password') return 'Reset your Password';
    if (page === 'otp-verification') return 'Verification';
    return '';
};

export const OTP_LENGTH = 6;
export const OTP_RESEND_TIME = 180; // in seconds

export const getFormFields = (page: PageType): InputField[] => {
    if (page === 'login') {
        return [
            {
                label: 'Email or Phone Number',
                name: 'username',
                type: 'text',
                placeholder: '',
                required: true,
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '',
                minLength: 6,
                required: true,
            },
        ];
    }

    if (page === 'signup') {
        return [
            {
                label: 'Name',
                name: 'name',
                type: 'text',
                placeholder: '',
                required: true,
            },
            {
                label: 'Email',
                name: 'email',
                type: 'email',
                placeholder: '',
                required: true,
            },
            {
                label: 'Phone Number',
                name: 'phone',
                type: 'tel',
                placeholder: '',
                required: true,
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: '',
                minLength: 6,
                required: true,
            },
            {
                label: 'Confirm Password',
                name: 'password2',
                type: 'password',
                placeholder: '',
                minLength: 6,
                required: true,
            },
        ];
    }

    if (page === 'forgot-password') {
        return [
            {
                label: 'Email or Phone Number',
                name: 'username',
                type: 'text',
                placeholder: '',
                required: true,
            },
        ];
    }

    if (page === 'reset-password') {
        return [
            {
                label: 'New Password',
                name: 'password',
                type: 'password',
                placeholder: '',
                minLength: 6,
                required: true,
            },
        ];
    }

    if (page === 'otp-verification') {
        return [
            {
                label: 'OTP',
                name: 'token',
                type: 'otp',
                placeholder: '',
                minLength: 1,
                maxLength: 1,
                required: true,
            },
        ];
    }

    return [];
};
