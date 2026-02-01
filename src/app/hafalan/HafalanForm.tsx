"use client";

import { useState } from 'react';
import styles from '../page.module.css';
import { submitHafalan } from './actions';

interface SantriShort {
    id: number;
    nama: string;
}

export default function HafalanForm({ santriList }: { santriList: SantriShort[] }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setStatus(null);
        try {
            await submitHafalan(formData);
            setStatus('Berhasil menyimpan hafalan!');
            (document.getElementById('hafalan-form') as HTMLFormElement).reset();
        } catch (e) {
            setStatus('Gagal menyimpan. Coba lagi.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form id="hafalan-form" className={styles.section} action={handleSubmit}>
            {status && (
                <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: status.includes('Gagal') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: status.includes('Gagal') ? '#ef4444' : '#10b981',
                    marginBottom: '20px',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    border: '1px solid currentColor'
                }}>
                    {status}
                </div>
            )}

            <div className={`${styles.formGroup} stagger-1`}>
                <label className={styles.label}>Pilih Santri</label>
                <select name="santriId" className={styles.select} required>
                    <option value="">Pilih nama santri...</option>
                    {santriList.map(s => (
                        <option key={s.id} value={s.id}>{s.nama}</option>
                    ))}
                </select>
            </div>

            <div className={`${styles.formGroup} stagger-2`}>
                <label className={styles.label}>Materi Hafalan</label>
                <select name="materi" className={styles.select} required>
                    <option value="Iqro">Iqro</option>
                    <option value="Juz Amma">Juz Amma</option>
                    <option value="Al-Qur'an">Al-Qur'an</option>
                </select>
            </div>

            <div className={`${styles.formGroup} stagger-3`}>
                <label className={styles.label}>Halaman / Surah / Ayat</label>
                <input
                    name="keterangan"
                    type="text"
                    className={styles.input}
                    placeholder="Contoh: Hal 20 / An-Naba / 1-10"
                    required
                />
            </div>

            <div className={`${styles.formGroup} stagger-4`}>
                <label className={styles.label}>Catatan Pengajar</label>
                <input
                    name="catatan"
                    type="text"
                    className={styles.input}
                    placeholder="Catatan perkembangan..."
                />
            </div>

            <button
                type="submit"
                className={`${styles.submitBtn} stagger-4`}
                disabled={loading}
            >
                {loading ? 'Menyimpan...' : 'Simpan Progress'}
            </button>
        </form>
    );
}
