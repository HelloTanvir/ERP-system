export interface InputField {
    label: string;
    name: string;
    type: 'text' | 'password' | 'tel' | 'email';
    placeholder: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
}

export interface InputProps {
    field: InputField;
    error?: string;
}
