'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    Menu,
    menuClasses,
    MenuItem,
    Sidebar as ProSidebar,
    sidebarClasses,
    SubMenu,
} from 'react-pro-sidebar';
import { collapseButtonSvg } from '../_lib/icons';
import { SidebarItem, sidebarItems } from '../_lib/utils';
import LogoutButton from './LogoutButton';
import SearchField from './SearchField';

function MenuItemOrSubmenu({ item }: Readonly<{ item: SidebarItem }>) {
    const pathname = usePathname();

    if (item.subItems) {
        return (
            <SubMenu
                key={item.label}
                icon={item.icon}
                label={item.label}
                defaultOpen
                component="div"
                className={!item.icon ? 'text-xs pl-8' : ''}
            >
                {item.subItems.map((subItem) => (
                    <MenuItemOrSubmenu key={subItem.label} item={subItem} />
                ))}
            </SubMenu>
        );
    }

    let menuItemClassName: string = 'text-xs pl-8';
    if (item.icon) menuItemClassName = 'text-sm mt-5';

    if (item.link)
        return (
            <Link href={item.link} key={item.label}>
                <MenuItem
                    icon={item.icon}
                    className={menuItemClassName}
                    component="div"
                    active={pathname === item.link}
                >
                    {item.label}
                </MenuItem>
            </Link>
        );

    return (
        <MenuItem key={item.label} icon={item.icon} className={menuItemClassName} component="div">
            {item.label}
        </MenuItem>
    );
}

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                className={`absolute top-[30px] left-[calc(100%+10px)] cursor-pointer z-[1000] scale-75 ${collapsed ? 'rotate-180' : 'rotate-0'}`}
                onClick={() => setCollapsed((prev) => !prev)}
            >
                {collapseButtonSvg}
            </button>

            <ProSidebar
                collapsed={collapsed}
                className="h-full p-5"
                width="350px"
                collapsedWidth="100px"
                rootStyles={{
                    backgroundColor: '#FCFDFE',
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: '#FCFDFE',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    [`.${menuClasses.subMenuRoot}`]: {
                        marginTop: '10px',
                    },
                    [`.${menuClasses.button}`]: {
                        height: '35px !important',
                    },
                    [`.${menuClasses.icon}`]: {
                        scale: '0.75',
                    },
                    [`.${menuClasses.active}`]: {
                        color: '#682FE6',
                    },
                }}
            >
                <SearchField />

                <Menu className="flex-1 mt-5 bg-[#FCFDFE]">
                    <Menu>
                        {sidebarItems.map((item) => (
                            <MenuItemOrSubmenu key={item.label} item={item} />
                        ))}
                    </Menu>
                </Menu>

                <LogoutButton />
            </ProSidebar>
        </div>
    );
}

export default Sidebar;
