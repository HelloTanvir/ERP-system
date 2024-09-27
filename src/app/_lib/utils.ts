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
    options?: string[]; // for dropdown option input
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    accept?: {
        // for file input
        [key: string]: string[];
    };
}

export interface InputProps {
    field: InputField;
    error?: string;
}
