import type { Metadata } from 'next';
import './globals.css';
import styles from '../components/AppShell.module.css';
import BottomNav from '../components/BottomNav';

// Using local font optimization is better, but for simplicity we can use standard layout
import { Outfit } from 'next/font/google';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-outfit',
});

export const metadata: Metadata = {
    title: 'Al Munawwaroh',
    description: 'A modern premium web experience',
    manifest: '/manifest.json',
    icons: {
        icon: 'https://res.cloudinary.com/dkwaosfda/image/upload/v1769953158/LOGO_YAYASAN_BIRU_zrahsk.png',
        apple: 'https://res.cloudinary.com/dkwaosfda/image/upload/v1769953158/LOGO_YAYASAN_BIRU_zrahsk.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className={outfit.variable}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </head>
            <body>
                <div className={styles.container}>
                    <div className="mesh-bg" />
                    <div className={styles.appShell}>
                        {children}
                        <BottomNav />
                    </div>
                </div>
            </body>
        </html>
    );
}
