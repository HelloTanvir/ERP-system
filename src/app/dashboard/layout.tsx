import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

export const metadata: Metadata = {
    title: 'ERP System | Dashboard',
    description: 'Dashboard page for ERP System',
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                {children}
            </div>
        </div>
    );
}
