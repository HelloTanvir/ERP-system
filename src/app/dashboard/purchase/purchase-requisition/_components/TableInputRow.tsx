'use client';

import Input from '@/app/_components/Input';
import { InventoryItem } from '@/app/dashboard/inventory/inventory-item/_lib/utils';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { IPurchaseRequisitionItem } from '../_lib/utils';
import SelectInventoryItem from './SelectInventoryItem';

interface Props {
    removeRow: (rowNumber: number) => void;
    rowNumber: number;
    preqItem: IPurchaseRequisitionItem | null;
}

function TableInputRow({ removeRow, rowNumber, preqItem }: Readonly<Props>) {
    const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);

    return (
        <tr>
            <td className="border border-gray-300 border-l-0 w-[200px]">
                <SelectInventoryItem
                    field={{
                        name: `preq_item.${rowNumber}.item`,
                        type: 'dropdown',
                        placeholder: 'Product Name',
                        required: true,
                        optionsGetUrl: 'inventory/item/',
                        optionsFilterQuery: 'name__name__icontains',
                        defaultValue: preqItem?.item
                            ? {
                                  value: preqItem.item.id,
                                  label: preqItem.item.name,
                                  item: preqItem.item,
                              }
                            : undefined,
                    }}
                    setItem={setInventoryItem}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_code',
                        type: 'text',
                        placeholder: 'Item code',
                        disabled: true,
                        defaultValue: inventoryItem?.code || preqItem?.item?.code,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: `preq_item.${rowNumber}.warehouse`,
                        type: 'dropdown',
                        placeholder: 'Warehouse',
                        optionsGetUrl: 'inventory/warehouse/',
                        optionsFilterQuery: 'name__icontains',
                        required: true,
                        disabled: !inventoryItem,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: `preq_item.${rowNumber}.quantity`,
                        type: 'number',
                        placeholder: 'Quantity',
                        required: true,
                        disabled: !inventoryItem,
                        defaultValue: preqItem?.quantity,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_uom',
                        type: 'text',
                        placeholder: 'Item UoM',
                        disabled: true,
                        defaultValue:
                            inventoryItem?.measure_unit?.name || preqItem?.item?.measure_unit,
                    }}
                />
            </td>

            <td className="border border-gray-300 border-l-0">
                <Input
                    field={{
                        name: 'item_type',
                        type: 'text',
                        placeholder: 'Is Inventory Item',
                        disabled: true,
                        defaultValue: (() => {
                            if (
                                inventoryItem?.is_inventory_item ||
                                preqItem?.item?.is_inventory_item
                            ) {
                                return 'Inventory';
                            }
                            if (
                                inventoryItem?.is_inventory_item === false ||
                                preqItem?.item?.is_inventory_item === false
                            ) {
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
                        name: `preq_item.${rowNumber}.requested_by`,
                        type: 'dropdown',
                        placeholder: 'Requisition By',
                        required: true,
                        optionsGetUrl: 'account/user/list/',
                        disabled: !inventoryItem,
                    }}
                />
            </td>

            <td className="border w-[150px] border-gray-300 border-l-0">
                <Input
                    field={{
                        name: `preq_item.${rowNumber}.remarks`,
                        type: 'text',
                        placeholder: 'Enter remarks',
                        disabled: !inventoryItem,
                        defaultValue: preqItem?.remarks,
                    }}
                />
            </td>
            <td className="border border-gray-300 border-l-0 border-r-0">
                <button
                    type="button"
                    onClick={() => removeRow(rowNumber)}
                    className="btn btn-sm text-red-500 text-xl"
                >
                    <MdDeleteOutline />
                </button>
            </td>
        </tr>
    );
}

export default TableInputRow;
