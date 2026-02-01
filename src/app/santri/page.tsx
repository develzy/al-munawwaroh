"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from '../page.module.css';

const DUMMY_SANTRI = [
    { id: 1, name: 'Ahmad Fulan', class: 'Iqro 4', status: 'iqro' },
    { id: 2, name: 'Siti Aisyah', class: 'Juz 30', status: 'alquran' },
    { id: 3, name: 'Muhammad Ali', class: 'Iqro 2', status: 'iqro' },
    { id: 4, name: 'Fatimah Az-Zahra', class: 'Al-Baqarah', status: 'alquran' },
    { id: 5, name: 'Zaid bin Haritsah', class: 'Iqro 6', status: 'iqro' },
];

export default function SantriPage() {
    const [search, setSearch] = useState('');

    const filteredSantri = DUMMY_SANTRI.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div className={styles.logoText}>
                        <h1>Data Santri</h1>
                        <span>Daftar santri aktif</span>
                    </div>
                    <Link href="/santri/baru" className={styles.backBtn}>
                        <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.searchContainer}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Cari nama santri..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className={styles.studentList}>
                        {filteredSantri.map((santri, index) => (
                            <Link
                                href={`/santri/${santri.id}`}
                                key={santri.id}
                                className={`${styles.studentCard} stagger-${(index % 4) + 1}`}
                            >
                                <div className={styles.studentAvatar}>
                                    {santri.name.charAt(0)}
                                </div>
                                <div className={styles.studentInfo}>
                                    <h4>{santri.name}</h4>
                                    <p>{santri.class}</p>
                                </div>
                                <div className={`${styles.badge} ${santri.status === 'alquran' ? styles.alquran : styles.iqro}`}>
                                    {santri.status === 'alquran' ? 'Al-Qur\'an' : 'Iqro'}
                                </div>
                            </Link>
                        ))}


                        {filteredSantri.length === 0 && (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px' }}>
                                Santri tidak ditemukan.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
