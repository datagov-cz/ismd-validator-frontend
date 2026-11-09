'use client';

import { GovButton, GovLink } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { GovIcon } from '@/components/shared/GovIcon';
import { scrollTop } from '@/lib/windowUtils';

import { FooterColumn } from './FooterColumn';

interface Props {
  isGated?: boolean;
}

export const Footer = ({ isGated = false }: Props) => {
  const t = useTranslations('Footer');

  if (isGated) {
    return (
      <footer className="bg-blue py-12 text-white mt-auto">
        <section className="max-w-desktop px-5 mx-auto space-y-12">
          <div className="space-y-4">
            <h5 className="font-medium text-xl">{t('ContactColumn.Title')}</h5>
            <GovLink
              href={`mailto:${t('ContactColumn.Email')}`}
              size="s"
              iconStart={<GovIcon name="envelope" />}
            >
              {t('ContactColumn.Email')}
            </GovLink>
          </div>
          <div className="space-y-4">
            <h6 className="text-lg font-medium">{t('ThanksSection.Title')}</h6>
            <p className="text-sm">{t('ThanksSection.Text')}</p>
            <ul className="flex gap-y-4 gap-x-6 flex-wrap pl-0!">
              <li className="before:content-none!">
                <GovIcon name="logo-eu" />
              </li>
              <li className="before:content-none!">
                <GovIcon name="logo-npo" />
              </li>
              <li className="before:content-none!">
                <GovIcon name="logo-dia" />
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <hr className="!border-t-footer-separator" />
            <div className="flex justify-between flex-wrap gap-y-4 gap-x-8 text-secondary text-xs">
              <p>{t('FooterCopySection.Copyright')}</p>
              <div className="flex gap-x-3">
                <p>{t('FooterCopySection.Version')}</p>|
                <p>{t('FooterCopySection.DesignSystem')}</p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    );
  }

  return (
    <footer className="bg-blue py-12 text-white mt-auto">
      <section className="max-w-desktop px-5 mx-auto space-y-12">
        <div className="flex justify-between">
          <ul className="flex justify-between w-full flex-wrap flex-col md:flex-row gap-y-10 md:pr-28 pl-0!">
            <FooterColumn title={t('LinkColumn.Title')}>
              <ul className="space-y-3 pl-0!">
                <li className="before:content-none!">
                  <GovLink href="#" size="s" className="[&_span]:text-link!">
                    {t('LinkColumn.Link1')}
                  </GovLink>
                </li>
                <li className="before:content-none!">
                  <GovLink href="#" size="s" className="[&_span]:text-link!">
                    {t('LinkColumn.Link2')}
                  </GovLink>
                </li>
                <li className="before:content-none!">
                  <GovLink
                    href="https://github.com/datagov-cz/ISMD_org"
                    external
                    size="s"
                    className="[&_span]:text-link!"
                  >
                    {t('LinkColumn.Link3')}
                  </GovLink>
                </li>
              </ul>
            </FooterColumn>
            <FooterColumn title={t('ContactColumn.Title')}>
              <GovLink
                href={`mailto:${t('ContactColumn.Email')}`}
                size="s"
                iconStart={<GovIcon name="envelope" />}
                className="[&_span]:text-link!"
              >
                {t('ContactColumn.Email')}
              </GovLink>
            </FooterColumn>
          </ul>
          <GovButton
            aria-label={t('BackToTopAria')}
            type="solid"
            size="m"
            className="bg-white cursor-pointer"
            onClick={scrollTop}
            iconStart={<GovIcon name="arrow-up" color="primary" />}
          ></GovButton>
        </div>
        <div className="space-y-4">
          <h6 className="text-lg font-medium">{t('ThanksSection.Title')}</h6>
          <p className="text-sm">{t('ThanksSection.Text')}</p>
          <ul className="flex gap-y-4 gap-x-6 flex-wrap pl-0! pt-4">
            <li className="before:content-none!">
              <GovIcon name="logo-eu" />
            </li>
            <li className="before:content-none!">
              <GovIcon name="logo-npo" />
            </li>
            <li className="before:content-none!">
              <GovIcon name="logo-dia" />
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <hr className="!border-t-footer-separator" />
          <div className="flex justify-between flex-wrap gap-y-4 gap-x-8 text-secondary text-xs">
            <p>{t('FooterCopySection.Copyright')}</p>
            <div className="flex gap-x-3">
              <p>{t('FooterCopySection.Version')}</p>|
              <p>{t('FooterCopySection.DesignSystem')}</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
