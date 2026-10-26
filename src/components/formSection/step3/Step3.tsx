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

  const statusKey = dictionaryStatus?.status ?? 'Success';
  const mappedStatus = dictionaryStatus ? STATUS_MAP[statusKey] : 'primary';
  const isExpanded = !!dictionaryStatus;

  return (
    <GovWizardItem
      color={mappedStatus}
      collapsible={isExpanded}
      isExpanded={isExpanded}
      prefix="3"
      headline={
        <span>{t(`Headline.${dictionaryStatus?.status ?? 'Success'}`)}</span>
      }
      annotation={<span className="text-left">{t('Annotation')}</span>}
    >
      {dictionaryStatus && (
        <Dialog
          title={dictionaryName ?? t('Dialog.TitleFallback')}
          infoBar={{
            status: STATUS_MAP[statusKey],
            message: t(`Dialog.Message.${statusKey}`),
          }}
          validationResults={validationResults ?? null}
        >
          <DownloadSection status={dictionaryStatus.status} />
        </Dialog>
      )}
    </GovWizardItem>
  );
};
