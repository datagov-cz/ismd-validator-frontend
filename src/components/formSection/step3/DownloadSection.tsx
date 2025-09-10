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
  getFileExtension,
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
  const url = useFormStore((state) => state.url);
  const dictionaryName = useFormStore((state) => state.dictionaryName);

  const downloadDetailedValidationReportMutation =
    useDownloadDetailedValidationReportCSV();
  const downloadCatalogRecordMutation = useDownloadCatalogRecordJSON();

  const dictionaryFileExtension =
    OUTPUT_FORMAT === 'json' ? 'jsonld' : OUTPUT_FORMAT;
  const dictionaryFilename = `${dictionaryName}.${dictionaryFileExtension}`;

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
          mimeType: getMimeType('jsonld'),
        });
      }
      return;
    }

    if (url) {
      const extension = getFileExtension(url);

      const data = await fetchFileFromUrl(url);
      if (!data) return;

      handleDownload({
        data,
        filename: `${dictionaryName}.${extension}`,
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
      filename: dictionaryName + '-report.csv',
      mimeType: 'text/csv',
    });
  };

  const handleIncompleteCatalogRecordDownload = () => {
    if (!conversionResponse) return;

    handleReportDownload({
      data: conversionResponse.catalogReport,
      key: 'catalogRecord',
      mutation: downloadCatalogRecordMutation,
      filename: dictionaryName + '-záznam.jsonld',
      mimeType: getMimeType('jsonld'),
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
          onClick={handleIncompleteCatalogRecordDownload}
        />
      )}
    </section>
  );
};
