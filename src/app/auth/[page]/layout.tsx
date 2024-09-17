import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from './_components/Footer';
import Header from './_components/Header';

export const metadata: Metadata = {
    title: 'ERP System | Authentication',
    description: 'Authentication page for ERP System',
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
