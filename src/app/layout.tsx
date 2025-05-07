import '../styles/globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'ISMD - Kontrola a převod slovníků',
  description:
    'Informační systém pro modelování dat - Kontrola a převod slovníků',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
