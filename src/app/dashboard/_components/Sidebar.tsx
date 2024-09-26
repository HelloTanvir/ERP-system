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
import { sidebarItems } from '../_lib/utils';
import LogoutButton from './LogoutButton';
import SearchField from './SearchField';

function Sidebar() {
    const pathname = usePathname();
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
                        {sidebarItems.map((item) => {
                            if (item.subItems) {
                                return (
                                    <SubMenu
                                        key={item.label}
                                        icon={item.icon}
                                        label={item.label}
                                        defaultOpen
                                        component="div"
                                    >
                                        {item.subItems.map((subItem) => {
                                            if (subItem.link) {
                                                return (
                                                    <Link href={subItem.link} key={subItem.label}>
                                                        <MenuItem
                                                            icon={subItem.icon}
                                                            className="text-xs"
                                                            component="div"
                                                            active={pathname === subItem.link}
                                                        >
                                                            {subItem.label}
                                                        </MenuItem>
                                                    </Link>
                                                );
                                            }

                                            return (
                                                <MenuItem
                                                    key={subItem.label}
                                                    icon={subItem.icon}
                                                    className="text-xs"
                                                    component="div"
                                                    active={pathname === subItem.link}
                                                >
                                                    {subItem.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </SubMenu>
                                );
                            }

                            if (item.link) {
                                return (
                                    <Link href={item.link} key={item.label}>
                                        <MenuItem
                                            icon={item.icon}
                                            className="text-sm mt-5"
                                            component="div"
                                            active={pathname === item.link}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    </Link>
                                );
                            }

                            return (
                                <MenuItem
                                    key={item.label}
                                    icon={item.icon}
                                    className="text-sm mt-5"
                                    component="div"
                                    active={pathname === item.link}
                                >
                                    {item.label}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </Menu>

                <LogoutButton />
            </ProSidebar>
        </div>
    );
}

export default Sidebar;
