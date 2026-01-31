import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
    return (
        <div className={styles.container}>
            {/* Background Decor */}
            <div className={styles.blurBg} />

            {/* App Shell */}
            <div className={styles.appShell}>

                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.logoArea}>
                            <div className={styles.logoWrapper}>
                                <img src="/logo.png" alt="Logo" className={styles.logo} />
                            </div>
                            <div className={styles.logoText}>
                                <h1>Al-Munawwaroh</h1>
                                <span>TPQ - RTQ System</span>
                            </div>
                        </div>
                        <div className={styles.userAvatar}>
                            <img src="https://ui-avatars.com/api/?name=Admin&background=0e4c68&color=fff" alt="Admin" />
                        </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className={styles.heroCard}>
                        <div className={styles.cardInfo}>
                            <p>Total Santri Aktif</p>
                            <h2>142 <small>Anak</small></h2>
                        </div>
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: '75%' }} />
                            </div>
                            <span>Target: 200 Santri</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className={styles.main}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Menu Utama</h3>
                        </div>

                        <div className={styles.menuGrid}>
                            <button className={styles.menuItem}>
                                <div className={`${styles.iconBox} ${styles.gold}`}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </div>
                                <span>Input Hafalan</span>
                            </button>
                            <button className={styles.menuItem}>
                                <div className={`${styles.iconBox} ${styles.green}`}>
                                    <i className="fa-solid fa-user-plus"></i>
                                </div>
                                <span>Santri Baru</span>
                            </button>
                            <button className={styles.menuItem}>
                                <div className={`${styles.iconBox} ${styles.blue}`}>
                                    <i className="fa-solid fa-check-double"></i>
                                </div>
                                <span>Absensi</span>
                            </button>
                            <button className={styles.menuItem}>
                                <div className={`${styles.iconBox} ${styles.purple}`}>
                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                </div>
                                <span>Laporan SPP</span>
                            </button>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3>Aktivitas Terbaru</h3>
                            <button className={styles.viewAll}>Lihat Semua</button>
                        </div>

                        <div className={styles.activityList}>
                            <div className={styles.activityItem}>
                                <div className={styles.actIcon}>
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className={styles.actDetails}>
                                    <h4>Ahmad Fulan</h4>
                                    <p>Menyelesaikan Iqro 4 Halaman 20</p>
                                </div>
                                <span className={styles.actTime}>2m lalu</span>
                            </div>

                            <div className={styles.activityItem}>
                                <div className={`${styles.actIcon} ${styles.goldAct}`}>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <div className={styles.actDetails}>
                                    <h4>Siti Aisyah</h4>
                                    <p>Lulus Tes Juz 30</p>
                                </div>
                                <span className={styles.actTime}>1j lalu</span>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Bottom Navigation */}
                <nav className={styles.bottomNav}>
                    <button className={`${styles.navItem} ${styles.active}`}>
                        <i className="fa-solid fa-house"></i>
                        <span>Beranda</span>
                    </button>
                    <button className={styles.navItem}>
                        <i className="fa-solid fa-users"></i>
                        <span>Santri</span>
                    </button>
                    <button className={styles.navItem}>
                        <i className="fa-solid fa-book-open"></i>
                        <span>Hafalan</span>
                    </button>
                    <button className={styles.navItem}>
                        <i className="fa-solid fa-wallet"></i>
                        <span>Infaq</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}
