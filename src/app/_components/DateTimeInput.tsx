'use client';

import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { formatDateTimestamp, InputProps } from '../_lib/utils';

import 'react-datepicker/dist/react-datepicker.css';

function DateTimeInput({ field, error }: Readonly<InputProps>) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const isRange = field.isDateTimeRange;

    const handleDateChange = (date: Date | null) => {
        if (isRange) {
            if (!startDate) {
                setStartDate(date);
                setEndDate(null);
            } else {
                setEndDate(date);
            }
        } else {
            setStartDate(date);
        }
    };

    const formatDateRange = () => {
        if (isRange && startDate && endDate) {
            return `${formatDateTimestamp(startDate)} - ${formatDateTimestamp(endDate)}`;
        }
        return formatDateTimestamp(startDate);
    };

    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <DatePicker
                id={field.name}
                name={field.name}
                disabled={field.disabled}
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange={isRange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                customInput={
                    <button
                        type="button"
                        className={cn(
                            'w-full justify-start text-left font-normal rounded-btn border',
                            !startDate && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDateRange()}
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

export default DateTimeInput as FC<InputProps>;
