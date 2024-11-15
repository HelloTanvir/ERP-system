'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import { getPromiseOptionsForDropdown } from '@/app/_lib/actions';
import {
    DropdownSelectOption,
    formatNestedItemToDropdownOption,
    InputField,
    NestedItem,
} from '@/app/_lib/utils';
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { InventoryItem } from '../_lib/utils';

interface Props {
    selectedItem?: InventoryItem | null;
}

function CategoryAndSubCategorySelect({ selectedItem }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<DropdownSelectOption | null>(null);

    useEffect(() => {
        if (selectedItem?.category) {
            setSelectedCategory(formatNestedItemToDropdownOption(selectedItem.category));
        }
    }, [selectedItem?.category]);

    return (
        <div className="flex gap-x-5">
            <div className="flex-1">
                <label className="font-medium text-gray-600" htmlFor="category">
                    Item Category
                </label>
                <AsyncSelect
                    id="category"
                    name="category"
                    cacheOptions
                    defaultOptions
                    value={selectedCategory}
                    loadOptions={(inputValue) =>
                        getPromiseOptionsForDropdown(inputValue, {
                            optionsGetUrl: 'inventory/category/',
                            optionsFilterQuery: 'name__icontains',
                        } as InputField)
                    }
                    onChange={(e) => {
                        setSelectedCategory(e as DropdownSelectOption);
                    }}
                />
            </div>

            <div className="flex-1">
                <label className="font-medium text-gray-600" htmlFor="subcategory">
                    Item Subcategory
                </label>
                <AsyncSelect
                    key={selectedCategory?.value}
                    id="subcategory"
                    name="subcategory"
                    cacheOptions
                    defaultOptions
                    defaultValue={formatNestedItemToDropdownOption(
                        selectedItem?.subcategory ?? ({} as NestedItem)
                    )}
                    isDisabled={!selectedCategory}
                    loadOptions={
                        !selectedCategory
                            ? undefined
                            : (inputValue) =>
                                  getPromiseOptionsForDropdown(inputValue, {
                                      optionsGetUrl: `inventory/sub-category/?category__name__icontains=${selectedCategory?.label ?? ''}`,
                                      optionsFilterQuery: 'name__icontains',
                                  } as InputField)
                    }
                />
            </div>
        </div>
    );
}

export default CategoryAndSubCategorySelect;
