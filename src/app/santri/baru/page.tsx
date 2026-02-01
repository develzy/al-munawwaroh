import Link from 'next/link';
import styles from '../../page.module.css';

export default function SantriBaruPage() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.backBtn}>
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
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '50px' }}>
                        Form pendaftaran santri baru sedang dikembangkan.
                    </p>
                </section>
            </main>
        </>
    );
}
