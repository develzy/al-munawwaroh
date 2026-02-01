"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../../page.module.css';
import { useRouter } from 'next/navigation';

export default function SantriBaruPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Santri berhasil didaftarkan!');
            router.push('/santri');
        }, 1500);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/santri" className={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div className={styles.logoText}>
                        <h1>Santri Baru</h1>
                        <span>Form pendaftaran santri</span>
                    </div>
                    <div style={{ width: 42 }}></div>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nama Lengkap</label>
                            <input type="text" className={styles.input} placeholder="Contoh: Ahmad Fulan" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Jenis Kelamin</label>
                            <select className={styles.select} required>
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Program</label>
                            <select className={styles.select} required>
                                <option value="iqro">Iqro</option>
                                <option value="alquran">Al-Qur'an (Tahfidz)</option>
                                <option value="rtq">Rumah Tahfidz (RTQ)</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nama Wali / Orang Tua</label>
                            <input type="text" className={styles.input} placeholder="Nama Ayah/Ibu" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nomor WhatsApp</label>
                            <input type="tel" className={styles.input} placeholder="0812XXXXXXXX" required />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Menyimpan...' : 'Daftarkan Santri'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
