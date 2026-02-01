"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';
import { addSantri } from '@/app/santri/baru/actions';

export default function AddSantriForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        try {
            const result = await addSantri(formData);
            if (result.success) {
                router.push('/santri');
            } else {
                setError(result.error || 'Gagal menambahkan santri.');
            }
        } catch (e) {
            setError('Terjadi kesalahan. Coba lagi.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className={styles.section} action={handleSubmit}>
            {error && (
                <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    marginBottom: '20px',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    border: '1px solid currentColor'
                }}>
                    {error}
                </div>
            )}

            <div className={`${styles.formGroup} stagger-1`}>
                <label className={styles.label}>Foto Santri</label>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    {preview ? (
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            border: '2px solid var(--accent)',
                            boxShadow: '0 8px 15px rgba(0,0,0,0.3)'
                        }}>
                            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '24px',
                            background: 'var(--surface-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed rgba(255,255,255,0.1)',
                            flexDirection: 'column',
                            color: 'var(--text-muted)'
                        }}>
                            <i className="fa-solid fa-camera" style={{ fontSize: '1.5rem', marginBottom: '8px' }}></i>
                            <span style={{ fontSize: '0.7rem' }}>Belum ada foto</span>
                        </div>
                    )}
                    <input
                        type="file"
                        name="foto"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            width: '100%',
                            maxWidth: '250px'
                        }}
                    />
                </div>
            </div>

            <div className={`${styles.formGroup} stagger-2`}>
                <label className={styles.label}>Nama Lengkap *</label>
                <input name="nama" type="text" className={styles.input} placeholder="Contoh: Muhammad Akhyar" required />
            </div>

            <div className={`${styles.formGroup} stagger-3`}>
                <label className={styles.label}>Tempat Lahir</label>
                <input name="tempat_lahir" type="text" className={styles.input} placeholder="Contoh: Jakarta" />
            </div>

            <div className={`${styles.formGroup} stagger-4`}>
                <label className={styles.label}>Tanggal Lahir</label>
                <input name="tanggal_lahir" type="date" className={styles.input} />
            </div>

            <div className={`${styles.formGroup} stagger-5`}>
                <label className={styles.label}>Nama Ibu Kandung</label>
                <input name="nama_ibu" type="text" className={styles.input} placeholder="Contoh: Siti Aisyah" />
            </div>

            <div className={`${styles.formGroup} stagger-6`}>
                <label className={styles.label}>Kelas / Jilid *</label>
                <input name="kelas" type="text" className={styles.input} placeholder="Contoh: Iqro 4 / Juz 30" required />
            </div>

            <div className={`${styles.formGroup} stagger-7`}>
                <label className={styles.label}>Tingkat Pendidikan *</label>
                <select name="tingkat" className={styles.select} required defaultValue="TPQ">
                    <option value="TPQ">TPQ (Taman Pendidikan Al-Qur'an)</option>
                    <option value="RTQ">RTQ (Rumah Tahfidz Al-Qur'an)</option>
                    <option value="Majlis Talim">Majlis Ta'lim</option>
                </select>
            </div>

            <div className={`${styles.formGroup} stagger-8`}>
                <label className={styles.label}>Status *</label>
                <select name="status" className={styles.select} required defaultValue="aktif">
                    <option value="aktif">Aktif</option>
                    <option value="non-aktif">Non-Aktif</option>
                    <option value="lulus">Lulus</option>
                </select>
            </div>

            <div className={`${styles.formGroup} stagger-9`}>
                <label className={styles.label}>Tahun Masuk *</label>
                <input
                    name="tahun_masuk"
                    type="number"
                    className={styles.input}
                    placeholder="Contoh: 2024"
                    min="2000"
                    max="2100"
                    defaultValue={new Date().getFullYear()}
                    required
                />
            </div>

            <button
                type="submit"
                className={`${styles.submitBtn} stagger-10`}
                disabled={loading}
            >
                {loading ? 'Menyimpan...' : 'Daftarkan Santri'}
            </button>
        </form>
    );
}
