'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { IPurchaseRequisition } from '../_lib/utils';
import TableInputRow from './TableInputRow';

const columnNames = [
    'Product Name',
    'Product Code',
    'Warehouse',
    'Quantity',
    'UoM',
    'Type',
    'Requisition',
    'Remarks',
    'Action',
];

interface ItemFormProps {
    fields: InputField[];
    currentItem: IPurchaseRequisition | null;
    handleSubmit: (item: IPurchaseRequisition) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

export default function PurchaseRequisitionForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [tableRows, setTableRows] = useState<
        {
            rowNumber: number;
        }[]
    >([]);

    useEffect(() => {
        if (currentItem?.preq_items) {
            setTableRows(
                currentItem.preq_items.map((_, index) => ({
                    rowNumber: index,
                }))
            );
        }
    }, [currentItem?.preq_items]);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const purchaseRequisition = {} as IPurchaseRequisition;
            if (currentItem?.id) purchaseRequisition.id = currentItem.id;
            purchaseRequisition.preq_items = [];

            [...formData.entries()].forEach(([key, value]) => {
                if (!['$ACTION_ID_'].includes(key)) {
                    if (key.includes('preq_item.')) {
                        const [, index, fieldName] = key.split('.') as [string, string, string];

                        if (!purchaseRequisition.preq_items[Number(index)]) {
                            purchaseRequisition.preq_items[Number(index)] = {};
                        }
                        purchaseRequisition.preq_items[Number(index)][fieldName] = value;
                    } else purchaseRequisition[key] = value;
                }
            });

            // remove empty rows (it may happen if user removes a row that is not the last row)
            purchaseRequisition.preq_items = purchaseRequisition.preq_items.filter((item) => item);

            const currentFormState = await handleSubmit(purchaseRequisition);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const addRow = () => {
        setTableRows((prev) => [
            ...prev,
            {
                rowNumber: prev.length,
            },
        ]);
    };

    const removeRow = (rowNumber: number) => {
        setTableRows((prev) => prev.filter((row) => row.rowNumber !== rowNumber));
    };

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <Link
                href="/dashboard/accounts/chart-of-accounts"
                type="button"
                className="btn btn-primary bg-purple-700 text-white w-[200px]"
            >
                Create New Account
            </Link>
            <div className="max-h-[40rem] grid grid-cols-3 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof IPurchaseRequisition]
                                    ? {
                                          defaultValue:
                                              currentItem[field.name as keyof IPurchaseRequisition],
                                      }
                                    : {}),
                            }}
                            error={itemFormState.errors?.[field.name]}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <table className="table border-collapse w-full">
                    <thead>
                        <tr className="text-purple-700">
                            {columnNames.map((column, index) => (
                                <th
                                    key={column}
                                    className={`border border-t-0 border-gray-300 ${index === 0 ? 'border-l-0' : ''} ${index === columnNames.length - 1 ? 'border-r-0' : ''}`}
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {tableRows.map((row) => (
                            <TableInputRow
                                key={`purchase-table-input-${row.rowNumber}`}
                                removeRow={removeRow}
                                rowNumber={row.rowNumber}
                                preqItem={currentItem?.preq_items?.[row.rowNumber]}
                            />
                        ))}
                    </tbody>
                </table>

                <button type="button" onClick={addRow} className="btn btn-sm mt-2 text-purple-500">
                    Add More Item
                </button>
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-sm text-purple-600 hover:bg-purple-500 hover:text-white btn-outline font-bold px-6 rounded-md"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-sm bg-purple-500 text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
