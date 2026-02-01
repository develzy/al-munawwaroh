import Link from 'next/link';
import styles from '../page.module.css';

export default function SantriPage() {
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
                    <div style={{ width: 42 }}></div> {/* Spacer */}
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '50px' }}>
                        Halaman daftar santri sedang dikembangkan.
                    </p>
                </section>
            </main>
        </>
    );
}
