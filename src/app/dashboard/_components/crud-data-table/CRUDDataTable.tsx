import { ReactNode } from 'react';
import { BiExport } from 'react-icons/bi';
import { LuImport } from 'react-icons/lu';
import Modal from './Modal';

type WithExport = {
    withExport: boolean;
    handleExport: () => void;
};

type WithImport = {
    withImport: boolean;
    handleImport: () => void;
};

type WithAddNew = {
    withAddNew: boolean;
    modalOpenerTitle: ReactNode;
    modalTitle: string;
    modalBody: ReactNode;
};

type CRUDDataTableProps = {
    title: string;
    columns: string[];
    rows: ReactNode[][];
} & (WithExport | WithImport | WithAddNew);

export default function CRUDDataTable({
    title,
    columns,
    rows,
    withExport,
    withImport,
    handleExport,
    handleImport,
    withAddNew,
    modalOpenerTitle,
    modalTitle,
    modalBody,
}: CRUDDataTableProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Header Part */}
            <div className="flex justify-between border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg ">
                <h3 className="text-2xl text-purple-700  font-semibold">{title}</h3>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {withExport && (
                        <form action={handleExport}>
                            <button
                                type="submit"
                                className="btn btn-sm  rounded-md border-purple-700 text-purple-700 transition-all  duration-500 hover:border-green-600 hover:text-green-600"
                            >
                                <BiExport />
                                Export
                            </button>
                        </form>
                    )}

                    {withImport && (
                        <form action={handleImport}>
                            <button
                                type="submit"
                                className="btn btn-sm  rounded-md  border-purple-700 text-purple-700 transition-all  duration-500 hover:border-yellow-600 hover:text-yellow-600"
                            >
                                <LuImport />
                                Import
                            </button>
                        </form>
                    )}

                    {withAddNew && (
                        <Modal
                            modalOpenerTitle={modalOpenerTitle}
                            modalTitle={modalTitle}
                            modalBody={modalBody}
                        />
                    )}
                </div>
            </div>

            {/* Table Part */}
            <div className="overflow-x-auto">
                <table className="table border-collapse w-full">
                    <thead>
                        <tr className="text-purple-700">
                            <th className="text-right border border-l-0 border-t-0 border-r-0  border-gray-300">
                                <input type="checkbox" className="checkbox w-4 h-4 rounded-sm" />
                            </th>

                            {columns.map((column, index) => (
                                <th
                                    key={column}
                                    className={`border border-t-0  border-gray-300 ${index === 0 ? 'border-l-0' : ''}`}
                                >
                                    {column}
                                </th>
                            ))}

                            <th className="border border-t-0 border-r-0  border-gray-300 text-right pr-8">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <tr key={`data-table-${title}${index}`}>
                                <td className="text-right border border-r-0 border-l-0">
                                    <input
                                        type="checkbox"
                                        className="checkbox w-4 h-4 rounded-sm"
                                    />
                                </td>

                                {row.map((item) => (
                                    <td
                                        key={item}
                                        className={`border border-gray-300 ${index === 0 ? 'border-l-0' : ''}`}
                                    >
                                        {item}
                                    </td>
                                ))}

                                <td className="border border-r-0 border-gray-300">
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm text-blue-400"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-sm text-red-400"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
