import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                header: '#ffffff',
                footer: '#28374E',
                form: '#ffffff',
                primary: '#682FE6',
                link: '#206EEE',
            },
            padding: {
                'lg-padding-header-footer': '28px 235px',
                'padding-header-footer': '20px 40px',
            },
            borderRadius: {
                'btn-radius': '5px',
                'form-radius': '10px',
            },
        },
    },
    plugins: [],
};
export default config;
