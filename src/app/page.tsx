import styles from './page.module.css';
import Link from 'next/link';
import { getDB } from '@/lib/db';

export const runtime = 'edge';

async function getDashboardStats() {
    try {
        const db = getDB();
        const { count: totalSantri } = await db.prepare('SELECT COUNT(*) as count FROM santri').first<{ count: number }>() || { count: 142 };
        const { count: countIqro } = await db.prepare("SELECT COUNT(*) as count FROM santri WHERE status = 'iqro'").first<{ count: number }>() || { count: 0 };

        return {
            totalSantri,
            percentIqro: Math.round((countIqro / (totalSantri || 1)) * 100)
        };
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return { totalSantri: 142, percentIqro: 75 };
    }
}

export default async function Home() {
    const stats = await getDashboardStats();

    // Greeting logic (Server side)
    const hour = new Date().getHours();
    const greeting = hour < 10 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';

    return (
        <>
            {/* Header Section */}
            <header className={styles.headerHome}>
                <div className={styles.headerContent}>
                    <div className={styles.logoArea}>
                        <div className={styles.logoWrapper}>
                            <img src="/logo.png" alt="Logo" className={styles.logo} />
                        </div>
                        <div className={styles.logoText}>
                            <h1>Al-Munawwaroh</h1>
                            <span>{greeting}</span>
                        </div>
                    </div>
                    <div className={styles.userAvatar}>
                        <img src="https://ui-avatars.com/api/?name=Admin&background=064e3b&color=d4af37" alt="Admin" />
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className={styles.heroCard}>
                    <div className={styles.cardInfo}>
                        <p>Total Santri Aktif</p>
                        <h2>{stats.totalSantri} <small>Santri</small></h2>
                    </div>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${stats.percentIqro}%` }} />
                        </div>
                        <span>Komposisi Iqro: {stats.percentIqro}%</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h3>Layanan Utama</h3>
                    </div>

                    <div className={styles.menuGrid}>
                        <Link href="/hafalan" className={`${styles.menuItem} stagger-1`}>
                            <div className={`${styles.iconBox} ${styles.gold}`}>
                                <i className="fa-solid fa-book-quran"></i>
                            </div>
                            <span>Hafalan</span>
                        </Link>
                        <Link href="/santri" className={`${styles.menuItem} stagger-2`}>
                            <div className={`${styles.iconBox} ${styles.green}`}>
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <span>Santri</span>
                        </Link>
                        <Link href="/absensi" className={`${styles.menuItem} stagger-3`}>
                            <div className={`${styles.iconBox} ${styles.blue}`}>
                                <i className="fa-solid fa-calendar-check"></i>
                            </div>
                            <span>Absensi</span>
                        </Link>
                        <Link href="/keuangan" className={`${styles.menuItem} stagger-4`}>
                            <div className={`${styles.iconBox} ${styles.purple}`}>
                                <i className="fa-solid fa-hand-holding-heart"></i>
                            </div>
                            <span>Infaq</span>
                        </Link>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h3>Aktivitas Terbaru</h3>
                        <button className={styles.viewAll}>Lihat Semua</button>
                    </div>

                    <div className={styles.activityList}>
                        {/* Static for now, can be fetched from database later */}
                        <div className={`${styles.activityItem} stagger-3`}>
                            <div className={styles.actIcon}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className={styles.actDetails}>
                                <h4>Ahmad Fulan</h4>
                                <p>Menyelesaikan Iqro 4 Halaman 20</p>
                            </div>
                            <span className={styles.actTime}>2m lalu</span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
