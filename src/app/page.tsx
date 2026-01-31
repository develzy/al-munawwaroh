import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.blob1} />
            <div className={styles.blob2} />

            <div className={styles.card}>
                <h1 className={styles.title}>
                    Al Munawwaroh
                </h1>
                <p className={styles.description}>
                    Experience the spiritual journey with modern elegance.
                    Discover the beauty of knowledge and community.
                </p>

                <div className={styles.actions}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        Get Started
                    </button>
                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        Learn More
                    </button>
                </div>
            </div>
        </main>
    );
}
