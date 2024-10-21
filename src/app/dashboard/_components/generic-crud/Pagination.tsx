'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ITEMS_PER_PAGE } from '../../_lib/utils';

interface Props {
    totalItemsCount: number;
}

function Pagination({ totalItemsCount }: Props) {
    const totalPages = Math.ceil(totalItemsCount / ITEMS_PER_PAGE);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages < 2) return null;

    return (
        <div className="flex items-center justify-between px-4 py-2 sm:px-6">
            <div className="flex flex-1 items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {Math.min(currentPage * ITEMS_PER_PAGE, totalItemsCount)}
                        </span>{' '}
                        of <span className="font-medium">{totalItemsCount}</span> results
                    </p>
                </div>

                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex space-x-5 rounded-md"
                    >
                        <button type="button" disabled={currentPage === 1}>
                            <Link
                                href={createPageURL(currentPage - 1)}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                style={{
                                    pointerEvents: currentPage === 1 ? 'none' : 'auto',
                                }}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                            </Link>
                        </button>

                        <button type="button" disabled={currentPage === totalPages}>
                            <Link
                                href={createPageURL(currentPage + 1)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                style={{
                                    pointerEvents: currentPage === totalPages ? 'none' : 'auto',
                                }}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </Link>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
