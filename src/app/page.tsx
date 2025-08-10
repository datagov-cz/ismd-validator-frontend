'use client';

import { GovBanner, GovButton, GovIcon } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { FaqSection } from '@/components/faq/FaqSection';
import { FormSection } from '@/components/formSection/FormSection';
import { InfoSection } from '@/components/infoSection/InfoSection';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  SparqlResponse,
  useSSPDictionariesStore,
} from '@/store/sspDictionariesStore';
import { useEffect } from 'react';

const query = `
PREFIX dct: <http://purl.org/dc/terms/>
SELECT DISTINCT ?slovnik ?nazev_slovniku
WHERE {
  ?slovnik a <http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/slovník> .
  ?slovnik dct:title ?nazev_slovniku .
  FILTER (lang(?nazev_slovniku) = "cs")
}
ORDER BY DESC(?slovnik) DESC(?nazev_slovniku)
`;

const getDictionaries = async () => {
  const response = await axios.get('https://xn--slovnk-7va.gov.cz/sparql', {
    params: {
      query,
      format: 'application/sparql-results+json',
    },
  });
  return response.data;
};

export default function Home() {
  const t = useTranslations('Home');

  const {
    data: sparqlResponse,
    error,
    isLoading,
  } = useQuery<SparqlResponse>({
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
          <GovButton
            type="solid"
            size="m"
            className="absolute top-1/2 -translate-y-1/2 right-0"
            aria-label={t('Message.CloseButtonAria')}
          >
            <GovIcon name="x" slot="icon-start" />
          </GovButton>
        </section>
        <FormSection />
        <InfoSection />
        <FaqSection />
      </div>
      <main></main>
    </div>
  );
}
