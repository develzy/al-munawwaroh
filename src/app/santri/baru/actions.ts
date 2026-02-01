"use server";

import { getDB } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const CLOUDINARY_CLOUD_NAME = 'dkwaosfda';
const CLOUDINARY_API_KEY = '125821454392665';
const CLOUDINARY_API_SECRET = 'MP8kWCxdzlXl3UyxzKQJI-cXQRNc';

async function uploadToCloudinary(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // You might need to create this in Cloudinary
        formData.append('api_key', CLOUDINARY_API_KEY);

        // For simplicity in Edge, if using unsigned:
        // formData.append('upload_preset', 'your_unsigned_preset');

        // Let's try unsigned first if possible, but user gave secret. 
        // If I use the secret, I must sign.

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = await generateSignature(timestamp);

        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json() as any;
        return data.secure_url || null;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
    }
}

async function generateSignature(timestamp: number) {
    const str = `timestamp=${timestamp}&upload_preset=ml_default${CLOUDINARY_API_SECRET}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function addSantri(formData: FormData) {
    const nama = formData.get('nama') as string;
    const kelas = formData.get('kelas') as string;
    const status = formData.get('status') as string;
    const fotoFile = formData.get('foto') as File;

    if (!nama || !kelas || !status) {
        return { success: false, error: 'Semua field wajib diisi' };
    }

    try {
        let foto_url = null;
        if (fotoFile && fotoFile.size > 0) {
            foto_url = await uploadToCloudinary(fotoFile);
        }

        const db = getDB();
        await db.prepare(
            'INSERT INTO santri (nama, kelas, status, foto_url) VALUES (?, ?, ?, ?)'
        ).bind(nama, kelas, status, foto_url).run();

        revalidatePath('/santri');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('Add santri error:', error);
        return { success: false, error: error.message };
    }
}
