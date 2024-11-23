import { redirectTo } from '@/app/_lib/actions';
import { InputField } from '@/app/_lib/utils';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IMoldTimeSheet } from '../../mold-time-sheet/_lib/utils';
import { getPromiseOptionsForTimeSheetDropdown } from '../_lib/actions';

interface Props {
    field: InputField;
    setItem: (item: IMoldTimeSheet) => void;
}

function SelectMoldTimeSheet({ field, setItem }: Readonly<Props>) {
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
                        : (inputValue) => getPromiseOptionsForTimeSheetDropdown(inputValue, field)
                }
                onCreateOption={() =>
                    field.redirectURLOnCreate && redirectTo(field.redirectURLOnCreate)
                }
                onChange={async (selectedOption) => {
                    const item = (
                        selectedOption as unknown as {
                            item: IMoldTimeSheet;
                        }
                    )?.item;

                    if (item) {
                        setItem(item);
                    }
                }}
            />
        </div>
    );
}

export default SelectMoldTimeSheet;
