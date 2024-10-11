'use client';

import { GenericItem } from '../../_lib/utils';

interface ItemTableProps<T extends GenericItem> {
    items: T[];
    tableColumns: string[];
    tableRows: string[][];
    noTableAction?: boolean;
    handleEditItem: (item: T) => void;
    handleDeleteItem: (formData: FormData) => Promise<void>;
}

function ItemTable<T extends GenericItem>({
    items,
    tableColumns,
    tableRows,
    noTableAction,
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
                        {row.map((entry) => (
                            <td key={entry} className="border border-gray-300 border-l-0">
                                {entry}
                            </td>
                        ))}

                        {!noTableAction && (
                            <td className="border border-r-0 border-gray-300">
                                <div className="flex gap-2 justify-end">
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
