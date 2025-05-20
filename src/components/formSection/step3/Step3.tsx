import { GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { Dialog } from './Dialog';
import { DownloadSection } from './DownloadSection';

export const Step3 = () => {
  const t = useTranslations('Home.FormSection.Step3');

  return (
    <GovWizardItem color="primary" collapsible>
      <span slot="prefix">3</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <Dialog
        title="Slovník zákona o silničním provozu"
        infoBar={{
          status: 'success',
          message: 'Skvělá práce! Ve slovníku nebyly nalezeny žádné chyby.',
        }}
        infoTable={{
          affectedConcepts: '5 pojmů',
          findingDescription:
            'Pojem nemá vyplněné charakteristiky usnadňující evidenci údajů agendy do Registru práv a povinností',
          findingType: 'Informace',
        }}
      >
        <DownloadSection />
      </Dialog>
    </GovWizardItem>
  );
};
