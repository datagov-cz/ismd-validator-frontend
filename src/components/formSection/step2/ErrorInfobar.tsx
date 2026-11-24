import {
  GovAccordion,
  GovAccordionItem,
  GovChip,
  GovInfobar,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { GovIcon } from '@/components/shared/GovIcon';
import { OfnIssuesList } from '@/components/shared/OfnIssuesList';
import { OfnConformanceFailure } from '@/lib/ofnConformance';

interface Props {
  isHidden: boolean;
  fileError?: string;
  conversionError?: string;
  ofnFailure?: OfnConformanceFailure;
}

export const ErrorInfobar = ({
  isHidden,
  fileError,
  conversionError,
  ofnFailure,
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
        {ofnFailure && (
          <GovAccordion className="mt-4">
            <GovAccordionItem
              label={<h3>{t('OfnIssuesTitle')}</h3>}
              toggleIcon={
                <GovIcon
                  name="chevron-down"
                  className="ofn-accordion-chevron"
                />
              }
              annotation={
                <p className="break-all text-left">
                  {ofnFailure.data.vocabularyIri}
                </p>
              }
              suffix={
                <GovChip color="error" size="s">
                  {ofnFailure.data.issues.length}
                </GovChip>
              }
            >
              <div className="pb-4 pt-2">
                <OfnIssuesList issues={ofnFailure.data.issues} />
              </div>
            </GovAccordionItem>
          </GovAccordion>
        )}
      </GovInfobar>
    </div>
  );
};
