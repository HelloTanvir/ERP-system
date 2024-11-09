import { getPromiseOptionsForDropdown, redirectTo } from '@/app/_lib/actions';
import { InputField } from '@/app/_lib/utils';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IMachine } from '../../machine/_lib/utils';
import { IMoldRegister } from '../../mold-register/_lib/utils';
import { getPromiseOptionsForDropdown as getPromiseOptionsForInactiveFromDropdown } from '../_lib/actions';

interface Props {
    field: InputField;
    setItem: (item: IMachine | IMoldRegister) => void;
}

function SelectMoldOrMachineOrInactiveFrom({ field, setItem }: Readonly<Props>) {
    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>
            <AsyncCreatableSelect
                name={field.name}
                cacheOptions
                defaultOptions
                isDisabled={field.disabled}
                required={field.required}
                loadOptions={
                    field.disabled
                        ? undefined
                        : (inputValue) =>
                              field.name === 'downtime'
                                  ? getPromiseOptionsForInactiveFromDropdown(inputValue, field)
                                  : getPromiseOptionsForDropdown(inputValue, field)
                }
                onCreateOption={() =>
                    field.redirectURLOnCreate && redirectTo(field.redirectURLOnCreate)
                }
                onChange={async (selectedOption) => {
                    const item = (selectedOption as unknown as { item: IMachine | IMoldRegister })
                        ?.item;

                    if (item) {
                        setItem(item);
                    }
                }}
            />
        </div>
    );
}

export default SelectMoldOrMachineOrInactiveFrom;
