import { formatDateTimestamp, InputField } from '@/app/_lib/utils';
import { cn } from '@/lib/utils';
import { Dispatch } from '@reduxjs/toolkit';
import { Calendar as CalendarIcon } from 'lucide-react';
import { SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    field: InputField;
    error: string | null;
    productionEnd: Date | null;
    setProductionEnd: Dispatch<SetStateAction<Date | null>>;
}

function SelectProductionEnd({ field, error, productionEnd, setProductionEnd }: Readonly<Props>) {
    const handleDateChange = (date: Date | null) => {
        setProductionEnd(date);
    };

    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <DatePicker
                required={field.required}
                disabled={field.disabled}
                selected={productionEnd}
                onChange={handleDateChange}
                startDate={productionEnd}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                customInput={
                    <button
                        type="button"
                        className={cn(
                            'w-full justify-start text-left font-normal rounded-btn border relative',
                            !productionEnd && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDateTimestamp(productionEnd)}
                        <input
                            className="h-0 absolute top-1/2 left-3 -translate-x-1/2"
                            required={field.required}
                            name={field.name}
                            value={formatDateTimestamp(productionEnd)}
                            readOnly
                        />
                    </button>
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                wrapperClassName="w-full"
            />

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default SelectProductionEnd;
