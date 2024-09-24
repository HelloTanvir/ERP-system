import { BiExport } from 'react-icons/bi';
import { LuImport } from 'react-icons/lu';
import { RiFolderAddLine } from 'react-icons/ri';

export default function InventoryItem() {
    return (
        <div>
            {/* Header Part */}
            <div className="flex justify-between border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg ">
                <h3 className="text-2xl text-purple-700  font-semibold">Inventory Item</h3>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="btn btn-sm  rounded-md border-purple-700 text-purple-700 transition-all  duration-500 hover:border-green-600 hover:text-green-600"
                    >
                        <BiExport />
                        Export
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm  rounded-md  border-purple-700 text-purple-700 transition-all  duration-500 hover:border-yellow-600 hover:text-yellow-600"
                    >
                        <LuImport />
                        Import
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
                    >
                        <RiFolderAddLine /> New
                    </button>
                </div>
            </div>

            {/* Table Part */}
            <table className="table border-collapse w-full mt-6">
                {/* head */}
                <thead>
                    <tr className="text-purple-700">
                        <th className="w-[5%] text-right border border-l-0 border-t-0 border-r-0  border-gray-300">
                            <input type="checkbox" className="checkbox w-4 h-4 rounded-sm" />
                        </th>
                        <th className="w-[15%] border border-l-0   border-t-0  border-gray-300">Name</th>
                        <th className="w-[15%] border border-t-0  border-gray-300">Units left</th>
                        <th className="border border-t-0 border-gray-300">Code/SKU</th>
                        <th className="text-center w-[15%] border border-t-0  border-gray-300">
                            Description
                        </th>
                        <th className="text-center w-[15%] border border-t-0 border-gray-300">
                            Active/Inactive
                        </th>
                        <th className="text-right w-[15%] pr-8 border border-t-0 border-r-0 border-gray-300">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr className="">
                        <td className="text-right border border-r-0 border-l-0">
                            <input type="checkbox" className="checkbox w-4 h-4 rounded-sm" />
                        </td>
                        <td className="border border-l-0 border-gray-300">iPhone 16</td>
                        <td className="border border-gray-300">20000000</td>
                        <td className="border border-gray-300">1351DFA65</td>
                        <td className="border border-gray-300">
                            Any kind of description according to the product
                        </td>
                        <td className="text-center text-green-700 border border-gray-300">True</td>
                        <td className="border border-r-0 border-gray-300">
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-sm text-blue-400"
                                >
                                    Edit
                                </button>
                                <button type="button" className="btn btn-ghost btn-sm text-red-400">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
