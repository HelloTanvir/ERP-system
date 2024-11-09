import { add, format } from 'date-fns';

export interface DropdownSelectOption {
    label: string;
    value: string;
}

export interface InputField {
    label: string;
    labelPara?: string;
    name: string;
    type:
        | 'text'
        | 'password'
        | 'tel'
        | 'email'
        | 'dropdown'
        | 'number'
        | 'checkbox'
        | 'textarea'
        | 'date'
        | 'date-time'
        | 'file'
        | 'multiple-drag-drop-file'
        | 'otp';
    placeholder: string;
    optionsGetUrl?: string; // for dropdown option input
    optionsFilterQuery?: string; // for dropdown option input
    options?: DropdownSelectOption[]; // for dropdown option input
    creatable?: boolean; // for dropdown option input
    redirectURLOnCreate?: string; // for dropdown option input
    isMulti?: boolean; // for dropdown option input
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    accept?: {
        // for file input
        [key: string]: string[];
    };
    defaultValue?: any;
    disabled?: boolean;
    fullWidth?: boolean;
    isDateTimeRange?: boolean; // for date-time input
}

export interface InputProps {
    field: InputField;
    error?: string;
}

export interface FormState {
    errors: Record<string, string> | null;
    success: boolean;
}

export interface ListResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface NestedItem {
    id: number;
    name: string;
}

export const formatNestedItemToDropdownOption = (item: NestedItem): DropdownSelectOption => ({
    label: item?.name,
    value: item?.id?.toString(),
});

export const formatDateTimestamp = (date: string | undefined | null) => {
    if (!date) return '';
    return format(date, 'PPpp');
};

export const addMinutesToDateTimestamp = (
    date: string | undefined | null,
    minutes: number
): string => {
    if (!date) return '';

    const newDate = new Date(date);
    const updatedDate = add(newDate, { minutes });

    return formatDateTimestamp(updatedDate);
};
