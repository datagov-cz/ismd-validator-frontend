import { useTranslations } from 'next-intl';

import { DictProcessInfoStatusType } from '@/lib/appTypes';
import { getDownloadSectionTranslationKey } from '@/lib/contentUtils';

import { DownloadItemRow, DownloadItemRowProps } from './DownloadItemRow';

interface Props {
  status: DictProcessInfoStatusType;
}

const getRowsConfig = (
  t: ReturnType<typeof useTranslations>,
  sectionKey: string,
) => {
  const basePath = `Home.FormSection.Step3.Dialog.DownloadSection.${sectionKey}`;

  const rows: DownloadItemRowProps[] = [
    {
      title: t(`${basePath}.Row1.Title`),
      tooltips: [
        {
          title: t(`${basePath}.Row1.Tooltips.Title1`),
          description: t(`${basePath}.Row1.Tooltips.Description1`),
        },
      ],
      govButton: {
        text: t(`${basePath}.Row1.ButtonText`),
        disabled: sectionKey === 'Success-Warning' ? false : true,
      },
    },
    {
      title: t(`${basePath}.Row2.Title`),
      tooltips: [
        {
          title: t(`${basePath}.Row2.Tooltips.Title1`),
          description: t(`${basePath}.Row2.Tooltips.Description1`),
        },
      ],
      govButton: {
        text: t(`${basePath}.Row2.ButtonText`),
        type: sectionKey === 'Success-Warning' ? 'outlined' : undefined,
      },
    },
  ];

  if (sectionKey === 'Success-Warning') {
    rows.push({
      title: t(`${basePath}.Row3.Title`),
      tooltips: [
        {
          title: t(`${basePath}.Row3.Tooltips.Title1`),
          description: t(`${basePath}.Row3.Tooltips.Description1`),
        },
        {
          title: t(`${basePath}.Row3.Tooltips.Title2`),
          description: t(`${basePath}.Row3.Tooltips.Description2`),
        },
      ],
      govButton: {
        text: t(`${basePath}.Row3.ButtonText`),
        type: 'outlined',
      },
    });
  }

  return rows;
};

export const DownloadSection = ({ status }: Props) => {
  const t = useTranslations();
  const sectionKey = getDownloadSectionTranslationKey(status);
  const rows = getRowsConfig(t, sectionKey);

  return (
    <section className="space-y-6">
      {rows.map((row, index) => (
        <DownloadItemRow
          key={index}
          title={row.title}
          tooltips={row.tooltips}
          govButton={row.govButton}
        />
      ))}
    </section>
  );
};
