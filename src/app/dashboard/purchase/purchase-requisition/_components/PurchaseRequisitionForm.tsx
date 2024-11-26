'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { IPurchaseRequisition, IPurchaseRequisitionItem } from '../_lib/utils';

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

    const [tableRows, setTableRows] = useState<IPurchaseRequisitionItem[]>([]);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const purchaseRequisition = {} as IPurchaseRequisition;
            if (currentItem?.id) purchaseRequisition.id = currentItem.id;

            // Store main form data
            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) purchaseRequisition[key] = value;
            });

            // Store table row data in the purchase requisition object
            purchaseRequisition.cavity = tableRows;
            console.log(purchaseRequisition);

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
        setTableRows((prevRows) => [
            ...prevRows,
            {
                id: Date.now(),
                sl_no: prevRows.length + 1,
                product_name: '',
                product_code: '',
                warehouse: '',
                quantity: 0,
                uom: '',
                type: '',
                requisition_by: '',
                remarks: '',
            },
        ]);
    };

    const removeRow = (id: number) => {
        setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const updateRow = (id: number, field: keyof IPurchaseRequisitionItem, value: any) => {
        setTableRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const columnNames = [
        'SL No',
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
    console.log('Fields:', fields);

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <button type="button" className="btn btn-primary bg-purple-700 text-white w-[200px]">
                Create New Account
            </button>
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
                            <tr key={row.id}>
                                <td className="border border-gray-300 border-l-0">{row.sl_no}</td>
                                <td className="border border-gray-300 border-l-0">
                                    {/* <Input
                                        field={{
                                            name: 'product_name',
                                            type: 'dropdown',
                                            placeholder: 'Select a product',
                                            required: false,
                                            creatable: true,
                                            optionsGetUrl: 'inventory/item/',
                                            optionsFilterQuery: 'name__icontains',
                                            redirectURLOnCreate:
                                                '/dashboard/purchase/purchase-requisition',
                                        }}
                                        error={itemFormState.errors?.product_name}
                                    /> */}
                                    <input
                                        type="text"
                                        placeholder="Select Product Item"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'product_name', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Enter Product Code"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'product_code', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Warehouse"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'warehouse', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'quantity', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Enter unit of measure"
                                        onBlur={(e) => updateRow(row.id, 'uom', e.target.value)}
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Enter type"
                                        onBlur={(e) => updateRow(row.id, 'type', e.target.value)}
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Select Requisition By"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'requisition_by', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border w-[150px] border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Enter remarks"
                                        onBlur={(e) => updateRow(row.id, 'remarks', e.target.value)}
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0 border-r-0">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(row.id)}
                                        className="btn btn-sm text-red-500 text-xl"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={addRow} className="btn btn-sm mt-2 text-purple-500">
                    Add Row
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
