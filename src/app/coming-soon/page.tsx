import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'ISMD - Připravujeme',
  description:
    'Validátor pro kontrolu a převod slovníků v rámci Informačního systému pro modelování dat se připravuje k veřejnému spuštění.',
};

export default function ComingSoonPage() {

const t = useTranslations('ComingSoon');

  return (
    <main className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-5 py-16">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-medium text-blue-primary mb-6">
          {t('Title')}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          {t('Description')}
        </p>
        <p className="text-base text-gray-500">{t('Acknowledgement')}</p>
      </div>
    </main>
  );
}
