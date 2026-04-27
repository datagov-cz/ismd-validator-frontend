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

import type { EnvironmentVariables } from '@/components/contexts/Environment';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'ISMD - Kontrola a převod slovníků',
  description:
    'Informační systém pro modelování dat - Kontrola a převod slovníků',
};

const loadEnvVariables = () => {
  // define any variables to be loaded on the node server to be passed to the client
  return {
    environment: process.env.environment ?? 'development',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  
  const variables: EnvironmentVariables = {
    ...loadEnvVariables(),
  }
  
  return (
    <html lang={locale}>
      <head>
        {/* Explicit manifest link — basePath /validujeme must be included.
            Next.js app/manifest.ts auto-generates the link without the basePath (known bug),
            so we serve the file from public/validujeme/ and link it manually instead. */}
        <link rel="manifest" href="/validujeme/manifest.json" />
      </head>
      <NextIntlClientProvider>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.GOV_DS_CONFIG = { iconsPath: '/validujeme/assets/icons' };`,
            }}
          />
          <Providers environmentVariables={variables}>
            <Header />
            {children}
          </Providers>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
