import { GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { STATUS_MAP } from '@/lib/constants';
import { useFormStore } from '@/store/formStore';

import { Dialog } from './Dialog';
import { DownloadSection } from './DownloadSection';

export const Step3 = () => {
  const t = useTranslations('Home.FormSection.Step3');
  const dictionaryStatus = useFormStore((state) => state.dictionaryStatus);
  const validationResults = useFormStore(
    (state) => state.conversionResponse?.validationResults,
  );
  const dictionaryName = useFormStore((state) => state.dictionaryName);

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
      <span slot="headline">
        {t(`Headline.${dictionaryStatus?.status ?? 'Success'}`)}
      </span>
      <span slot="annotation">{t('Annotation')}</span>
      <div
        className={`${dictionaryStatus && statusMapped !== 'error' ? 'block' : 'hidden'}`}
      >
        <Dialog
          title={dictionaryName ?? t('Dialog.TitleFallback')}
          infoBar={{
            status: STATUS_MAP[dictionaryStatus?.status || 'Success'],
            message: t(
              `Dialog.Message.${dictionaryStatus?.status || 'Success'}`,
            ),
          }}
          validationResults={validationResults || null}
        >
          <DownloadSection status={dictionaryStatus?.status || 'Success'} />
        </Dialog>
      </div>
    </GovWizardItem>
  );
};
