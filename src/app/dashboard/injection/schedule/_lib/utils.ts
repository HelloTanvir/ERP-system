import { SearchField } from '@/app/dashboard/_lib/utils';

export const getSearchFields = (): SearchField[] => {
    return [
        {
            label: 'Machine Name',
            type: 'text',
            name: 'machine_name',
        },
    ];
};

export const MAX_ITEMS_PER_CAROUSEL = 3;
