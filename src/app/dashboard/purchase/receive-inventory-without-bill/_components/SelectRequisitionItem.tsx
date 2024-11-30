import { InputField } from '@/app/_lib/utils';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { getPromiseOptionsForDropdown } from '../../purchase-order/_lib/actions';
import { IReceiveInventoryWithoutBill } from '../_lib/utils';

interface Props {
    field: InputField;
    setItem: (item: IReceiveInventoryWithoutBill) => void;
}

function SelectRequisitionItem({ field, setItem }: Readonly<Props>) {
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
                            item: IReceiveInventoryWithoutBill;
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

export default SelectRequisitionItem;
