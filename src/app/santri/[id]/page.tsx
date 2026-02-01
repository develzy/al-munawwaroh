import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../page.module.css';
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

export default async function SantriDetailPage({ params }: { params: { id: string } }) {
    const santri = await getSantriById(params.id);

    if (!santri) {
        notFound();
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const calculateAge = (dateStr?: string) => {
        if (!dateStr) return '-';
        const birthDate = new Date(dateStr);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} tahun`;
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/santri" className={styles.backBtn}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <div className={styles.logoText}>
                        <h1>Profil Santri</h1>
                        <span>Data lengkap santri</span>
                    </div>
                    <Link href={`/santri/${santri.id}/edit`} className={styles.backBtn}>
                        <i className="fa-solid fa-pen"></i>
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    {/* Photo & Name */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '28px',
                            overflow: 'hidden',
                            border: '3px solid var(--accent)',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
                        }}>
                            <img
                                src={santri.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(santri.nama)}&background=064e3b&color=d4af37&size=200`}
                                alt={santri.nama}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: '#fff',
                                marginBottom: '8px'
                            }}>
                                {santri.nama}
                            </h2>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <span className={`${styles.badge} ${santri.status === 'aktif' ? styles.alquran :
                                        santri.status === 'lulus' ? styles.iqro :
                                            styles.nonaktif
                                    }`}>
                                    {santri.status === 'aktif' ? 'Aktif' :
                                        santri.status === 'lulus' ? 'Lulus' :
                                            'Non-Aktif'}
                                </span>
                                <span className={`${styles.badge} ${styles.gold}`}>
                                    {santri.tingkat}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Data Pribadi */}
                    <div className={styles.sectionHeader}>
                        <h3>Data Pribadi</h3>
                    </div>
                    <div style={{
                        background: 'var(--surface-light)',
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '25px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <DetailRow label="Tempat Lahir" value={santri.tempat_lahir || '-'} />
                        <DetailRow label="Tanggal Lahir" value={formatDate(santri.tanggal_lahir)} />
                        <DetailRow label="Usia" value={calculateAge(santri.tanggal_lahir)} />
                        <DetailRow label="Nama Ibu" value={santri.nama_ibu || '-'} />
                    </div>

                    {/* Data Pendidikan */}
                    <div className={styles.sectionHeader}>
                        <h3>Data Pendidikan</h3>
                    </div>
                    <div style={{
                        background: 'var(--surface-light)',
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '25px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <DetailRow label="Kelas" value={santri.kelas} />
                        <DetailRow label="Tingkat" value={santri.tingkat} />
                        <DetailRow label="Tahun Masuk" value={santri.tahun_masuk.toString()} />
                        <DetailRow label="Tahun Keluar" value={santri.tahun_keluar?.toString() || '-'} />
                        <DetailRow
                            label="Lama Belajar"
                            value={santri.tahun_keluar
                                ? `${santri.tahun_keluar - santri.tahun_masuk} tahun`
                                : `${new Date().getFullYear() - santri.tahun_masuk} tahun`
                            }
                        />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                        <Link
                            href={`/santri/${santri.id}/edit`}
                            className={styles.submitBtn}
                            style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                        >
                            <i className="fa-solid fa-pen" style={{ marginRight: '8px' }}></i>
                            Edit Data
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</span>
            <span style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>{value}</span>
        </div>
    );
}
