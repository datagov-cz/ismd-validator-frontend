'use client';

import { useEffect } from 'react';
import { GovBanner, GovButton, GovIcon } from '@gov-design-system-ce/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import { FaqSection } from '@/components/faq/FaqSection';
import { FormSection } from '@/components/formSection/FormSection';
import { InfoSection } from '@/components/infoSection/InfoSection';
import { SSP_FETCH_URL } from '@/lib/constants';
import {
  SparqlResponse,
  useSSPDictionariesStore,
} from '@/store/sspDictionariesStore';

const getDictionaries = async () => {
  const response = await axios.get(SSP_FETCH_URL, {
    params: {
      format: 'application/sparql-results+json',
    },
  });
  return response.data;
};

export default function Home() {
  const t = useTranslations('Home');

  const { data: sparqlResponse } = useQuery<SparqlResponse>({
    queryKey: ['ssp-dicts'],
    queryFn: getDictionaries,
  });

  const setDictionaries = useSSPDictionariesStore(
    (state) => state.setDictionaries,
  );

  useEffect(() => {
    if (sparqlResponse) {
      setDictionaries(
        sparqlResponse.results.bindings.map((binding) => ({
          slovnik: binding.slovnik,
          nazev_slovniku: binding.nazev_slovniku,
        })),
      );
    }
  }, [sparqlResponse, setDictionaries]);

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
        <section className="relative flex items-center p-4 w-full bg-blue-subtle gap-x-3 text-blue-primary transition-colors duration-300">
          <GovIcon name="lightbulb-fill" slot="icon" />
          <p>
            {t('Message.Content')}&nbsp;
            <a href="" className="underline">
              {t('Message.Link')}
            </a>
          </p>
        </section>
        <FormSection />
        <InfoSection />
        <FaqSection />
      </div>
      <main></main>
    </div>
  );
}
