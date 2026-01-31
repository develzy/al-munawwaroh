import type { Metadata } from 'next';
import './globals.css';

// Using local font optimization is better, but for simplicity we can use standard layout
// Next.js recommended way is using next/font, I will implement that in the layout
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
        icon: '/logo.png',
        apple: '/logo.png',
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
            <body>{children}</body>
        </html>
    );
}
