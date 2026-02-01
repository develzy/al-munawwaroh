"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

interface Santri {
    id: number;
    nama: string;
    kelas: string;
    status: 'iqro' | 'alquran';
    foto_url?: string;
}

export default function SantriList({ initialSantri }: { initialSantri: Santri[] }) {
    const [search, setSearch] = useState('');

    const filteredSantri = initialSantri.filter(s =>
        s.nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
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
                            <img
                                src={santri.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(santri.nama)}&background=064e3b&color=d4af37`}
                                alt={santri.nama}
                            />
                        </div>
                        <div className={styles.studentInfo}>
                            <h4>{santri.nama}</h4>
                            <p>{santri.kelas}</p>
                        </div>
                        <div className={`${styles.badge} ${santri.status === 'alquran' ? styles.alquran : styles.iqro}`}>
                            {santri.status === 'alquran' ? "Al-Qur'an" : 'Iqro'}
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
    );
}
