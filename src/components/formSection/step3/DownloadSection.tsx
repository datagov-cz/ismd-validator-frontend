import { useTranslations } from 'next-intl';

import {
  useDownloadCatalogRecordJSON,
  useDownloadDetailedValidationReportCSV,
} from '@/api/generated';
import { DictProcessInfoStatusType } from '@/lib/appTypes';
import { OUTPUT_FORMAT } from '@/lib/constants';
import { getDownloadSectionTranslationKey } from '@/lib/contentUtils';
import { handleDownload } from '@/lib/downloadUtils';
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
  const file = useFormStore((state) => state.files[0]);

  const downloadDetailedValidationReportMutation =
    useDownloadDetailedValidationReportCSV();
  const downloadCatalogRecordMutation = useDownloadCatalogRecordJSON();

  const baseFilename = file?.name ? file.name.split('.')[0] : 'slovnik';
  const dictionaryFilename = `${baseFilename}.${OUTPUT_FORMAT}`;

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
    formData.append(
      'detailedReport',
      new Blob([JSON.stringify(conversionResponse.validationReport)], {
        type: 'application/json',
      }),
    );

    downloadDetailedValidationReportMutation.mutate(formData, {
      onSuccess: (data) => {
        handleDownload({
          data,
          filename: 'validation-report-detailed.csv',
          mimeType: 'text/csv',
        });
      },
      onError: (error) => {
        console.error('Error downloading CSV:', error);
      },
    });
  };

  const handleRow3Download = () => {
    if (!conversionResponse) return;

    const formData = new FormData();
    formData.append(
      'catalogRecord',
      new Blob([JSON.stringify(conversionResponse.catalogReport)], {
        type: 'application/json',
      }),
    );

    downloadCatalogRecordMutation.mutate(formData, {
      onSuccess: (data) => {
        handleDownload({
          data: data,
          filename: 'catalog-record.json',
          mimeType: 'application/json',
        });
      },
      onError: (error) => {
        console.error('Error downloading catalog record:', error);
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
        onClick={() =>
          handleDownload({
            data: dictionaryData,
            filename: dictionaryFilename,
            mimeType:
              OUTPUT_FORMAT === 'json' ? 'application/json' : 'text/turtle',
          })
        }
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
          disabled: downloadDetailedValidationReportMutation.isPending,
        }}
        onClick={handleRow2Download}
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
            disabled: downloadCatalogRecordMutation.isPending,
          }}
          onClick={handleRow3Download}
        />
      )}
    </section>
  );
};
