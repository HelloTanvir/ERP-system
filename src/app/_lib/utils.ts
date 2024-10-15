export interface InputField {
    label: string;
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
        | 'file'
        | 'multiple-drag-drop-file';
    placeholder: string;
    options?: {
        // for dropdown option input
        label: string;
        value: string;
    }[];
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
}

export interface InputProps {
    field: InputField;
    error?: string;
}

export interface DropdownSelectOption {
    label: string;
    value: string;
}

export interface FormState {
    errors: Record<string, string> | null;
    success: boolean;
}
