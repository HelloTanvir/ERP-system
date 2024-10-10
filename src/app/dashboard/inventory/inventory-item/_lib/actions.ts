'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ActionType, InventoryCreationDropdownOptions, InventoryItem } from './utils';

// TODO: remove this once done with the dynamic input field fix
export async function addInventoryItem(
    formData: FormData
): Promise<{ errors: Record<string, string> | null; success: boolean }> {
    const inventoryItem: InventoryItem = {};

    [...formData.entries()].forEach((entry) => {
        const [key, value] = entry;

        if (!key.includes('$ACTION_ID_') && !['warehouse', 'quantity'].includes(key))
            inventoryItem[key] = value;
    });

    const allocations = [];
    const allocationWarehouses = formData.getAll('warehouse');
    const allocationQuantities = formData.getAll('quantity');
    if (
        allocationWarehouses.length > 0 &&
        allocationWarehouses.length === allocationQuantities.length
    ) {
        for (let i = 0; i < allocationWarehouses.length; i++) {
            allocations.push({
                warehouse: allocationWarehouses[i],
                quantity: allocationQuantities[i],
            });
        }
    }

    if (allocations.length > 0) inventoryItem.allocations = allocations;

    const cookieStore = cookies();
    const access_token = cookieStore.get('access-token');

    const res = await fetch(`${process.env.API_URL}/inventory/item/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token?.value}`,
        },
        body: JSON.stringify(inventoryItem),
    });

    if (!res.ok) {
        const errors = await res.json();
        return { success: false, errors };
    }

    revalidatePath('/dashboard/inventory/inventory-item');
    return { success: true, errors: null };
}

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
        const data = await categoryRes.json();
        dropdownOptions.categoryOptions = (data || []).map((item) => {
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
        const data = await unitOfMeasurementRes.json();
        dropdownOptions.unitOfMeasureOptions = (data || []).map((item) => ({
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
        const data = await warehouseRes.json();
        dropdownOptions.warehouseOptions = (data || []).map((item) => ({
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
        name: formData.get('name'),
    };

    if (actionType === 'subcategory-create') body.category = formData.get('category');

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
