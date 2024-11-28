import { getPromiseOptionsForDropdown } from '@/app/_lib/actions';
import { InputField } from '@/app/_lib/utils';
import { InventoryItem } from '@/app/dashboard/inventory/inventory-item/_lib/utils';
import AsyncCreatableSelect from 'react-select/async-creatable';

interface Props {
    field: InputField;
    setItem: (item: InventoryItem) => void;
}

function SelectInventoryItem({ field, setItem }: Readonly<Props>) {
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
                defaultValue={field.defaultValue}
                loadOptions={(inputValue) => getPromiseOptionsForDropdown(inputValue, field)}
                onChange={async (selectedOption) => {
                    const item = (
                        selectedOption as unknown as {
                            item: InventoryItem;
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

export default SelectInventoryItem;
