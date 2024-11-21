import { ReactNode } from 'react';
import {
    accountsIcons,
    dashboardIcons,
    injectionModuleIcons,
    inventoryIcons,
    purchaseIcons,
    salesIcons,
    settingsIcon,
} from './icons';

export interface SidebarItem {
    label: string;
    icon?: ReactNode;
    link?: string;
    subItems?: SidebarItem[];
}

export interface SearchField {
    type: 'text' | 'dropdown' | 'date';
    name: string;
    label?: string;
    options?: string[];
}

export const sidebarItems: SidebarItem[] = [
    {
        label: 'Dashboard',
        icon: dashboardIcons.root,
        link: '/dashboard',
    },
    {
        label: 'Accounts Module',
        icon: accountsIcons.root,
        subItems: [
            { label: 'Chart of Accounts', link: '/dashboard/accounts/chart-of-accounts' },
            { label: 'Expense Entry', link: '/dashboard/accounts/expense-entry' },
            { label: 'Income Entry', link: '/dashboard/accounts/income-entry' },
            { label: 'Journal Entry', link: '/dashboard/accounts/journal-entry' },
            { label: 'Banking', link: '/dashboard/accounts/banking' },
            { label: 'Budgeting', link: '/dashboard/accounts/budgeting' },
            { label: 'Costing', link: '/dashboard/accounts/costing' },
            { label: 'Workflow Automation', link: '/dashboard/accounts/workflow-automation' },
            { label: 'Cheque Management', link: '/dashboard/accounts/cheque-management' },
            { label: 'Report', link: '/dashboard/accounts/report' },
        ],
    },
    {
        label: 'Sales Module',
        icon: salesIcons.root,
        subItems: [
            { label: 'Customer', link: '/dashboard/sales/customer' },
            { label: 'Dashboard/Workflow Notifications', link: '/dashboard/sales/dashboard' },
            { label: 'Delivery Challan (DCN)', link: '/dashboard/sales/delivery-challan' },
            { label: 'Sales/Invoice/Bill', link: '/dashboard/sales/invoice-bill' },
            { label: 'Receive Payment', link: '/dashboard/sales/receive-payment' },
            { label: 'Sales Return Challan (SRN)', link: '/dashboard/sales/sales-return-challan' },
            { label: 'Inventory Asset Debit', link: '/dashboard/sales/inventory-asset-debit' },
            { label: 'Sales Return Bill', link: '/dashboard/sales/sales-return-bill' },
            { label: 'Report', link: '/dashboard/sales/report' },
        ],
    },
    {
        label: 'Purchase Module',
        icon: purchaseIcons.root,
        subItems: [
            { label: 'Purchase Requisition', link: '/dashboard/purchase/purchase-requisition' },
            { label: 'Purchase Order', link: '/dashboard/purchase/purchase-order' },
            {
                label: 'Receive Inventory without Bill',
                link: '/dashboard/purchase/receive-inventory-without-bill',
            },
            { label: 'Purchase Journal', link: '/dashboard/purchase/purchase-journal' },
            { label: 'Payment to Supplier', link: '/dashboard/purchase/payment-to-supplier' },
            {
                label: 'Purchase Return without value',
                link: '/dashboard/purchase/purchase-return-no-value',
            },
            {
                label: 'Purchase Return Journal',
                link: '/dashboard/purchase/purchase-return-journal',
            },
            {
                label: 'Inventory Requisition (Raw Material)',
                link: '/dashboard/purchase/inventory-requisition-raw-material',
            },
        ],
    },
    {
        label: 'Inventory Module',
        icon: inventoryIcons.root,
        subItems: [
            { label: 'Inventory Item', link: '/dashboard/inventory/inventory-item' },
            { label: 'Unit of Measure', link: '/dashboard/inventory/unit-of-measure' },
            { label: 'Service', link: '/dashboard/inventory/service' },
            { label: 'Warehouse', link: '/dashboard/inventory/warehouse' },
            {
                label: 'Transaction',
                subItems: [
                    {
                        label: 'Inventory Transfer',
                        link: '/dashboard/inventory/transaction/transfer',
                    },
                    {
                        label: 'Inventory Adjustment',
                        link: '/dashboard/inventory/transaction/adjustment',
                    },
                    {
                        label: 'Manufacturing Journal',
                        link: '/dashboard/inventory/transaction/manufacturing-journal',
                    },
                ],
            },
        ],
    },
    {
        label: 'Injection Module',
        icon: injectionModuleIcons.root,
        subItems: [
            { label: 'Mold Register', link: '/dashboard/injection/mold-register' },
            { label: 'Upcoming Molds', link: '/dashboard/injection/upcoming-molds' },
            { label: 'Mold Time Sheet', link: '/dashboard/injection/mold-time-sheet' },
            {
                label: 'Non Production Time Record',
                link: '/dashboard/injection/non-production-time-record',
            },
            {
                label: 'Schedule',
                link: '/dashboard/injection/schedule',
            },
            { label: 'Input Production', link: '/dashboard/injection/input-production' },
            {
                label: 'Input Recycle Production',
                link: '/dashboard/injection/input-recycle-production',
            },
            {
                label: 'Machine',
                link: '/dashboard/injection/machine',
            },
            {
                label: 'Shift',
                link: '/dashboard/injection/shift',
            },
        ],
    },
    {
        label: 'Settings',
        icon: settingsIcon,
        link: '/settings',
    },
];

export interface GenericItem {
    id: number | string;
    [key: string]: any;
}

export interface SearchParams {
    [key: string]: string;
}

export const ITEMS_PER_PAGE = '10';
