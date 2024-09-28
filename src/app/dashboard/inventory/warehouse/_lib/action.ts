'use server';

import { revalidatePath } from 'next/cache';

export async function addWarehouseItem(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/warehouse');
}
