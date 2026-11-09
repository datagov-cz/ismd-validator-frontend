import { GovWizardItem } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { STATUS_MAP } from '@/lib/constants';
import { useFormStore } from '@/store/formStore';

import { Dialog } from './Dialog';
import { DownloadSection } from './DownloadSection';

export const Step3 = () => {
  const t = useTranslations('Home.FormSection.Step3');
  const dictionaryStatus = useFormStore((state) => state.dictionaryStatus);
  const conversionResponse = useFormStore((state) => state.conversionResponse);
  const validationResults = conversionResponse?.validationResults;
  const dictionaryName = useFormStore((state) => state.dictionaryName);

  const statusMapped = dictionaryStatus
    ? STATUS_MAP[dictionaryStatus.status]
    : 'primary';
  // An error with a response is a report with errors (shown); without one the conversion failed (step 2).
  const showDialog =
    !!dictionaryStatus && (statusMapped !== 'error' || !!conversionResponse);

  return (
    <GovWizardItem
      color={statusMapped}
      isExpanded={!!dictionaryStatus}
      collapsible
      prefix="3"
      headline={
        <span>{t(`Headline.${dictionaryStatus?.status ?? 'Success'}`)}</span>
      }
      annotation={<span className="text-left">{t('Annotation')}</span>}
    >
      <div className={showDialog ? 'block' : 'hidden'}>
        <Dialog
          title={dictionaryName ?? t('Dialog.TitleFallback')}
          infoBar={{
            status: STATUS_MAP[dictionaryStatus?.status || 'Success'],
            message: t(
              `Dialog.Message.${dictionaryStatus?.status || 'Success'}`,
            ),
          }}
          validationResults={validationResults || null}
          conformanceIssues={conversionResponse?.conformanceIssues ?? []}
        >
          <DownloadSection status={dictionaryStatus?.status || 'Success'} />
        </Dialog>
      </div>
    </GovWizardItem>
  );
};
