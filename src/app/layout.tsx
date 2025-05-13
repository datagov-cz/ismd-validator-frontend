export const dynamic = 'force-dynamic'; 
// TODO: Fix useTranslation not gracefully handling missing localizations.
// It breaks npm run build, specifically the optimization for static pages
// Even more specifically, Layout is a server component, because it's an async function,
// but it needs to be rendered dynamically because of the client components it uses
import '../styles/globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

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
          <Header />
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
