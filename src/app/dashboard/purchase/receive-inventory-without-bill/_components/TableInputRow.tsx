'use client';

import Input from '@/app/_components/Input';
import { Dispatch, SetStateAction } from 'react';
import { IReceiveInventoryWithoutBillItem } from '../_lib/utils';

interface Props {
    rowNumber: number;
    receivingQuantity: number;
    setReceivingQuantities: Dispatch<SetStateAction<number[]>>;
    preqItem: IReceiveInventoryWithoutBillItem;
}

function TableInputRow({
    preqItem,
    rowNumber,
    receivingQuantity,
    setReceivingQuantities,
}: Readonly<Props>) {
    return (
        <tr>
            <td className="border border-gray-300 border-l-0 w-[200px]">
                <Input
                    field={{
                        name: 'item_name',
                        type: 'text',
                        placeholder: 'Item name',
                        disabled: true,
                        defaultValue: preqItem?.item?.name,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_code',
                        type: 'text',
                        placeholder: 'Item code',
                        disabled: true,
                        defaultValue: preqItem?.item?.code,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_warehouse',
                        type: 'text',
                        placeholder: 'Item warehouse',
                        disabled: true,
                        defaultValue: preqItem?.warehouse?.name,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_quantity',
                        type: 'text',
                        placeholder: 'Item quantity',
                        disabled: true,
                        defaultValue: preqItem?.quantity,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <input
                    placeholder="Receiving quantity"
                    type="number"
                    name="receiving_quantity"
                    value={receivingQuantity}
                    onChange={(e) =>
                        setReceivingQuantities((prev) => {
                            const units = [...prev];
                            units[rowNumber] = e.target.value;
                            return units;
                        })
                    }
                    required
                    className="border placeholder-gray-400 focus:outline-none focus:border-blue-500  w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_uom',
                        type: 'text',
                        placeholder: 'Item measure of unit',
                        disabled: true,
                        defaultValue: preqItem?.item?.measure_unit,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_type',
                        type: 'text',
                        placeholder: 'Item type',
                        disabled: true,
                        defaultValue: (() => {
                            if (preqItem?.item?.is_inventory_item === true) {
                                return 'Inventory';
                            }
                            if (preqItem?.item?.is_inventory_item === false) {
                                return 'Non-Inventory';
                            }
                            return '';
                        })(),
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'requested_by',
                        type: 'text',
                        placeholder: 'Requested by',
                        disabled: true,
                        defaultValue: preqItem?.requested_by?.name,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_remarks',
                        type: 'text',
                        placeholder: 'Enter remarks',
                        defaultValue: preqItem?.remarks,
                    }}
                />
            </td>
        </tr>
    );
}

export default TableInputRow;
