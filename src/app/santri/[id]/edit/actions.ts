'use server';

import { revalidatePath } from 'next/cache';
import { getDB } from '@/lib/db';

const CLOUDINARY_CLOUD_NAME = 'dkwaosfda';
const CLOUDINARY_API_KEY = '125821454392665';
const CLOUDINARY_API_SECRET = 'MP8kWCxdzlXl3UyxzKQJI-cXQRNc';

async function generateSignature(timestamp: number) {
    const str = `timestamp=${timestamp}&upload_preset=ml_default${CLOUDINARY_API_SECRET}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await generateSignature(timestamp);

    const formData = new FormData();
    formData.append('file', dataURI);
    formData.append('upload_preset', 'ml_default');
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('signature', signature);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) {
        throw new Error('Cloudinary upload failed');
    }

    const data = await response.json();
    return data.secure_url;
}

export async function updateSantri(id: number, formData: FormData) {
    const nama = formData.get('nama') as string;
    const tempat_lahir = formData.get('tempat_lahir') as string;
    const tanggal_lahir = formData.get('tanggal_lahir') as string;
    const nama_ibu = formData.get('nama_ibu') as string;
    const kelas = formData.get('kelas') as string;
    const tingkat = formData.get('tingkat') as string;
    const status = formData.get('status') as string;
    const tahun_masuk = formData.get('tahun_masuk') as string;
    const tahun_keluar = formData.get('tahun_keluar') as string;
    const fotoFile = formData.get('foto') as File;

    if (!nama || !kelas || !tingkat || !status || !tahun_masuk) {
        return { success: false, error: 'Field wajib harus diisi' };
    }

    try {
        const db = getDB();

        // Check if new photo is uploaded
        let updateQuery = `UPDATE santri SET 
            nama = ?, 
            tempat_lahir = ?, 
            tanggal_lahir = ?, 
            nama_ibu = ?,
            kelas = ?, 
            tingkat = ?, 
            status = ?, 
            tahun_masuk = ?,
            tahun_keluar = ?,
            updated_at = CURRENT_TIMESTAMP`;

        const params: any[] = [
            nama,
            tempat_lahir || null,
            tanggal_lahir || null,
            nama_ibu || null,
            kelas,
            tingkat,
            status,
            parseInt(tahun_masuk),
            tahun_keluar ? parseInt(tahun_keluar) : null
        ];

        // Upload new photo if provided
        if (fotoFile && fotoFile.size > 0) {
            const foto_url = await uploadToCloudinary(fotoFile);
            updateQuery += ', foto_url = ?';
            params.push(foto_url);
        }

        updateQuery += ' WHERE id = ?';
        params.push(id);

        await db.prepare(updateQuery).bind(...params).run();

        revalidatePath('/santri');
        revalidatePath(`/santri/${id}`);
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('Update santri error:', error);
        return { success: false, error: error.message };
    }
}
