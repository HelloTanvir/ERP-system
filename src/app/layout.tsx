import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { StoreProvider } from './_lib/providers/StateProvider';
import './globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'ERP System',
    description:
        'A comprehensive ERP system website, streamlining business operations and enhancing efficiency',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
