import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { label: 'Beranda', icon: 'fa-house', href: '/' },
        { label: 'Santri', icon: 'fa-users', href: '/santri' },
        { label: 'Hafalan', icon: 'fa-book-open', href: '/hafalan' },
        { label: 'Infaq', icon: 'fa-wallet', href: '/keuangan' },
    ];

    return (
        <nav className={styles.bottomNav}>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                >
                    <i className={`fa-solid ${item.icon}`}></i>
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
};

export default BottomNav;
