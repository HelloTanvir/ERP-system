'use client';

import Input from '@/app/_components/Input';
import { FormState, InputField } from '@/app/_lib/utils';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { MdDeleteOutline } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import { IMoldRegister, IMoldRegisterItem } from '../_lib/utils';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IMoldRegister | null;
    handleSubmit: (item: IMoldRegister) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function MoldRegisterForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [tableRows, setTableRows] = useState<IMoldRegisterItem[]>([]);

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const moldRegister = {} as IMoldRegister;
            if (currentItem?.id) moldRegister.id = currentItem.id;

            // Store main form data
            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) moldRegister[key] = value;
            });

            // Store table row data in the moldRegister object
            moldRegister.cavity = tableRows;
            console.log(moldRegister);

            const currentFormState = await handleSubmit(moldRegister);

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
                cavity_number: prevRows.length + 1,
                cavity_name: '',
                net_cavity_weight: 0,
                calculation: 0,
                barcode: '',
                status: 'open',
            },
        ]);
    };

    const removeRow = (id: number) => {
        setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const updateRow = (id: number, field: keyof IMoldRegisterItem, value: any) => {
        setTableRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };
    const loadStatusOptions = (inputValue) => {
        const options = [
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
        ];

        return new Promise((resolve) => {
            const filteredOptions = options.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            resolve(filteredOptions);
        });
    };

    const columnNames = [
        'Cavity Number',
        'Cavity Name',
        'Net Cavity Weight',
        'Calculation',
        'Barcode',
        'Status',
        'Actions',
    ];

    const totalCavityCount = tableRows.length;
    console.log(totalCavityCount);
    const totalWeight = tableRows.reduce((acc, item) => acc + Number(item.net_cavity_weight), 0);
    console.log(totalWeight);
    const totalCalculation = tableRows.reduce((acc, item) => acc + Number(item.calculation), 0);
    console.log(totalCalculation);

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className="max-h-[40rem] grid grid-cols-3 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
                        <Input
                            field={{
                                ...field,
                                ...(currentItem?.[field.name as keyof IMoldRegister]
                                    ? {
                                          defaultValue:
                                              currentItem[field.name as keyof IMoldRegister],
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
                                <td className="border border-gray-300 border-l-0">
                                    {row.cavity_number}
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Enter Cavity Name"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'cavity_name', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="Enter Net Cavity Weight"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'net_cavity_weight', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="number"
                                        placeholder="Enter Calculation"
                                        onBlur={(e) =>
                                            updateRow(row.id, 'calculation', e.target.value)
                                        }
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border border-gray-300 border-l-0">
                                    <input
                                        type="text"
                                        placeholder="Enter Barcode"
                                        onBlur={(e) => updateRow(row.id, 'barcode', e.target.value)}
                                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                                    />
                                </td>
                                <td className="border w-[150px] border-gray-300 border-l-0">
                                    <AsyncSelect
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={loadStatusOptions}
                                        placeholder="Status"
                                        onChange={(option) =>
                                            updateRow(row.id, 'status', option.value)
                                        }
                                        className="w-full"
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
                {/* Display Totals */}
                <div className="mt-4 flex justify-end gap-10 text-right">
                    <p>Total Cavity Count: {totalCavityCount}</p>
                    <p>Total Cavity Weight: {totalWeight}</p>
                    <p>Total Calculation: {totalCalculation}</p>
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

export default MoldRegisterForm;

// 'use client';

// import Input from '@/app/_components/Input';
// import { FormState, InputField } from '@/app/_lib/utils';
// import { useState } from 'react';
// import { useFormState } from 'react-dom';
// import { MdDeleteOutline } from 'react-icons/md';
// import { IMoldRegister, IMoldRegisterItem } from '../_lib/utils';

// interface ItemFormProps {
//     fields: InputField[];
//     currentItem: IMoldRegister | null;
//     handleSubmit: (item: IMoldRegister) => Promise<{
//         success: boolean;
//         errors: {
//             [key: string]: string;
//         };
//     }>;
//     closeModal: () => void;
// }

// function MoldRegisterForm({
//     fields,
//     currentItem,
//     handleSubmit,
//     closeModal,
// }: Readonly<ItemFormProps>) {
//     const initialState: FormState = {
//         errors: null,
//         success: false,
//     };

//     const [tableRows, setTableRows] = useState<IMoldRegisterItem[]>([]);
//     console.log(tableRows);

//     const [itemFormState, formSubmitAction] = useFormState(
//         async (prevState: FormState, formData: FormData) => {
//             const moldRegister = {} as IMoldRegister;
//             if (currentItem?.id) moldRegister.id = currentItem.id;

//             [...formData.entries()].forEach((entry) => {
//                 const [key, value] = entry;
//                 if (!key.includes('$ACTION_ID_')) moldRegister[key] = value;
//             });

//             moldRegister.items = tableRows; // Add table rows to the submitted data
//             console.log(moldRegister);

//             const currentFormState = await handleSubmit(moldRegister);

//             if (currentFormState?.errors) {
//                 return { errors: currentFormState.errors, success: false };
//             }

//             if (currentFormState.success) closeModal();

//             return { success: !!currentFormState?.success, errors: null };
//         },
//         initialState
//     );

//     const addRow = () => {
//         setTableRows((prevRows) => [
//             ...prevRows,
//             {
//                 id: Date.now(),
//                 cavity_number: 0,
//                 cavity_name: '',
//                 net_cavity_weight: 0,
//                 calculation: 0,
//                 barcode: '',
//                 status: '',
//             },
//         ]);
//     };

//     const removeRow = (id: number) => {
//         setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
//     };

//     const updateRow = (id: number, field: keyof IMoldRegisterItem, value: any) => {
//         setTableRows((prevRows) =>
//             prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
//         );
//     };

//     const columnNames = [
//         'Cavity Number',
//         'Cavity Name',
//         'Net Cavity Weight',
//         'Calculation',
//         'Barcode',
//         'Status',
//         'Actions',
//     ];

//     return (
//         <form action={formSubmitAction} className="flex flex-col gap-6">
//             <div className=" max-h-[40rem] grid grid-cols-3 gap-x-5 gap-y-4">
//                 {fields.map((field) => (
//                     <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
//                         <Input
//                             field={{
//                                 ...field,
//                                 placeholder: field.label, // Placeholder only
//                             }}
//                             error={itemFormState.errors?.[field.name]}
//                         />
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-4">
//                 <table className="table border-collapse w-full">
//                     <thead>
//                         <tr className="text-purple-700">
//                             {columnNames.map((column, index) => (
//                                 <th
//                                     key={column}
//                                     className={`border border-t-0 border-gray-300 ${index === 0 ? 'border-l-0' : ''} ${index === columnNames.length - 1 ? 'border-r-0' : ''}`}
//                                 >
//                                     {column}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableRows.map((row, index) => (
//                             <tr key={row.id}>
//                                 <td className="border border-gray-300 border-l-0">{index + 1}</td>
//                                 <td className="border border-gray-300 border-l-0">
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Cavity Name"
//                                         onChange={(e) =>
//                                             updateRow(row.id, 'cavity_name', e.target.value)
//                                         }
//                                         className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
//                                     />
//                                 </td>
//                                 <td className="border border-gray-300 border-l-0">
//                                     <input
//                                         type="number"
//                                         placeholder="Enter Net Cavity Weight"
//                                         onChange={(e) =>
//                                             updateRow(row.id, 'net_cavity_weight', e.target.value)
//                                         }
//                                         className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
//                                     />
//                                 </td>
//                                 <td className="border border-gray-300 border-l-0">
//                                     <input
//                                         type="number"
//                                         placeholder="Enter Calculation"
//                                         onChange={(e) =>
//                                             updateRow(row.id, 'calculation', e.target.value)
//                                         }
//                                         className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
//                                     />
//                                 </td>
//                                 <td className="border border-gray-300 border-l-0">
//                                     <input
//                                         type="text"
//                                         placeholder="Enter Barcode" // Placeholder only
//                                         onChange={(e) =>
//                                             updateRow(row.id, 'barcode', e.target.value)
//                                         }
//                                         className="border placeholder-gray-400 focus:outline-none focus:border-black w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
//                                     />
//                                 </td>
//                                 <td className="border border-gray-300 border-l-0">
//                                     <select name="" id="">
//                                         <option value="open">Open</option>
//                                         <option value="closed">Closed</option>
//                                     </select>
//                                 </td>
//                                 <td className="border border-gray-300 border-l-0 border-r-0">
//                                     <button
//                                         type="button"
//                                         onClick={() => removeRow(row.id)}
//                                         className="btn btn-sm text-red-500 text-xl"
//                                     >
//                                         <MdDeleteOutline />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <button type="button" onClick={addRow} className="btn btn-sm mt-2 text-purple-500">
//                     Add Row
//                 </button>
//             </div>

//             <div className="flex gap-2 justify-end text-center">
//                 <button
//                     type="button"
//                     onClick={closeModal}
//                     className="btn btn-sm text-purple-600 hover:bg-purple-500 hover:text-white btn-outline font-bold px-6 rounded-md"
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     type="submit"
//                     className="btn btn-sm bg-purple-500 text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md px-8"
//                 >
//                     Save
//                 </button>
//             </div>
//         </form>
//     );
// }

// export default MoldRegisterForm;
