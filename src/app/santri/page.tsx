import Link from 'next/link';
import styles from '../page.module.css';
import SantriList from './SantriList';
import { getDB, Santri } from '@/lib/db';

export const runtime = 'edge';

async function getSantriData(): Promise<Santri[]> {
    try {
        const db = getDB();
        const { results } = await db.prepare('SELECT * FROM santri ORDER BY nama ASC').all<Santri>();
        return results || [];
    } catch (error) {
        console.error('Failed to fetch santri:', error);
        // Fallback to empty list during setup
        return [];
    }
}

export default async function SantriPage() {
    const santriData = await getSantriData();

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent} style={{ marginBottom: 0 }}>
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
                <SantriList initialSantri={santriData} />
            </main>
        </>
    );
}
