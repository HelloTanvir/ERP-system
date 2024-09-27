'use server';

import { revalidatePath } from 'next/cache';

export async function addInventoryItem(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/inventory-item');
}

export async function importInventoryFromFile(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/inventory-item');
}
