'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { IPurchaseRequisition } from '../../purchase-requisition/_lib/utils';
import { IPurchaseJournal } from '../_lib/utils';

import SelectRequisitionItem from './SelectRequisitionItem';
import TableInputRow from './TableInputRow';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IPurchaseJournal | null;
    handleSubmit: (item: IPurchaseJournal) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}
export default function PurchaseJournalForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [selectedRequisition, setSelectedRequisition] = useState<IPurchaseRequisition | null>(
        null
    );
    const [ratePerUnits, setRatePerUnits] = useState<number[]>([]);

    console.log('Purchase Received:', selectedRequisition);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const purchaseJournal = {} as IPurchaseJournal;
            if (currentItem?.id) purchaseJournal.id = currentItem.id;

            // Store main form data
            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) purchaseJournal[key] = value;
            });

            // Store table row data in the purchase requisition object
            console.log(purchaseJournal);

            const currentFormState = await handleSubmit(purchaseJournal);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const columnNames = [
        'Product Name',
        'Product Code',
        'Warehouse',
        'Received Quantity',
        'Rate per Unit',
        'Total',
        'UoM',
        'Type',
        'Requested by',
        'Remarks',
    ];
    console.log('Fields:', fields);

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
                        {field.name === 'purchase_received' ? (
                            <SelectRequisitionItem field={field} setItem={setSelectedRequisition} />
                        ) : (
                            <Input
                                field={{
                                    ...field,
                                    ...(currentItem?.[field.name as keyof IPurchaseJournal]
                                        ? {
                                              defaultValue:
                                                  currentItem[field.name as keyof IPurchaseJournal],
                                          }
                                        : {}),
                                }}
                                error={itemFormState.errors?.[field.name]}
                            />
                        )}
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
                        {selectedRequisition?.purchase_requisition?.preq_items?.map(
                            (preq_item, index) => (
                                <TableInputRow
                                    key={`purchase-table-input-${preq_item?.id}`}
                                    preqItem={
                                        currentItem
                                            ? currentItem?.purchase_requisition?.preq_items?.[index]
                                            : preq_item
                                    }
                                    ratePerUnit={ratePerUnits[index]}
                                    setRatePerUnits={setRatePerUnits}
                                    rowNumber={index}
                                />
                            )
                        )}
                    </tbody>
                </table>

                <div className="flex items-center justify-end mt-6 gap-2">
                    <p>Subtotal:</p>
                    <input
                        type="number"
                        disabled
                        className="border w-[100px] placeholder-gray-400 focus:outline-none focus:border-blue-500   p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                        value={selectedRequisition?.purchase_requisition?.preq_items
                            ?.map(
                                (preq_item, index) =>
                                    +preq_item.received_quantity * Number(ratePerUnits[index])
                            )
                            .reduce((acc, current) => current + acc, 0)}
                    />
                </div>
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
