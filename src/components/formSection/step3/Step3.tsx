import { GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { STATUS_MAP } from '@/lib/constants';
import { useFormStore } from '@/store/formStore';

import { Dialog } from './Dialog';
import { DownloadSection } from './DownloadSection';

export const Step3 = () => {
  const t = useTranslations('Home.FormSection.Step3');
  const dictionaryStatus = useFormStore((state) => state.dictionaryStatus);

  const statusMapped = dictionaryStatus
    ? STATUS_MAP[dictionaryStatus.status]
    : 'primary';

  return (
    <GovWizardItem
      color={statusMapped}
      isExpanded={!!dictionaryStatus}
      collapsible
    >
      <span slot="prefix">3</span>
      <span slot="headline">{t('Headline')}</span>
      <span slot="annotation">{t('Annotation')}</span>
      {dictionaryStatus && statusMapped === 'success' && (
        <Dialog
          title={t('Dialog.Title')}
          infoBar={{
            status: STATUS_MAP[dictionaryStatus.status],
            message: t(`Dialog.Message.${dictionaryStatus.status}`),
          }}
          infoTable={{
            affectedConcepts: '5 pojmů',
            findingDescription:
              'Pojem nemá vyplněné charakteristiky usnadňující evidenci údajů agendy do Registru práv a povinností',
            findingType: 'Informace',
          }}
        >
          <DownloadSection status={dictionaryStatus.status} />
        </Dialog>
      )}
    </GovWizardItem>
  );
};
