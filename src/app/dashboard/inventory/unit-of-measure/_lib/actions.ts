'use server';

import { revalidatePath } from 'next/cache';

export async function createUnitOfMeasureItem(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/service');
}
