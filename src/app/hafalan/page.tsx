import Link from 'next/link';
import styles from '../page.module.css';

export default function HafalanPage() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div className={styles.logoText}>
                        <h1>Input Hafalan</h1>
                        <span>Update progress santri</span>
                    </div>
                    <div style={{ width: 44 }}></div>
                </div>
            </header>

            <main className={styles.main}>
                <form className={styles.section} onSubmit={(e) => e.preventDefault()}>
                    <div className={`${styles.formGroup} stagger-1`}>
                        <label className={styles.label}>Pilih Santri</label>
                        <select className={styles.select}>
                            <option>Pilih nama santri...</option>
                            <option>Ahmad Fulan</option>
                            <option>Siti Aisyah</option>
                            <option>Muhammad Ali</option>
                        </select>
                    </div>

                    <div className={`${styles.formGroup} stagger-2`}>
                        <label className={styles.label}>Materi Hafalan</label>
                        <select className={styles.select}>
                            <option>Iqro</option>
                            <option>Juz Amma</option>
                            <option>Al-Qur'an (Surah)</option>
                        </select>
                    </div>

                    <div className={`${styles.formGroup} stagger-3`}>
                        <label className={styles.label}>Halaman / Surah / Ayat</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Contoh: Hal 20 / An-Naba / 1-10"
                        />
                    </div>

                    <div className={`${styles.formGroup} stagger-4`}>
                        <label className={styles.label}>Catatan Pengajar</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Catatan perkembangan..."
                        />
                    </div>

                    <button className={`${styles.submitBtn} stagger-4`}>
                        Simpan Progress
                    </button>
                </form>
            </main>
        </>
    );
}

