'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GiTireIronCross } from 'react-icons/gi';
import { HeaderLinks } from '../_lib/utils';

function Header() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full bg-header shadow-sm  sticky top-0 z-50">
            <div className="navbar justify-between lg:w-[80%] p-0  w-[95%] mx-auto">
                <div className="navbar-start lg:w-[30%] w-full">
                    <div className="dropdown" ref={dropdownRef}>
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn rounded-none flex btn-sm px-2 btn-ghost lg:hidden"
                            onClick={toggleDropdown}
                        >
                            {isOpen ? (
                                <GiTireIronCross
                                    className={` transition-opacity transform duration-1000 ${
                                        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                    } text-[20px] pl-[3px] mr-[4px] text-cyan-600`}
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`transition-opacity transform duration-1000 text-cyan-600 ${
                                        isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                                    } h-6 w-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            )}
                        </div>
                        {/* Dropdown menu */}
                        {isOpen && (
                            <ul
                                tabIndex={0}
                                role="menu"
                                className="dropdown-content mt-4 z-[1] p-2 shadow rounded-none bg-gray-100 bg-opacity-50 w-52 nav-hover-effect hover-effect-li hover-blue-li hover-underline-blue-li"
                            >
                                <li>
                                    <span>Home</span>
                                </li>
                                <li>
                                    <span>Services</span>
                                </li>
                                <li>
                                    <span>Pricing</span>
                                </li>
                                <li>
                                    <span>Contact</span>
                                </li>
                            </ul>
                        )}
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">
                        LOGO
                    </Link>
                </div>

                <div className="w-[65%] flex lg:justify-between justify-end">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex gap-16 px-1 hover-effect hover-blue hover-underline-blue font-semibold">
                            <li>
                                <span>Home</span>
                            </li>
                            <li>
                                <span>Services</span>
                            </li>
                            <li>
                                <span>Pricing</span>
                            </li>
                            <li>
                                <span>Contact</span>
                            </li>
                        </ul>
                    </div>

                    {/* Left part */}
                    <div className="">
                        <Link
                            href={HeaderLinks.LOGIN}
                            className={`py-1 px-6 text-lg font-bold btn  btn-outline  ${pathname === HeaderLinks.LOGIN ? 'bg-principal text-white' : 'bg-white text-principal'} rounded-btn-radius`}
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
