import { GovButton, GovIcon, GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { Dialog } from './Dialog';

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
        <div className="flex items-center w-full justify-between">
          <div>
            <p>Pro další využití si slovník stáhněte do Vašeho zařízení.</p>
            <GovButton
              color="primary"
              size="s"
              type="base"
              onGovClick={() => {}}
              className="!px-0"
            >
              <GovIcon name="info-circle-fill" slot="icon-start" />
              Co mám dělat se staženým slovníkem?
            </GovButton>
          </div>
          <GovButton color="primary" type="solid" onGovClick={() => {}}>
            <GovIcon name="download" slot="icon-start" />
            Stáhnout slovník
          </GovButton>
        </div>
      </Dialog>
    </GovWizardItem>
  );
};
