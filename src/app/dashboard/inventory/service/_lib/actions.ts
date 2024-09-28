'use server';

import { revalidatePath } from 'next/cache';

export async function createServiceItem(formData: FormData) {
    console.log(formData);
    revalidatePath('/dashboard/inventory/service');
}
