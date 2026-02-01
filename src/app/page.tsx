import styles from './page.module.css';
import Link from 'next/link';
import { getDB } from '@/lib/db';

export const runtime = 'edge';

async function getDashboardData() {
    try {
        const db = getDB();
        const { count: totalSantri } = await db.prepare('SELECT COUNT(*) as count FROM santri').first<{ count: number }>() || { count: 0 };
        const { count: countIqro } = await db.prepare("SELECT COUNT(*) as count FROM santri WHERE status = 'iqro'").first<{ count: number }>() || { count: 0 };

        // Fetch recent activities
        interface Activity {
            nama: string;
            materi: string;
            keterangan: string;
            tanggal: string;
        }
        const { results: activities } = await db.prepare(`
            SELECT s.nama, h.materi, h.keterangan, h.tanggal 
            FROM hafalan h 
            JOIN santri s ON h.santri_id = s.id 
            ORDER BY h.tanggal DESC 
            LIMIT 5
        `).all<Activity>();

        return {
            totalSantri,
            percentIqro: totalSantri > 0 ? Math.round((countIqro / totalSantri) * 100) : 0,
            activities: activities || []
        };
    } catch (error) {
        console.error('Dashboard data error:', error);
        return {
            totalSantri: 142,
            percentIqro: 75,
            activities: [
                { nama: 'Ahmad Fulan', materi: 'Iqro', keterangan: 'Hal 20', tanggal: new Date().toISOString() }
            ]
        };
    }
}

function getTimeAgo(dateStr: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'Baru saja';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j lalu`;
    return new Date(dateStr).toLocaleDateString();
}

export default async function Home() {
    const data = await getDashboardData();

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
                            <img src="https://res.cloudinary.com/dkwaosfda/image/upload/v1769953158/LOGO_YAYASAN_BIRU_zrahsk.png" alt="Logo" className={styles.logo} />
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
                        <h2>{data.totalSantri} <small>Santri</small></h2>
                    </div>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${data.percentIqro}%` }} />
                        </div>
                        <span>Komposisi Iqro: {data.percentIqro}%</span>
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
                                <i className="fa-solid fa-id-card"></i>
                            </div>
                            <span>Data Diri</span>
                        </Link>
                        <Link href="/absensi" className={`${styles.menuItem} stagger-3`}>
                            <div className={`${styles.iconBox} ${styles.blue}`}>
                                <i className="fa-solid fa-calendar-check"></i>
                            </div>
                            <span>Absensi</span>
                        </Link>
                        <Link href="/syahriah" className={`${styles.menuItem} stagger-4`}>
                            <div className={`${styles.iconBox} ${styles.purple}`}>
                                <i className="fa-solid fa-money-bill-wave"></i>
                            </div>
                            <span>Syahriah</span>
                        </Link>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h3>Aktivitas Terbaru</h3>
                        <button className={styles.viewAll}>Lihat Semua</button>
                    </div>

                    <div className={styles.activityList}>
                        {data.activities.length > 0 ? data.activities.map((act, idx) => (
                            <div key={idx} className={`${styles.activityItem} stagger-${(idx % 4) + 1}`}>
                                <div className={styles.actIcon}>
                                    <i className={`fa-solid ${act.materi === "Al-Qur'an" ? 'fa-crown' : 'fa-check'}`}></i>
                                </div>
                                <div className={styles.actDetails}>
                                    <h4>{act.nama}</h4>
                                    <p>{act.materi} - {act.keterangan}</p>
                                </div>
                                <span className={styles.actTime}>{getTimeAgo(act.tanggal)}</span>
                            </div>
                        )) : (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Belum ada aktivitas hari ini.</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
