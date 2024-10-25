'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ActionType } from './utils';

export async function importInventoryFromFile(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/inventory-item');
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
