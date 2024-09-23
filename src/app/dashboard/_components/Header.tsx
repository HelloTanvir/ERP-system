'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { notificationIcon, settingsIcon, sidebarItems, userIcon } from '../_lib/utils';

function Header() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-5 px-10 pt-5 pb-[2px] border-b border-[#C9CDD3]">
            <div className="flex gap-7 items-center justify-end">
                {notificationIcon}
                <Link href="/settings">{settingsIcon}</Link>
                <Link href="/profile">{userIcon}</Link>
            </div>

            <ul className="flex gap-12 px-1 hover-effect hover-blue hover-underline-blue font-medium text-sm">
                {sidebarItems
                    .filter((item) => !!item.subItems)
                    .map((item) => {
                        if (item.subItems[0]?.link) {
                            return (
                                <li key={item.label}>
                                    <Link href={item.subItems[0].link}>
                                        <span
                                            className={`${pathname.includes(item.label.toLowerCase()) ? 'text-primary border-b border-primary' : ''}`}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        }

                        return (
                            <li key={item.label}>
                                <span
                                    className={`${pathname.includes(item.label.toLowerCase()) ? 'text-primary border-b border-primary' : ''}`}
                                >
                                    {item.label}
                                </span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default Header;
