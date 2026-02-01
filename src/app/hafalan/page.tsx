import Link from 'next/link';
import styles from '../page.module.css';
import { getDB, Santri } from '@/lib/db';
import HafalanForm from './HafalanForm';

export const runtime = 'edge';

async function getSantriList(): Promise<Santri[]> {
    try {
        const db = getDB();
        const { results } = await db.prepare('SELECT id, nama FROM santri ORDER BY nama ASC').all<Santri>();
        return results || [];
    } catch (e) {
        return [];
    }
}

export default async function HafalanPage() {
    const santriList = await getSantriList();

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
                <HafalanForm santriList={santriList} />
            </main>
        </>
    );
}
