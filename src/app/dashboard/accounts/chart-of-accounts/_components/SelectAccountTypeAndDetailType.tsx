'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import { DropdownSelectOption, InputField } from '@/app/_lib/utils';
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getPromiseOptionsForDropdown } from '../_lib/actions';
import { IChartOfAccount } from '../_lib/utils';

interface Props {
    selectedItem?: IChartOfAccount | null;
}

function SelectAccountTypeAndDetailType({ selectedItem }: Props) {
    const [selectedAccountType, setSelectedAccountType] = useState<DropdownSelectOption | null>(
        null
    );

    useEffect(() => {
        if (selectedItem?.category?.account_type) {
            setSelectedAccountType({
                label: selectedItem.category.account_type,
                value: selectedItem.category.id?.toString(),
            });
        }
    }, [selectedItem?.category?.account_type, selectedItem?.category?.id]);

    return (
        <div className="flex gap-x-5 col-span-2">
            <div className="flex-1">
                <label className="font-medium text-gray-600" htmlFor="account_type">
                    Account Type
                </label>
                <AsyncSelect
                    id="account_type"
                    name="account_type"
                    required
                    cacheOptions
                    defaultOptions
                    value={selectedAccountType}
                    loadOptions={(inputValue) =>
                        getPromiseOptionsForDropdown(inputValue, {
                            name: 'account_type',
                            optionsGetUrl: 'finance/account-cateogy/',
                            optionsFilterQuery: 'account_type__icontains',
                        } as InputField)
                    }
                    onChange={(e) => {
                        setSelectedAccountType(e as DropdownSelectOption);
                    }}
                />
            </div>

            <div className="flex-1">
                <label className="font-medium text-gray-600" htmlFor="detail_type">
                    Detail Type
                </label>
                <AsyncSelect
                    key={selectedAccountType?.value}
                    id="detail_type"
                    name="detail_type"
                    required
                    cacheOptions
                    defaultOptions
                    defaultValue={{
                        label: selectedItem?.category?.detail_type,
                        value: selectedItem?.category?.id?.toString(),
                    }}
                    isDisabled={!selectedAccountType}
                    loadOptions={
                        !selectedAccountType
                            ? undefined
                            : (inputValue) =>
                                  getPromiseOptionsForDropdown(inputValue, {
                                      name: 'detail_type',
                                      optionsGetUrl: `finance/account-cateogy/?account_type__icontains=${selectedAccountType?.label ?? ''}`,
                                      optionsFilterQuery: 'detail_type__icontains',
                                  } as InputField)
                    }
                />
            </div>
        </div>
    );
}

export default SelectAccountTypeAndDetailType;
