import { GovInfobar } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { ConformanceIssueDto } from '@/api/generated';
import { ConformanceIssueList } from '@/components/shared/ConformanceIssueList';
import { GovIcon } from '@/components/shared/GovIcon';

interface Props {
  isHidden: boolean;
  fileError?: string;
  conversionError?: string;
  /** What to correct when the vocabulary itself is not OFN. */
  issues?: ConformanceIssueDto[];
}

export const ErrorInfobar = ({
  isHidden,
  fileError,
  conversionError,
  issues,
}: Props) => {
  const t = useTranslations('Home.FormSection.Step2');

  return (
    <div className={isHidden ? 'hidden' : 'block'}>
      <GovInfobar
        color="error"
        type="subtle"
        icon={<GovIcon name="exclamation-circle-fill" />}
      >
        <p className="text-lg">
          {fileError || conversionError || t('ConversionUknownError')}
          {conversionError && (
            <>
              {' '}
              <a
                href="https://github.com/datagov-cz/ismd-org/issues/new?template=bug_report.yml"
                target="_blank"
                className="underline"
              >
                {fileError || conversionError
                  ? t('ErrorLinkText')
                  : t('ConversionErrorLinkText')}
              </a>
            </>
          )}
        </p>
        {!fileError && issues && issues.length > 0 && (
          <div className="mt-4 space-y-2">
            <p>{t('ConformanceFailureIntro')}</p>
            <ConformanceIssueList issues={issues} />
          </div>
        )}
      </GovInfobar>
    </div>
  );
};
