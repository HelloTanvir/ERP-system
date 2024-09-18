export interface InputField {
    label: string;
    name: string;
    type: 'text' | 'password' | 'tel' | 'email';
    placeholder: string;
    minLength?: number;
    required?: boolean;
}
