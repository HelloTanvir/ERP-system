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
        | 'date';
    placeholder: string;
    options?: string[];
    minLength?: number;
    maxLength?: number;
    required?: boolean;
}

export interface InputProps {
    field: InputField;
    error?: string;
}
