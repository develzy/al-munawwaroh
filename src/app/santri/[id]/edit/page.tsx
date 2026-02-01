import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../../page.module.css';
import EditSantriForm from './EditSantriForm';
import { getDB, Santri } from '@/lib/db';

export const runtime = 'edge';

async function getSantriById(id: string): Promise<Santri | null> {
    try {
        const db = getDB();
        const santri = await db.prepare('SELECT * FROM santri WHERE id = ?').bind(id).first<Santri>();
        return santri || null;
    } catch (error) {
        console.error('Failed to fetch santri:', error);
        return null;
    }
}

export default async function EditSantriPage({ params }: { params: { id: string } }) {
    const santri = await getSantriById(params.id);

    if (!santri) {
        notFound();
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href={`/santri/${params.id}`} className={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div className={styles.logoText}>
                        <h1>Edit Santri</h1>
                        <span>Perbarui data santri</span>
                    </div>
                    <div style={{ width: 44 }}></div>
                </div>
            </header>

            <main className={styles.main}>
                <EditSantriForm santri={santri} />
            </main>
        </>
    );
}
