import { ReactNode } from 'react';
import { GovIcon, GovInfobar } from '@gov-design-system-ce/react';
import { useTranslations } from 'next-intl';

interface InfoBarProps {
  status: 'success' | 'warning' | 'error';
  message: string;
}

interface InfoTableProps {
  affectedConcepts: string;
  findingDescription: string;
  findingType: string;
}

interface Props {
  title: string;
  infoBar: InfoBarProps;
  infoTable: InfoTableProps;
  children: ReactNode;
}

export const Dialog = ({ title, infoBar, infoTable, children }: Props) => {
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
        <GovInfobar color={infoBar.status} type="subtle">
          <GovIcon name={iconName} slot="icon" />
          <p className="text-lg">{infoBar.message}</p>
        </GovInfobar>

        <div className="overflow-x-auto">
          <table className="text-dark-primary w-full">
            <tbody>
              <tr className="border-b border-border-grey">
                <th>{t('InfoTable.AffectedConcepts')}</th>
                <th>{t('InfoTable.FindingDescription')}</th>
                <th>{t('InfoTable.FindingType')}</th>
              </tr>
              <tr>
                <td>{infoTable.affectedConcepts}</td>
                <td>{infoTable.findingDescription}</td>
                <td>{infoTable.findingType}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {children}
      </div>
    </div>
  );
};
