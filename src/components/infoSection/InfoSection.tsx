'use client';

import { GovTile } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { GovIcon } from '@/components/shared/GovIcon';
import { SectionHeading } from '../shared/SectionHeading';

const tiles = [
  {
    icon: 'info',
    iconType: 'components' as const,
    titleKey: 'Item1.Title',
    textKey: 'Item1.Description',
  },
  {
    icon: 'portal',
    iconType: 'complex' as const,
    titleKey: 'Item2.Title',
    textKey: 'Item2.Description',
  },
  {
    icon: 'info-list',
    iconType: 'complex' as const,
    titleKey: 'Item3.Title',
    textKey: 'Item3.Description',
  },
  {
    icon: 'portal',
    iconType: 'complex' as const,
    titleKey: 'Item4.Title',
    textKey: 'Item4.Description',
  },
];

export const InfoSection = () => {
  const t = useTranslations('Home.InfoSection');

  return (
    <section className="space-y-6">
      <SectionHeading>{t('Headline')}</SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        {tiles.map(({ icon, iconType, titleKey, textKey }) => (
          <GovTile
            key={titleKey}
            orientation="horizontal"
            href="#"
            icon={<GovIcon name={icon} type={iconType} />}
            title={<h3>{t(titleKey)}</h3>}
          >
            <p>{t(textKey)}</p>
          </GovTile>
        ))}
      </div>
    </section>
  );
};
