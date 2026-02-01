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
    tempat_lahir?: string;
    tanggal_lahir?: string;
    nama_ibu?: string;
    kelas: string;
    tingkat: 'TPQ' | 'RTQ' | 'Majlis Talim';
    status: 'aktif' | 'non-aktif' | 'lulus';
    tahun_masuk: number;
    tahun_keluar?: number;
    foto_url?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Hafalan {
    id: number;
    santri_id: number;
    materi: string;
    keterangan: string;
    catatan: string;
    tanggal: string;
}
