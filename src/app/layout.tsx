import '../styles/globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'ISMD - Kontrola a převod slovníků',
  description:
    'Informační systém pro modelování dat - Kontrola a převod slovníků',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body>
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
