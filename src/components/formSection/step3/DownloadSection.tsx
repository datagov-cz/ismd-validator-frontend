import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useDownloadDetailedValidationReportCSV } from '@/api/generated';
import { DictProcessInfoStatusType } from '@/lib/appTypes';
import { OUTPUT_FORMAT } from '@/lib/constants';
import { getDownloadSectionTranslationKey } from '@/lib/contentUtils';
import { useFormStore } from '@/store/formStore';

import { DownloadItemRow } from './DownloadItemRow';

interface Props {
  status: DictProcessInfoStatusType;
}

export const DownloadSection = ({ status }: Props) => {
  const t = useTranslations();
  const sectionKey = getDownloadSectionTranslationKey(status);

  const basePath = `Home.FormSection.Step3.Dialog.DownloadSection.${sectionKey}`;

  const conversionResponse = useFormStore((state) => state.conversionResponse);
  const convertMutation = useDownloadDetailedValidationReportCSV();
  const [csvData, setCsvData] = useState<string | null>(null);

  let dictionaryData: string | null = null;
  if (conversionResponse?.output) {
    if (OUTPUT_FORMAT === 'json') {
      const jsonData =
        typeof conversionResponse?.output === 'string'
          ? JSON.parse(conversionResponse.output)
          : conversionResponse.output;

      dictionaryData = JSON.stringify(jsonData, null, 2);
    } else if (OUTPUT_FORMAT === 'ttl') {
      dictionaryData =
        typeof conversionResponse.output === 'string'
          ? conversionResponse.output
          : String(conversionResponse.output);
    }
  }

  const handleRow2Download = () => {
    if (!conversionResponse) return;

    const formData = new FormData();
    formData.append('data', conversionResponse as string);

    convertMutation.mutate(formData, {
      onSuccess: (data) => {
        setCsvData(data);
        // Trigger download immediately
        const blob = new Blob([data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'validation-report.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      onError: (error) => {
        console.error('Error downloading CSV:', error);
      },
    });
  };

  return (
    <section className="space-y-6">
      <DownloadItemRow
        title={t(`${basePath}.Row1.Title`)}
        tooltips={[
          {
            title: t(`${basePath}.Row1.Tooltips.Title1`),
            description: t(`${basePath}.Row1.Tooltips.Description1`),
          },
        ]}
        govButton={{
          text: t(`${basePath}.Row1.ButtonText`),
          disabled: sectionKey === 'Success-Warning' ? false : true,
        }}
        data={dictionaryData}
        filename={OUTPUT_FORMAT === 'json' ? 'slovnik.json' : 'slovnik.ttl'}
        mimeType={OUTPUT_FORMAT === 'json' ? 'application/json' : 'text/turtle'}
      />
      <DownloadItemRow
        title={t(`${basePath}.Row2.Title`)}
        tooltips={[
          {
            title: t(`${basePath}.Row2.Tooltips.Title1`),
            description: t(`${basePath}.Row2.Tooltips.Description1`),
          },
        ]}
        govButton={{
          text: t(`${basePath}.Row2.ButtonText`),
          type: sectionKey === 'Success-Warning' ? 'outlined' : undefined,
          disabled: convertMutation.isPending,
        }}
        data={csvData}
        filename="validation-report.csv"
        mimeType="text/csv"
        onCustomClick={handleRow2Download}
      />
      {sectionKey === 'Success-Warning' && (
        <DownloadItemRow
          title={t(`${basePath}.Row3.Title`)}
          tooltips={[
            {
              title: t(`${basePath}.Row3.Tooltips.Title1`),
              description: t(`${basePath}.Row3.Tooltips.Description1`),
            },
            {
              title: t(`${basePath}.Row3.Tooltips.Title2`),
              description: t(`${basePath}.Row3.Tooltips.Description2`),
            },
          ]}
          govButton={{
            text: t(`${basePath}.Row3.ButtonText`),
            type: 'outlined',
          }}
          data={dictionaryData}
          filename="validation-report-detailed.csv"
          mimeType="text/csv"
        />
      )}
    </section>
  );
};
