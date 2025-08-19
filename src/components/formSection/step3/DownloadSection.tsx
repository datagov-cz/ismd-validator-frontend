import { useTranslations } from 'next-intl';

import {
  useDownloadCatalogRecordJSON,
  useDownloadDetailedValidationReportCSV,
} from '@/api/generated';
import { DictProcessInfoStatusType } from '@/lib/appTypes';
import { OUTPUT_FORMAT } from '@/lib/constants';
import { getDownloadSectionTranslationKey } from '@/lib/contentUtils';
import {
  fetchFileFromUrl,
  getFilenameAndExtension,
  getMimeType,
  handleDownload,
  handleReportDownload,
  prepareDictionaryData,
} from '@/lib/downloadUtils';
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
  const url = useFormStore((state) => state.url);

  const downloadDetailedValidationReportMutation =
    useDownloadDetailedValidationReportCSV();
  const downloadCatalogRecordMutation = useDownloadCatalogRecordJSON();

  const baseFilename = file?.name ? file.name.split('.')[0] : 'slovnik';
  const dictionaryFilename = `${baseFilename}.${OUTPUT_FORMAT}`;

  const isSuccessWarning = sectionKey === 'Success-Warning';

  const handleDictDownload = async () => {
    if (conversionResponse?.output) {
      const dictionaryData = prepareDictionaryData(
        conversionResponse.output,
        OUTPUT_FORMAT,
      );
      if (dictionaryData) {
        handleDownload({
          data: dictionaryData,
          filename: dictionaryFilename,
          mimeType: getMimeType(OUTPUT_FORMAT),
        });
      }
      return;
    }

    if (url) {
      const { filename, extension } = getFilenameAndExtension(url);

      const data = await fetchFileFromUrl(url);
      if (!data) return;

      handleDownload({
        data,
        filename: `${filename}.${extension}`,
        mimeType: getMimeType(extension),
      });
    }
  };

  const handleValidationReportDownload = () => {
    if (!conversionResponse) return;

    handleReportDownload({
      data: conversionResponse.validationReport,
      key: 'detailedReport',
      mutation: downloadDetailedValidationReportMutation,
      filename: 'validation-report-detailed.csv',
      mimeType: 'text/csv',
    });
  };

  const handleCatalogReportDownload = () => {
    if (!conversionResponse) return;

    handleReportDownload({
      data: conversionResponse.catalogReport,
      key: 'catalogRecord',
      mutation: downloadCatalogRecordMutation,
      filename: 'catalog-record.json',
      mimeType: getMimeType('json'),
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
          disabled: !isSuccessWarning,
        }}
        onClick={handleDictDownload}
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
          type: isSuccessWarning ? 'outlined' : undefined,
          disabled: downloadDetailedValidationReportMutation.isPending,
        }}
        onClick={handleValidationReportDownload}
      />
      {isSuccessWarning && (
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
          onClick={handleCatalogReportDownload}
        />
      )}
    </section>
  );
};
