export enum HeaderLinks {
    LOGIN = '/auth/login',
    ADMIN_DASHBOARD = '/',
}

export type PageType = 'login' | 'signup' | 'forgot-password' | 'reset-password';

export const getFormTitle = (page: PageType) => {
    if (page === 'login') return 'Sign in to your account';
    if (page === 'signup') return 'Sign up for an account';
    if (page === 'forgot-password') return 'Forgot your Password?';
    if (page === 'reset-password') return 'Reset your Password';
    return '';
};

export const getFormFields = (
    page: PageType
): {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    minLength?: number;
    required?: boolean;
}[] => {
    if (page === 'login') {
        return [
            {
                label: 'Email or Phone Number',
                name: 'email',
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
                name: 'phoneNumber',
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
            {
                label: 'Confirm Password',
                name: 'confirmPassword',
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
                label: 'Email',
                name: 'email',
                type: 'email',
                placeholder: '',
                required: true,
            },
        ];
    }

    return [];
};
