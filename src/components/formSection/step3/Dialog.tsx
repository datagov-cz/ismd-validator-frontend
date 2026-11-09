import { ReactNode } from 'react';
import { GovInfobar } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

import { ConformanceIssueDto, ValidationResultsDto } from '@/api/generated';
import { ConformanceIssueList } from '@/components/shared/ConformanceIssueList';
import { GovIcon } from '@/components/shared/GovIcon';

interface InfoBarProps {
  status: 'success' | 'warning' | 'error';
  message: string;
}

interface Props {
  title: string;
  infoBar: InfoBarProps;
  validationResults: ValidationResultsDto | null;
  conformanceIssues: ConformanceIssueDto[];
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
        {conformanceIssues.length > 0 && (
          <section className="space-y-2">
            <h4 className="text-lg font-bold">
              {t('ConformanceIssues.Title', {
                count: conformanceIssues.length,
              })}
            </h4>
            <p>{t('ConformanceIssues.Description')}</p>
            <ConformanceIssueList issues={conformanceIssues} />
          </section>
        )}
        {children}
      </div>
    </div>
  );
};
