'use server';

import { ListResponse } from '@/app/_lib/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ActionType, InventoryCreationDropdownOptions } from './utils';

export async function importInventoryFromFile(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/inventory-item');
}

export async function getInventoryItemFormDropdownOptions(): Promise<InventoryCreationDropdownOptions> {
    const dropdownOptions: InventoryCreationDropdownOptions = {
        unitOfMeasureOptions: [],
        categoryOptions: [],
        subCategoryOptions: [],
        warehouseOptions: [],
    };

    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const categoryRes = await fetch(`${process.env.API_URL}/inventory/category/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (categoryRes.ok) {
        const data: ListResponse<{
            id: string;
            name: string;
            subcategories: { id: string; name: string }[];
        }> = await categoryRes.json();

        dropdownOptions.categoryOptions = data?.results?.map((item) => {
            if (item.subcategories?.length > 0) {
                dropdownOptions.subCategoryOptions.push(
                    ...item.subcategories.map((subCategory) => ({
                        label: subCategory.name,
                        value: subCategory.id,
                    }))
                );
            }

            return {
                label: item.name,
                value: item.id,
            };
        });
    }

    const unitOfMeasurementRes = await fetch(`${process.env.API_URL}/inventory/measurement-unit/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (unitOfMeasurementRes.ok) {
        const data: ListResponse<{
            id: string;
            name: string;
        }> = await unitOfMeasurementRes.json();

        dropdownOptions.unitOfMeasureOptions = data?.results?.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }

    const warehouseRes = await fetch(`${process.env.API_URL}/inventory/warehouse/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
    });

    if (warehouseRes.ok) {
        const data: ListResponse<{
            id: string;
            name: string;
        }> = await warehouseRes.json();
        dropdownOptions.warehouseOptions = data?.results?.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }

    return dropdownOptions;
}

export async function createCategoryOrSubCategory(actionType: ActionType, formData: FormData) {
    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const body: {
        name: string;
        category?: string;
    } = {
        name: formData.get('name') as unknown as string,
    };

    if (actionType === 'subcategory-create')
        body.category = formData.get('category') as unknown as string;

    const res = await fetch(
        `${process.env.API_URL}/inventory/${actionType === 'category-create' ? 'category' : 'sub-category'}/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token?.value}`,
            },
            body: JSON.stringify(body),
        }
    );

    if (!res.ok) {
        const errors = await res.json();
        return { success: false, errors };
    }

    revalidatePath('/dashboard/inventory/inventory-item');
    return { success: true, errors: null };
}
