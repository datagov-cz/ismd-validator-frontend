import { GovBanner, GovButton, GovIcon } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { FaqSection } from '@/components/faq/FaqSection';
import { InfoSection } from '@/components/infoSection/InfoSection';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="w-full max-w-desktop mx-auto px-3 py-6">
      <div className="space-y-12">
        <GovBanner size="m" background="simple" foreground="logo">
          <h3 slot="headline">{t('Banner.Headline')}</h3>
          <p>{t('Banner.Description')}</p>
          <GovButton color="secondary" size="l" type="solid" slot="button">
            {t('Banner.Button')}
          </GovButton>
        </GovBanner>
        <section className="relative flex items-center p-4 w-full bg-blue-subtle gap-x-3 text-blue-primary">
          <GovIcon name="lightbulb-fill" slot="icon" />
          <p>
            {t('Message.Content')}&nbsp;
            <a href="" className="underline">
              {t('Message.Link')}
            </a>
          </p>
          <GovButton
            type="solid"
            size="m"
            className="absolute top-1/2 -translate-y-1/2 right-0"
            aria-label={t('Message.CloseButtonAria')}
          >
            <GovIcon name="x" slot="icon-start" />
          </GovButton>
        </section>
        <InfoSection />
        <FaqSection />
      </div>
      <main></main>
    </div>
  );
}
