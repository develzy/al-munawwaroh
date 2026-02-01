import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDB() {
    const context = getRequestContext();
    const db = (context.env as any).DB as D1Database;

    if (!db) {
        throw new Error('D1 Database binding not found. Make sure wrangler.jsonc is configured correctly.');
    }

    return db;
}

export interface Santri {
    id: number;
    nama: string;
    kelas: string;
    status: 'iqro' | 'alquran';
    tanggal_masuk: string;
}

export interface Hafalan {
    id: number;
    santri_id: number;
    materi: string;
    keterangan: string;
    catatan: string;
    tanggal: string;
}
