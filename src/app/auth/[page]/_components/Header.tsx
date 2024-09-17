'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderLinks } from '../_lib/utils';

function Header() {
    const pathname = usePathname();
    console.log(pathname);

    return (
        <div className="bg-header shadow-sm lg:p-lg-padding-header-footer p-padding-header-footer flex gap-2 justify-end sticky top-0 z-50">
            <Link
                href={HeaderLinks.LOGIN}
                className={`py-1 px-6 text-sm font-medium ${pathname === HeaderLinks.LOGIN ? 'bg-primary text-white' : 'bg-white text-primary'} rounded-btn-radius`}
            >
                Sign in
            </Link>

            <Link
                href={HeaderLinks.ADMIN_DASHBOARD}
                className={`py-1 px-2 text-sm font-medium ${pathname === HeaderLinks.ADMIN_DASHBOARD ? 'bg-primary text-white' : 'bg-white text-primary'} rounded-btn-radius`}
            >
                Admin Dashboard
            </Link>
        </div>
    );
}

export default Header;
