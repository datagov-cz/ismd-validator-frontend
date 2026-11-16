import { ReactNode } from 'react';
import {
  GovAccordion,
  GovAccordionItem,
  GovChip,
  GovInfobar,
} from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { ValidationResultsDto } from '@/api/generated';
import { ConformanceIssueDto } from '@/api/generated';
import { GovIcon } from '@/components/shared/GovIcon';
import { OfnIssuesList } from '@/components/shared/OfnIssuesList';

interface InfoBarProps {
  status: 'success' | 'warning' | 'error';
  message: string;
}

interface Props {
  title: string;
  infoBar: InfoBarProps;
  validationResults: ValidationResultsDto | null;
  conformanceIssues?: ConformanceIssueDto[];
  children: ReactNode;
}

export const Dialog = ({
  title,
  infoBar,
  validationResults,
  conformanceIssues,
  children,
}: Props) => {
  const t = useTranslations('Home.FormSection.Step3.Dialog');

  const iconName =
    infoBar.status === 'success'
      ? 'check-circle-fill'
      : infoBar.status === 'warning'
        ? 'exclamation-triangle-fill'
        : 'exclamation-circle-fill';

  return (
    <div className="bg-white max-w-[800px] rounded-md text-dark-primary">
      <div className="px-6 py-4 border-b border-border-grey">
        <h3 className="text-xl lg:text-2xl text-dark-primary">{title}</h3>
      </div>
      <div className="flex flex-col gap-y-6 px-4 lg:px-8 py-6">
        <GovInfobar
          color={infoBar.status}
          type="subtle"
          icon={<GovIcon name={iconName} />}
        >
          <p className="text-lg">{infoBar.message}</p>
        </GovInfobar>

        {validationResults && validationResults.severityGroups && (
          <div className="overflow-auto max-h-[200px]">
            <table className="text-dark-primary w-full relative">
              <tbody>
                <tr className="border-b border-border-grey">
                  <th className="sticky top-0 bg-white">
                    {t('InfoTable.AffectedConcepts')}
                  </th>
                  <th className="sticky top-0 bg-white">
                    {t('InfoTable.FindingDescription')}
                  </th>
                  <th className="sticky top-0 bg-white">
                    {t('InfoTable.FindingType')}
                  </th>
                </tr>
                {validationResults.severityGroups.map(
                  ({ count, description, severity }) => (
                    <tr key={Math.random()}>
                      <td>
                        {count}{' '}
                        {count && count > 1
                          ? t('InfoTable.AffectedConceptUnitMultiple')
                          : t('InfoTable.AffectedConceptUnit')}
                      </td>
                      <td>{description}</td>
                      <td>{severity}</td>
                    </tr>
                  ),
                )}
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}
        {!!conformanceIssues?.length && (
          <GovAccordion className="w-full bg-blue-subtle/70 rounded-2xl">
            <GovAccordionItem
              label={<h3>{t('ConformanceIssuesTitle')}</h3>}
              toggleIcon={
                <GovIcon
                  name="chevron-down"
                  className="ofn-accordion-chevron"
                />
              }
              annotation={
                <p className="text-left">{t('ConformanceIssuesAnnotation')}</p>
              }
              suffix={
                <GovChip color="warning" size="xs" type="solid">
                  {t('ConformanceIssuesCount', {
                    count: conformanceIssues.length,
                  })}
                </GovChip>
              }
            >
              <div className="space-y-4 pb-4 pt-2">
                <p>{t('ConformanceIssuesDescription')}</p>
                <OfnIssuesList issues={conformanceIssues} />
              </div>
            </GovAccordionItem>
          </GovAccordion>
        )}
        {children}
      </div>
    </div>
  );
};
