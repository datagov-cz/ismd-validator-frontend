import { GovAccordion } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { SectionHeading } from '../shared/SectionHeading';

import { FaqItem } from './FaqItem';

export const FaqSection = () => {
  const t = useTranslations('Home');

  return (
    <section className="space-y-6">
      <SectionHeading>{t('FaqSection.Headline')}</SectionHeading>
      <GovAccordion className="max-w-[800px]">
        <FaqItem
          label={t('FaqSection.Item1.Question')}
          answer={t('FaqSection.Item1.Answer')}
        />
        <FaqItem
          label={t('FaqSection.Item2.Question')}
          answer={t('FaqSection.Item2.Answer')}
        />
        <FaqItem
          label={t('FaqSection.Item3.Question')}
          answer={t('FaqSection.Item3.Answer')}
        />
        <FaqItem
          label={t('FaqSection.Item4.Question')}
          answer={t('FaqSection.Item4.Answer')}
        />
      </GovAccordion>
    </section>
  );
};
