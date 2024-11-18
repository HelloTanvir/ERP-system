import { InputField } from '@/app/_lib/utils';

interface IAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface ICustomer {
    id: number;
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    mobile: string;
    website: string;
    remarks: string;
    as_of_date: string;
    opening_balance: number;
    tax_rate: number;
    billing_address: IAddress;
    shipping_address: IAddress;
}

export const getInputFields = (): InputField[] => {
    return [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Enter customer name',
            required: true,
        },
        {
            label: 'Title',
            name: 'title',
            type: 'text',
            placeholder: 'Enter customer title',
            required: true,
        },
        {
            label: 'Company',
            name: 'company',
            type: 'text',
            placeholder: 'Enter customer company',
            required: true,
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'Enter customer email',
            required: true,
        },
        {
            label: 'Phone',
            name: 'phone',
            type: 'tel',
            placeholder: 'Enter customer phone',
            fullWidth: true,
        },
        {
            label: 'Mobile',
            name: 'mobile',
            type: 'tel',
            placeholder: 'Enter customer mobile',
            fullWidth: true,
        },
        {
            label: 'Website',
            name: 'website',
            type: 'url',
            placeholder: 'Enter customer website',
        },
        {
            label: 'As of Date',
            name: 'as_of_date',
            type: 'date',
            placeholder: 'Enter customer as of date',
        },
        {
            label: 'Opening Balance',
            name: 'opening_balance',
            type: 'number',
            placeholder: 'Enter customer opening balance',
        },
        {
            label: 'Tax Rate',
            name: 'tax_rate',
            type: 'number',
            placeholder: 'Enter customer tax rate',
        },
        {
            name: 'billing_address',
            sectionLabel: 'Billing Address',
        },
        {
            label: 'Street',
            name: 'billing_address.street',
            type: 'text',
            placeholder: 'Enter customer billing street',
            fullWidth: true,
            required: true,
        },
        {
            label: 'City',
            name: 'billing_address.city',
            type: 'text',
            placeholder: 'Enter customer billing city',
            required: true,
        },
        {
            label: 'State',
            name: 'billing_address.state',
            type: 'text',
            placeholder: 'Enter customer billing state',
            required: true,
        },
        {
            label: 'Zip',
            name: 'billing_address.zip',
            type: 'text',
            placeholder: 'Enter customer billing zip',
            required: true,
        },
        {
            name: 'shipping_address',
            sectionLabel: 'Shipping Address',
        },
        {
            label: 'Street',
            name: 'shipping_address.street',
            type: 'text',
            placeholder: 'Enter customer shipping street',
            fullWidth: true,
            required: true,
        },
        {
            label: 'City',
            name: 'shipping_address.city',
            type: 'text',
            placeholder: 'Enter customer shipping city',
            required: true,
        },
        {
            label: 'State',
            name: 'shipping_address.state',
            type: 'text',
            placeholder: 'Enter customer shipping state',
            required: true,
        },
        {
            label: 'Zip',
            name: 'shipping_address.zip',
            type: 'text',
            placeholder: 'Enter customer shipping zip',
            required: true,
        },
        {
            label: 'Remarks',
            name: 'remarks',
            type: 'textarea',
            placeholder: 'Enter customer remarks',
            fullWidth: true,
        },
    ];
};
