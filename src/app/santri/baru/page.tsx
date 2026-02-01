import Link from 'next/link';
import styles from '@/app/page.module.css';
import AddSantriForm from '@/app/santri/baru/AddSantriForm';

export const runtime = 'edge';

export default function AddSantriPage() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/santri" className={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div className={styles.logoText}>
                        <h1>Tambah Santri</h1>
                        <span>Daftarkan santri baru</span>
                    </div>
                    <div style={{ width: 44 }}></div>
                </div>
            </header>

            <main className={styles.main}>
                <AddSantriForm />
            </main>
        </>
    );
}
