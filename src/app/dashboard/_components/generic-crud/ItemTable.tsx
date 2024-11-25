'use client';

import { ReactNode } from 'react';
import { GenericItem } from '../../_lib/utils';

interface ItemTableProps<T extends GenericItem> {
    items: T[];
    tableColumns: string[];
    tableRows: ReactNode[][];
    noTableAction?: boolean;
    noView?: boolean;
    handleViewItem: (item: T) => void;
    handleEditItem: (item: T) => void;
    handleDeleteItem: (formData: FormData) => Promise<void>;
}

function ItemTable<T extends GenericItem>({
    items,
    tableColumns,
    tableRows,
    noTableAction,
    noView,
    handleViewItem,
    handleEditItem,
    handleDeleteItem,
}: Readonly<ItemTableProps<T>>) {
    return (
        <table className="table border-collapse w-full">
            <thead>
                <tr className="text-purple-700">
                    {tableColumns.map((column, index) => (
                        <th
                            key={column}
                            className={`border border-t-0  border-gray-300 ${index === 0 ? 'border-l-0' : ''}`}
                        >
                            {column}
                        </th>
                    ))}

                    {!noTableAction && (
                        <th className="border border-t-0 border-r-0  border-gray-300 text-right pr-8">
                            Action
                        </th>
                    )}
                </tr>
            </thead>

            <tbody>
                {tableRows.map((row, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <tr key={`generic-item-table-row-${index}`}>
                        {row.map((entry, idx) => (
                            <td
                                // eslint-disable-next-line react/no-array-index-key
                                key={`generic-item-table-row-${index}-col-${idx}`}
                                className="border border-gray-300 border-l-0"
                            >
                                {entry}
                            </td>
                        ))}

                        {!noTableAction && (
                            <td className="border border-r-0 border-gray-300">
                                <div className="flex gap-2 justify-end">
                                    {!noView && (
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm text-blue-400"
                                            onClick={() => handleViewItem(items[index])}
                                        >
                                            View
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm text-blue-400"
                                        onClick={() => handleEditItem(items[index])}
                                    >
                                        Edit
                                    </button>

                                    <form action={handleDeleteItem}>
                                        <input hidden name="id" value={items[index].id} readOnly />
                                        <button
                                            type="submit"
                                            className="btn btn-ghost btn-sm text-red-400"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ItemTable;
