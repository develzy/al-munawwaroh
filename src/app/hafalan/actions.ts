"use server";

import { getDB } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitHafalan(formData: FormData) {
    const santriId = formData.get('santriId');
    const materi = formData.get('materi');
    const keterangan = formData.get('keterangan');
    const catatan = formData.get('catatan');

    if (!santriId || !materi || !keterangan) {
        throw new Error('Data tidak lengkap');
    }

    const db = getDB();

    await db.prepare(
        'INSERT INTO hafalan (santri_id, materi, keterangan, catatan) VALUES (?, ?, ?, ?)'
    )
        .bind(santriId, materi, keterangan, catatan)
        .run();

    revalidatePath('/');
    revalidatePath('/santri');

    return { success: true };
}
