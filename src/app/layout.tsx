import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Al Munawwaroh',
    description: 'A modern premium web experience',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
