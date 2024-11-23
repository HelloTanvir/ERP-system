'use client';

import { getPromiseOptionsForDropdown, redirectTo } from '@/app/_lib/actions';
import { InputField } from '@/app/_lib/utils';
import { Delete, Plus } from 'lucide-react';
import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

interface ResinEntry {
    name: string;
    percentage: string;
}

const resinNameField: Partial<InputField> = {
    label: 'Resin Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter name',
    optionsGetUrl: 'inventory/item/',
    creatable: true,
    redirectURLOnCreate: '/dashboard/inventory/inventory-item',
};

const resinPercentageField: Partial<InputField> = {
    label: 'Percentage',
    name: 'percentage',
    type: 'number',
    placeholder: 'Enter percentage',
};

function ResinInput() {
    const [entries, setEntries] = useState<ResinEntry[]>([{ name: '', percentage: '' }]);

    const getFieldName = (field: keyof ResinEntry, index: number) => {
        let count = 'one';
        if (index === 1) count = 'two';
        else if (index === 2) count = 'three';

        if (field === 'name') return `resin_${count}`;
        return `resin_${count}_used`;
    };

    const calculateTotal = () => {
        return entries.reduce((sum, entry) => sum + (Number(entry.percentage) || 0), 0);
    };

    const handleAdd = () => {
        if (entries.length >= 3) {
            return;
        }
        setEntries([...entries, { name: '', percentage: '' }]);
    };

    const handleRemove = (index: number) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
    };

    const handleChange = (index: number, field: keyof ResinEntry, value: string) => {
        const newEntries = [...entries];
        if (field === 'percentage') {
            // Only allow numbers and empty string
            if (value !== '' && !/^\d+$/.test(value)) return;
            // Prevent numbers greater than 100
            if (Number(value) > 100) return;
            // Prevent total percentage from exceeding 100
            const total = calculateTotal();
            const diff = Number(value) - Number(entries[index].percentage);
            if (total + diff > 100) return;
        }
        newEntries[index] = { ...newEntries[index], [field]: value };
        setEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-3 gap-x-5">
            <div className="col-span-2 flex flex-col gap-1 mt-2">
                <h3 className="text-lg font-semibold text-gray-700">Resin Input</h3>

                <div className="flex flex-col">
                    {entries.map((entry, index) => (
                        <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={`resin-input-${index}`}
                            className="flex gap-x-5 items-end"
                        >
                            <div className="flex-1">
                                <label
                                    className="font-medium text-gray-600"
                                    htmlFor={getFieldName('name', index)}
                                >
                                    {resinNameField.label}
                                </label>

                                <AsyncCreatableSelect
                                    name={getFieldName('name', index)}
                                    cacheOptions
                                    defaultOptions
                                    required={entries.length === 1}
                                    loadOptions={(inputValue) =>
                                        getPromiseOptionsForDropdown(inputValue, resinNameField)
                                    }
                                    onCreateOption={() =>
                                        resinNameField.redirectURLOnCreate &&
                                        redirectTo(resinNameField.redirectURLOnCreate)
                                    }
                                />
                            </div>

                            <div className="relative flex-1">
                                <input
                                    id={getFieldName('percentage', index)}
                                    placeholder={resinPercentageField.placeholder}
                                    type={resinPercentageField.type}
                                    name={getFieldName('percentage', index)}
                                    defaultValue={resinPercentageField.defaultValue}
                                    value={entry.percentage}
                                    onChange={(e) =>
                                        handleChange(index, 'percentage', e.target.value)
                                    }
                                    className="border placeholder-gray-400 focus:outline-none focus:border-blue-500  w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black pr-6"
                                    required={entries.length === 1}
                                />

                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                    %
                                </span>

                                {entries.length > 1 && (
                                    <button
                                        type="button"
                                        className="absolute -right-10 top-1/2 -translate-y-1/2"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <Delete className="h-6 w-6 text-red-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center gap-x-5 mt-2">
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="bg-purple-600 text-white hover:bg-purple-700 flex items-center rounded-btn py-1 px-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                            disabled={entries.length >= 3}
                        >
                            Add
                            <Plus className="ml-2 h-4 w-4" />
                        </button>
                        <span className="text-sm text-muted-foreground">
                            Total: {calculateTotal()}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResinInput;
