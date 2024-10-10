import { ReactNode } from 'react';
import {
    accountsIcons,
    dashboardIcons,
    inventoryIcons,
    manufacturingIcons,
    settingsIcon,
} from './icons';

export interface SidebarItem {
    label: string;
    icon: ReactNode;
    link?: string;
    subItems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
    {
        label: 'Dashboard',
        icon: dashboardIcons.root,
        link: '/dashboard',
    },
    {
        label: 'Accounts',
        icon: accountsIcons.root,
        subItems: [
            {
                label: 'Customer/Debtors',
                icon: accountsIcons.customerDebtors,
                link: '/dashboard/accounts/customer-debtors',
            },
            {
                label: 'Suppliers/Creditors',
                icon: accountsIcons.suppliersCreditors,
                link: '/dashboard/accounts/suppliers-creditors',
            },
            {
                label: 'All Accounts',
                icon: accountsIcons.allAccounts,
                link: '/dashboard/accounts/all-accounts',
            },
        ],
    },
    {
        label: 'Inventory',
        icon: inventoryIcons.root,
        subItems: [
            {
                label: 'Inventory Item',
                icon: inventoryIcons.inventoryItem,
                link: '/dashboard/inventory/inventory-item',
            },
            {
                label: 'Unit of Measure',
                icon: inventoryIcons.unitOfMeasure,
                link: '/dashboard/inventory/unit-of-measure',
            },
            {
                label: 'Service',
                icon: inventoryIcons.service,
                link: '/dashboard/inventory/service',
            },
            {
                label: 'Warehouse',
                icon: inventoryIcons.warehouse,
                link: '/dashboard/inventory/warehouse',
            },
        ],
    },
    {
        label: 'Manufacturing',
        icon: manufacturingIcons.root,
        subItems: [
            {
                label: 'Bill of Materials',
                icon: manufacturingIcons.billOfMaterials,
                link: '/dashboard/manufacturing/bill-of-materials',
            },
            {
                label: 'Manufacturing Journals',
                icon: manufacturingIcons.manufacturingJournals,
                link: '/dashboard/manufacturing/manufacturing-journals',
            },
            {
                label: 'Manufacturing Templates',
                icon: manufacturingIcons.manufacturingTemplates,
                link: '/dashboard/manufacturing/manufacturing-templates',
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
