import { GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { DictProcessInfoStatusType } from '@/lib/appTypes';

import { Dialog } from './Dialog';
import { DownloadSection } from './DownloadSection';

interface Props {
  status: DictProcessInfoStatusType;
}

const statusMap: Record<
  DictProcessInfoStatusType,
  'success' | 'warning' | 'error'
> = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};

export const Step3 = ({ status }: Props) => {
  const t = useTranslations('Home.FormSection.Step3');

  return (
    <GovWizardItem color="primary" collapsible>
      <span slot="prefix">3</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      <Dialog
        title={t('Dialog.Title')}
        infoBar={{
          status: statusMap[status],
          message: t(`Dialog.Message.${status}`),
        }}
        infoTable={{
          affectedConcepts: '5 pojmů',
          findingDescription:
            'Pojem nemá vyplněné charakteristiky usnadňující evidenci údajů agendy do Registru práv a povinností',
          findingType: 'Informace',
        }}
      >
        <DownloadSection status={status} />
      </Dialog>
    </GovWizardItem>
  );
};
